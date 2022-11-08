var cachedTabId = 'labOverviewButton';
var cachedElementId = 'labOverviewTable';
var cachedStageTwoTabId = null;
var cachedStageTwoElementId = null;
var imageList = ['img/csharp.png', 'img/CPlusPlus.jpg', 'img/c.png'];
var currentImage = 0;
var currentStage = '1';
var body = document.getElementsByTagName("body");

// I dont want to over comment this lmao, hopefully the couple of comments I added for the slightly more advanced methods near the bottom is enough
function switchTab(tabId, elementId, bgColor = "#1663be", bgColorDefault = "#212529", stage="1", closeCurrentPage = "true")
{
	if (tabId == cachedTabId) return;
	if (elementId == "careerPlansPage")
	{
		cachedStageTwoTabId = null;
		cachedStageTwoElementId = null;
	}
	if (cachedElementId != null || cachedTabId != null)
	{
		document.getElementById(cachedTabId).style.backgroundColor = bgColorDefault;
		document.getElementById(cachedElementId).style.visibility = "hidden";
	}
		
	if (tabId != cachedTabId)
	{
		document.getElementById(tabId).style.backgroundColor = bgColor;
		document.getElementById(elementId).style.visibility = "visible";
	}
	if (stage != currentStage)
	{
		if (stage == "2" && currentStage == "1")
		{
			document.getElementById(cachedTabId).style.backgroundColor = "#212529";
			document.getElementById(tabId).style.backgroundColor = bgColor;
		}
		if (stage == "1" && currentStage == "2")
		{
			document.getElementById(cachedStageTwoTabId).style.backgroundColor = "black";
			document.getElementById(cachedStageTwoElementId).style.visibility = "hidden";
		}
	}
	
	cachedTabId = tabId;
	cachedElementId = elementId;
	currentStage = stage;
	setCookie("currentTabId", tabId, 365);
	setCookie("currentElement", elementId, 365);
}

function switchTabStageTwo(tabId, elementId)
{
	if (tabId == cachedStageTwoTabId) return;
	if (cachedStageTwoElementId != null || cachedStageTwoTabId != null)
	{
		document.getElementById(cachedStageTwoTabId).style.backgroundColor = "black";
		document.getElementById(cachedStageTwoElementId).style.visibility = "hidden";
	}
		
	if (tabId != cachedTabId)
	{
		document.getElementById(tabId).style.backgroundColor = "#002148";
		document.getElementById(elementId).style.visibility = "visible";
	}

	cachedStageTwoTabId = tabId;
	cachedStageTwoElementId = elementId;
	currentStage = "2";
}

//since the carousel is broken im going to rewrite its functionallity here
function changeImageCarousel(button)
{
	if (button == "next")
	{
		if (currentImage == 2) currentImage =0;
		else currentImage++;
	}
	
	if (button == "prev")
	{
		if (currentImage == 0) currentImage = 2;
		else currentImage--;
	}
	
	changeImage(imageList[currentImage]);
}

function changeImage(item)
{
	document.getElementById("topLangImages").src = item;
}

function loadCookies()
{
	var currentTabIdCookie = getCookie("currentElement");
}

function setCookie(cookieName, value, expdays) 
{
	const date = new Date(); // creates a new empty date constructor
	date.setTime(date.getTime() + (expdays*24*60*60*1000)); // sets the time to days depending on how many days you choose
	var expires = "expires="+ date.toUTCString(); // adds the expiry date to the cookies string
	// whish there was a better way to concatenate all these strings together like how c# or c++ allows us to
	document.cookie = cookieName + "=" + value + ";" + expires + ";path=/"; // concatenates all the strings into a single line and adds it to the cookie
}

function getCookie(cookieName) 
{
	var name = cookieName + "="; // uses the cookies name and the equal sign
	var originalCookie = decodeURIComponent(document.cookie); // decodes the cookie back into a base format 
	var splitCookie = originalCookie.split(';'); // splits the string into an array based off of ;
	for(var i = 0; i < splitCookie.length; i++)  // runs through a loop and removes all spaces then returns the array
	{
	  var cookie = splitCookie[i];
	  while (cookie.charAt(0) == ' ') 
	  	cookie = cookie.substring(1);
	  if (cookie.indexOf(name) == 0) 
	  	return cookie.substring(name.length, cookie.length);
	}
	return "";
}