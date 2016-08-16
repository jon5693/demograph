//--------------------------------------------------------------
//This file holds callcackfunctions for the google charts api. |
//--------------------------------------------------------------
// Load the Visualization API and the corechart package.

google.charts.load('current', {'packages':['corechart']});
//setOnLoadCallback statements
google.charts.setOnLoadCallback(drawPopGrowth);
google.charts.setOnLoadCallback(drawPopRace);
google.charts.setOnLoadCallback(drawPopGender);
google.charts.setOnLoadCallback(drawPopMF);
google.charts.setOnLoadCallback(drawPopMF18);
google.charts.setOnLoadCallback(drawPopMF30);
google.charts.setOnLoadCallback(drawPopMF45);
google.charts.setOnLoadCallback(drawPopMF60);
google.charts.setOnLoadCallback(drawMarital);
google.charts.setOnLoadCallback(drawIncome);
google.charts.setOnLoadCallback(drawEducation);
google.charts.setOnLoadCallback(drawHPI);
google.charts.setOnLoadCallback(drawHPIGrowth);
google.charts.setOnLoadCallback(drawHomeCost);
google.charts.setOnLoadCallback(drawSchools);

//callback functions here
function drawPopGrowth(arr) {
	//single figure
	
}

function drawPopRace(arr, divStr) {
	var data = new google.visualization.DataTable([
		['Caucasian', 1],
		['Affrican American', 2],
		['Native American', 4],
		['Asian', 3],
		['Pacific Islander', 1],
		['All Others', 5]
	]);

	//set the chart options
	var options = {'title':'Current Population',
				   'width':400,
				   'height':300};

	// Instantiate and draw our chart, passing in some options.
	var chart = new google.visualization.ColumnChart(document.getElementById(divStr));
	chart.draw(data, options);
}

function drawPopGender() {
	
}

function drawPopMF() {
	
}

function drawPopMF18() {
	
}

function drawPopMF30() {
	
}

function drawPopMF45() {
	
}

function drawPopMF60() {
	
}

function drawMarital() {
	
}

function drawIncome() {
	
}

function drawEducation() {
	
}

function drawHPI() {
	
}

function drawHPIGrowth() {
	
}

function drawHomeCost() {
	
}

function drawSchools() {
	
}

/* 
------------------------------------------------------------------------------
This is a test function copied directly from google's developer site. It works
------------------------------------------------------------------------------ */

/*
// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.

 function drawChart() {
	// Create the data table.
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Topping');
	data.addColumn('number', 'Slices');
	data.addRows([
	['Mushrooms', 3],
	['Onions', 1],
	['Olives', 1],
	['Zucchini', 1],
	['Pepperoni', 2]
	]);

	// Set chart options
	var options = {'title':'How Much Pizza I Ate Last Night',
				   'width':400,
				   'height':300};

	// Instantiate and draw our chart, passing in some options.
		var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
		chart.draw(data, options);
}*/

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

