// Saves options to localStorage.
function save_options()
{
  var token = document.getElementById("XTrackerToken");
  token = token.value;

  localStorage["storyBoard-X-Tracker-Token"] = token;

  saveColumnLabel("unstarted");
  saveColumnLabel("started");
  saveColumnLabel("finished");
  saveColumnLabel("delivered");
  saveColumnLabel("accepted");

  saveCheckboxValue("storyBoard-only-current-iteration");
  saveCheckboxValue("storyBoard-show-chores");
  saveCheckboxValue("storyBoard-show-bugs");
  saveCheckboxValue("storyBoard-show-releases");


  var timeout = document.getElementById("refreshTimeout");
  timeout = timeout.children[timeout.selectedIndex].value;
  localStorage["storyBoard-refreshTimeout"] = timeout;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.style.display = "inline";
  setTimeout(function() {
    status.style.display = "none";
  }, 1000);

  reloadOpenedStoryBoards();
}

function saveCheckboxValue(id)
{
	var checkbox = document.getElementById(id);
	localStorage[id] = checkbox.checked;
}

function reloadOpenedStoryBoards()
{
	var views = chrome.extension.getViews();
	for (var i = 0; i < views.length; i++)
	{
		var w = views[i];

		if (w.location.pathname.indexOf("storyBoard.html") > -1)
			w.location.reload();
	}
}





function saveColumnLabel(label)
{
	var el = document.getElementById(label);
	el = el.value;
	localStorage["storyBoard-"+label+"-label"] = el;

	el = document.getElementById("show-"+label+"-Column");
	localStorage["show-"+label+"-Column"] = el.checked;
}

// Restores select box state to saved value from localStorage.
function restore_options()
{
    var token = document.getElementById("XTrackerToken");
    token.value = getLocalStorageValue("storyBoard-X-Tracker-Token");

	setSavedColumnLabel("unstarted");
	setSavedColumnLabel("started");
	setSavedColumnLabel("finished");
	setSavedColumnLabel("delivered");
	setSavedColumnLabel("accepted", "false");

	setCheckboxValue("storyBoard-only-current-iteration", "false");
	setCheckboxValue("storyBoard-show-chores", "true");
	setCheckboxValue("storyBoard-show-bugs", "true");
	setCheckboxValue("storyBoard-show-releases", "true");


    var value = getLocalStorageValue("storyBoard-refreshTimeout");
    if (value == "" || value == null || value == undefined)
        value = 15;
    var timeout = document.getElementById("refreshTimeout");
    for (var i = 0; i < timeout.children.length; i++)
    {
        var child = timeout.children[i];
        if (child.value == value) {
          child.selected = "true";
          break;
        }
    }

}

function setSavedColumnLabel(label, defaultValue)
{
	var el = document.getElementById(label);
    el.value = getLocalStorageValue("storyBoard-"+label+"-label");

    setCheckboxValue("show-"+label+"-Column", defaultValue);
}

function setCheckboxValue(id, defaultValue)
{
	var checkbox = document.getElementById(id);
	var val = getLocalStorageValue(id, defaultValue);
	checkbox.checked = (val == "true" || val == "")?true:"";
}

function getLocalStorageValue(key, defaultValue)
{
	if (defaultValue == undefined)
		defaultValue = "";
    var value = localStorage[key];
    if (value == undefined)
        value = defaultValue;
    return value;
}
window.addEvent('domready', restore_options);
$("save").addEvent('click', save_options);
