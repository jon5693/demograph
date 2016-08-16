var arrParams = [], res;
var lsn2, lsn2, county1, county2, place1, place2, state1, state2, type, stateabbr1, stateabbr2, areaname1, areaname2, date1, date2;
var totalFlags = 2, flag = 0;
var totalPop = 0, totalPop2009 = 0;
// Load the Visualization API and the corechart package.


//Get the parameters from the URL
function getParams() {
	var urlParams = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	var tempParam = []; 
	var str;
	
	//console.log(urlParams);
	for(var i=0; i < urlParams.length; i++) {
		tempParam = urlParams[i].split('=');
		tempParam[1] = tempParam[1].replace(/%20/gi, ' ');
		tempParam[1] = tempParam[1].replace(/%2D/gi, '-');
		arrParams.push(tempParam[1]);
		//console.log(tempParam[1]);
	}
	
	//Avert your eyes. This isn't going to be pretty, but it will work.
	
	lsn1 = arrParams[0];
	lsn2 = arrParams[1];
	
	county1 = arrParams[2];
	county2 = arrParams[3];
	
	place1 = arrParams[4];
	place2 = arrParams[5];
	
	state1 = arrParams[6];
	state2 = arrParams[7];
	
	type = arrParams[8];
	
	stateabbr1 = arrParams[9];
	stateabbr2 = arrParams[10];
	
	areaname1 = arrParams[11];
	areaname2 = arrParams[12];
	
	date1 = arrParams[13];
	date2 = arrParams[14];
	
	//Ok, you can look again.
}

/* some data requires api calls and client side calculations so a time and flags have to be set to ensure that calcultations are done after the data has been returned
------------------------------------
Functions that set flags
-------------------------------------
population();
population2009();
-------------------------------------
Required for... 
population Growth
-------------------------------------
*/


function population(place, state) {	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			//console.log('OMG: ' +  xhttp.responseText);
			var arr = JSON.parse(xhttp.responseText);
			
			//set the flag and get the data we need
			flag++;
			drawPopRace(arr.pop);
		}
	};
	
	xhttp.open("GET", "http://localhost:8081/pop/"+place+"/"+state+"/"+type+"/" , true);
	xhttp.send();
}

function population2009(place, state) {	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			//console.log('OMG: ' +  xhttp.responseText);
			var arr = JSON.parse(xhttp.responseText);
			
			//set the flag and get the data we need
			flag++;
			totalPop2009 = arr[1][6];
		}
	};
	
	xhttp.open("GET", "http://localhost:8081/pop2009/"+place+"/"+state+"/"+type+"/" , true);
	xhttp.send();
}

function malefemale(place, state) {	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			console.log('OMG: ' +  xhttp.responseText);
		}
	};
	
	xhttp.open("GET", "http://localhost:8081/malefemale/"+place+"/"+state+"/"+type+"/" , true);
	xhttp.send();
}

function marital(place, state) {	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			console.log('OMG: ' +  xhttp.responseText);
		}
	};
	
	xhttp.open("GET", "http://localhost:8081/marital/"+place+"/"+state+"/"+type+"/" , true);
	xhttp.send();
}

function income(place, state) {	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			console.log('OMG: ' +  xhttp.responseText);
		}
	};
	
	xhttp.open("GET", "http://localhost:8081/income/"+place+"/"+state+"/"+type+"/" , true);
	xhttp.send();
}

function education(place, state) {	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			console.log('OMG: ' +  xhttp.responseText);
		}
	};
	
	xhttp.open("GET", "http://localhost:8081/education/"+place+"/"+state+"/"+type+"/" , true);
	xhttp.send();
}

function housingindex(stateabbr) {	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			console.log('OMG: ' +  xhttp.responseText);
		}
	};
	
	xhttp.open("GET", "http://localhost:8081/housingindex/"+stateabbr+"/" , true);
	xhttp.send();
}

function trulia(areaname, stateabbr) {	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			console.log('OMG: ' +  xhttp.responseText);
		}
	};
	
	xhttp.open("GET", "http://localhost:8081/trulia/"+areaname+"/"+stateabbr+"/"+date1+"/"+date2+"/" , true);
	xhttp.send();
}

function greatschools(areaname, stateabbr, levelcode) {	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			console.log('OMG: ' +  xhttp.responseText);
		}
	};
	
	xhttp.open("GET", "http://localhost:8081/greatschools/"+areaname+"/"+stateabbr+"/"+levelcode+"/" , true);
	xhttp.send();
}

function employment(fips1, fips2) {	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			console.log('OMG: ' +  xhttp.responseText);
		}
	};
	
	xhttp.open("GET", "http://localhost:8081/employment/"+fips1+"/"+fips2+"/" , true);
	xhttp.send();
}
