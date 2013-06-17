function onProjectLoaded(responseText, responseXML)
{
    loader.hideLoader();

    try
    {
    	var project = responseXML.getElementsByTagName("project");
    	var title = $('title');
    	title.set('html',getTextContentForElement(project[0], "name"));
    }catch(err)
    {
		showGenericErrorAndRefresh();
    }
}

function onRequestStart()
{
    loader.showLoader();
}

function onStoriesLoaded(responseText, responseXML)
{
    loader.hideLoader();
    try
    {
	    storyBoard.clear();
	    var stories = responseXML.getElementsByTagName("story");
	    var i = 0;
	    for (var i=0; i < stories.length; i++)
	    {
	        var story = stories[i];
	        var state = getTextContentForElement(story, "current_state");

	        var storyCard = new StoryCard(getTextContentForElement(story, "name"),
	                                      getTextContentForElement(story, "current_state"),
	                                      getTextContentForElement(story, "story_type"),
	                                      getTextContentForElement(story, "owned_by"),
	                                      getTextContentForElement(story, "estimate"));
			if (!doShowStory(storyCard))
				continue;
	        storyBoard.addStory(storyCard);
	    }

	    var timeout = localStorage["storyBoard-refreshTimeout"];
	    if (timeout == undefined || timeout == "")
	        timeout = 15;

	    getStories.bind(document).delay(timeout * 60 * 1000);
    }catch(err)
    {
    	showGenericErrorAndRefresh();
    }
}

function doShowStory(storyCard)
{
	var value = true;
	switch (storyCard.type)
	{
		case "chore":
			value = localStorage["storyBoard-show-chores"];
			value = value == "true" || value == undefined;
			break;
		case "bug":
			value = localStorage["storyBoard-show-bugs"];
			value = value == "true" || value == undefined;
			break;
		case "release":
			value = localStorage["storyBoard-show-releases"];
			value = value == "true" || value == undefined;
			break;
	}
	return value;
}

function getStories()
{
	pivotalClient.getProject(projectId, onRequestStart, onProjectLoaded, onXmlRequestError);

	if (localStorage["storyBoard-only-current-iteration"] == "true")
	{
		pivotalClient.getCurrentIterationStories(projectId, onRequestStart, onStoriesLoaded, onXmlRequestError);
	}else{

		var storiesFilter = "filter=state:unstarted,started,finished,delivered,accepted,rejected";
		pivotalClient.getStories(projectId, storiesFilter, onRequestStart, onStoriesLoaded, onXmlRequestError);
	}
}

var errorDialog = new ErrorDialog($('error'));

var loader = new Loader($('loader'), 500);


var storyBoard = new StoryBoard('storyBoardTable');


addColumn('unstarted');
addColumn('started');
addColumn('finished');
addColumn('delivered');
addColumn('accepted');

function addColumn(state)
{
	var show = localStorage["show-"+state+"-Column"];
	if (show == "false")
		return;
	var col = new StoryColumn(state);
	col.setTitle(storyBoard.getLabelForStoryState(state));
	storyBoard.addStoryColumn(col);
}

var token = localStorage["storyBoard-X-Tracker-Token"];
var pivotalClient = new PivotalTrackerAPIClient(token, getURLParam('useHttps'));
var projectId = getURLParam('projectId');


getStories();


