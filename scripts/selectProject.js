var errorDialog = new ErrorDialog($('error'));

var loader = new Loader($('loader'), 500);

var token = localStorage["storyBoard-X-Tracker-Token"];
var pivotalClient = new PivotalTrackerAPIClient(token, false);
pivotalClient.getProjects(onRequestStart, onProjectsLoaded, onXmlRequestError);

function onRequestStart()
{
    loader.showLoader();
}

function onProjectsLoaded(responseText, responseXML)
{
    loader.hideLoader();
    var projects = responseXML.getElementsByTagName("project");
    var i = 0;
    for (var i=0; i < projects.length; i++)
    {
        var project = projects[i];
        var name = getTextContentForElement(project, "name");
        var velocity = getTextContentForElement(project, "current_velocity");
        name += " ("+velocity+") ";
        var useHttps = getTextContentForElement(project, "use_https");
        if (useHttps == "true")
            name += " - HTTPS";

        var id = getTextContentForElement(project, "id");
        var projectDiv = new Element('div');
        projectDiv.set('html', "<a href='storyBoard.html?projectId="+id+"&useHttps="+useHttps+"' target='PivotalTrackerStoryBoard_"+id+"'>"+name+" </a>");
        $('projects').grab(projectDiv);
    }
}

