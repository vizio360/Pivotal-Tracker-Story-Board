function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft;
        _y += el.offsetTop;
        el = el.parentNode;
    }
    return { top: _y, left: _x };
}

function getURLParam(strParamName)
{
    var strReturn = "";
    var strHref = window.location.href;
    if ( strHref.indexOf("?") > -1 )
    {
        var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
        var aQueryString = strQueryString.split("&");
        for ( var iParam = 0; iParam < aQueryString.length; iParam++ )
        {
            if (aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1 )
            {
                  var aParam = aQueryString[iParam].split("=");
                strReturn = aParam[1];
                break;
            }
        }
    }
    return unescape(strReturn);
}
function getTextContentForElement(src, elementTag)
{
    var elements = src.getElementsByTagName(elementTag);
    if (elements.length > 0)
        return elements[0].textContent;
    return "";
}

function onXmlRequestError(xhr)
{
    var message = "OOPS!! Something went wrong!<BR>";
    if (xhr.responseText != undefined)
        message += xhr.responseText + "<BR>";
    message += "STATUS: "+xhr.status;

    if (xhr.status == 422)
    {
        message += "<br>Make sure you've set the correct API token for this user. Check it in the <a href='options.html' target='PivotalTrackerStoryBoardOptions'>options page</a>";
    }
    else if ((xhr.status == 0))
    {
        showGenericErrorAndRefresh();
        return;
    }
    else
    {
        message += "<br>Have you set the API Token in the <a href='options.html' target='PivotalTrackerStoryBoardOptions'>options page</a> of the extension?<br>";
    }
    errorDialog.showError(message);
}

function showGenericErrorAndRefresh()
{
   	errorDialog.showError('OOPS!! Something went wrong!<BR>the page will refresh in 30 seconds');
   	refreshPage.delay(30000);
}

function refreshPage()
{
	window.location.reload();
}


