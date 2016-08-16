var express = require('express');
var request = require('request');
var cors = require('cors');
var app = express();
app.use(cors());

//pull in the variables needed to know what we are comparing
var type = 'place'; //can be place county or state
var areaOneName = 'Cary'; //name of first area in comparison.  used to replace text in page
var areaOneFIPS = '10740'; //used to lookup information from the census
var areaOneCounty = 'Wake';
var areaOneCountyFIPS = '183';
var areaOneStateName = 'North Carolina'; //name of first state.  used to replace text
var areaOneStateAbbr = 'NC'; //abbreviation of first state used to replace text
var areaOneStateFIPS = '37'; //used to lookup information from the census

var areaTwoName = 'New York (Manhattan)'; //name of Second area in comparison.  used to replace text in page
var areaTwoFIPS = '51000'; //used to lookup information from the census
var areaOneCounty = 'Manhattan';
var areaOneCountyFIPS = '061';
var areaTwoStateName = 'New York'; //name of Second state.  used to replace text
var areaTwoStateAbbr = 'NY'; //abbreviation of Second state used to replace text
var areaTwoStateFIPS = '36'; //used to lookup information from the census


//extra trulia variables
//var dateOne, dateTwo;

// api.census.gov Parameters

var params2009Population = 
	'B01001A_001E,' + //white population 2009
	'B01001B_001E,' + //Black or Afican American 2009
	'B01001C_001E,' + //Native American or Alaskan Native 2009
	'B01001D_001E,' + //Asian 2009
	'B01001E_001E,' + //Native Hawaiian oe Pacific Islander 2009
	'B01001F_001E,' + //Other population 2009
	'B00001_001E'; //total population 2009

var paramsPopulation =
	'B01001A_001E,' + //white population
	'B01001B_001E,' + //Black or Afican American
	'B01001C_001E,' + //Native American or Alaskan Native
	'B01001D_001E,' + //Asian
	'B01001E_001E,' + //Native Hawaiian oe Pacific Islander
	'B01001F_001E,' + //Other population
	'B01003_001E'; //total population
	
var paramsMaletoFemale =
	'B01001_002E,' + //males total
	'B01001_003E,' + //males under 5
	'B01001_004E,' + //males 5-9
	'B01001_005E,' + //males 10 - 14
	'B01001_006E,' + //males 15 - 17
	'B01001_007E,' + //males 18 - 19
	'B01001_008E,' + //males 20
	'B01001_009E,' + //males 21
	'B01001_010E,' + //males 22 - 24
	'B01001_011E,' + //males 25 - 29
	'B01001_012E,' + //males 30 - 34
	'B01001_013E,' + //males 35 - 39
	'B01001_014E,' + //males 40 - 45
	'B01001_015E,' + //males 45 - 49
	'B01001_016E,' + //males 50 - 54
	'B01001_017E,' + //males 55 - 59
	'B01001_018E,' + //males 60 - 61
	'B01001_019E,' + //males 62 - 64
	'B01001_020E,' + //males 65 - 66
	'B01001_021E,' + //males 67 - 69
	'B01001_022E,' + //males 70 - 74
	'B01001_023E,' + //males 75 - 79
	'B01001_024E,' + //males 80 - 84
	'B01001_025E,' + //males 85 & over
	'B01001_026E,' + //females total
	'B01001_027E,' + //females under 5
	'B01001_028E,' + //females 5-9
	'B01001_029E,' + //females 10 - 14
	'B01001_030E,' + //females 15 - 17
	'B01001_031E,' + //females 18 - 19
	'B01001_032E,' + //females 20
	'B01001_033E,' + //females 21
	'B01001_034E,' + //females 22 - 24
	'B01001_035E,' + //females 25 - 29
	'B01001_036E,' + //females 30 - 34
	'B01001_037E,' + //females 35 - 39
	'B01001_038E,' + //females 40 - 45
	'B01001_039E,' + //females 45 - 49
	'B01001_040E,' + //females 50 - 54
	'B01001_041E,' + //females 55 - 59
	'B01001_042E,' + //females 60 - 61
	'B01001_043E,' + //females 62 - 64
	'B01001_044E,' + //females 65 - 66
	'B01001_045E,' + //females 67 - 69
	'B01001_046E,' + //females 70 - 74
	'B01001_047E,' + //females 75 - 79
	'B01001_048E,' + //females 80 - 84
	'B01001_049E'; //females 85 & over
	
var paramsMaritalStatus = 
	'B06008_001E,' + //total married status polled
	'B06008_002E,' + //never married
	'B06008_003E,' + //now married, seperated
	'B06008_004E,' + //divorced
	'B06008_005E,' + //seperated
	'B06008_006E'; //widowed
	
var paramsIncome =
	'B06010_001E,' + //total income reporting
	'B06010_002E,' + //no income
	'B06010_003E,' + //with income
	'B06010_004E,' + //1-9,999
	'B06010_005E,' + //10k-14,999
	'B06010_006E,' + //15k-24,999
	'B06010_007E,' + //25k-34,999
	'B06010_008E,' + //35k-49,999
	'B06010_009E,' + //50k-64,999
	'B06010_010E,' + //65k-74,999
	'B06010_011E'; //75k+
	
var paramsEducation =
	'B06009_001E,' + //total education
	'B06009_002E,' + //Less than high school
	'B06009_003E,' + //High School Graduate
	'B06009_004E,' + //Some College / Associates
	'B06009_005E,' + //Bachelors
	'B06009_006E'; //Graduate or Professional

//define routes	
app.get('/test', function(reg, res){
	res.end(JSON.stringify({a:1}));
});

app.get('/pop/:place/:state/:type', function(req, res) {
	var place = req.params.place; 
	var state = req.params.state;
	var type = req.params.type;

	request("http://api.census.gov/data/2014/acs5?key=76cdba5f01050e07babdeaa7cdaf98c7ecf31b69&get="+paramsPopulation+"&for="+type+":"+place+"&in=state:"+state, function (error, response, body) {
		if (!error && response.statusCode == 200) {
				res.end(body);
		}
	});
});

app.get('/marital/:place/:state/:type', function(req, res) {
	var place = req.params.place; 
	var state = req.params.state;
	var type = req.params.type;

	request("http://api.census.gov/data/2014/acs5?key=76cdba5f01050e07babdeaa7cdaf98c7ecf31b69&get="+paramsMaritalStatus+"&for="+type+":"+place+"&in=state:"+state, function (error, response, body) {
		if (!error && response.statusCode == 200) {
				res.end(body);
		}
	});
});

app.get('/malefemale/:place/:state/:type', function(req, res) {
	var place = req.params.place; 
	var state = req.params.state;
	var type = req.params.type;

	request("http://api.census.gov/data/2014/acs5?key=76cdba5f01050e07babdeaa7cdaf98c7ecf31b69&get="+paramsMaletoFemale+"&for="+type+":"+place+"&in=state:"+state, function (error, response, body) {
		if (!error && response.statusCode == 200) {
				res.end(body);
		}
	});
});

app.get('/pop2009/:place/:state/:type', function(req, res) {
	var place = req.params.place; 
	var state = req.params.state;
	var type = req.params.type;

	request("http://api.census.gov/data/2009/acs5?key=76cdba5f01050e07babdeaa7cdaf98c7ecf31b69&get="+params2009Population+"&for="+type+":"+place+"&in=state:"+state, function (error, response, body) {
		if (!error && response.statusCode == 200) {
				res.end(body);
		}
	});
});

app.get('/income/:place/:state/:type', function(req, res) {
	var place = req.params.place; 
	var state = req.params.state;
	var type = req.params.type;

	request("http://api.census.gov/data/2014/acs5?key=76cdba5f01050e07babdeaa7cdaf98c7ecf31b69&get="+paramsIncome+"&for="+type+":"+place+"&in=state:"+state, function (error, response, body) {
		if (!error && response.statusCode == 200) {
				res.end(body);
		}
	});
});

app.get('/education/:place/:state/:type', function(req, res) {
	var place = req.params.place; 
	var state = req.params.state;
	var type = req.params.type;

	request("http://api.census.gov/data/2014/acs5?key=76cdba5f01050e07babdeaa7cdaf98c7ecf31b69&get="+paramsEducation+"&for="+type+":"+place+"&in=state:"+state, function (error, response, body) {
		if (!error && response.statusCode == 200) {
				res.end(body);
		}
	});
});

app.get('/housingindex/:stateabbr', function(req, res) { 
	var stateAbbr = req.params.stateabbr;

	request("http://labs.data.gov/csv-to-api/?source=http://www.fhfa.gov/DataTools/Downloads/Documents/HPI/HPI_PO_state_api.csv&format=json&PLACE_ID="+stateAbbr, function (error, response, body) {
		if (!error && response.statusCode == 200) {
				res.end(body);
		}
	});
});

app.get('/trulia/:areaname/:stateabbr/:date1/:date2', function(req, res) { 
	var areaName = req.params.areaname;
	var stateAbbr = req.params.stateabbr;
	var date1 = req.params.date1;
	var date2 = req.params.date2;

	request("http://api.trulia.com/webservices.php?library=TruliaStats&function=getCityStats&city="+areaName+"&state="+stateAbbr+"&startDate="+date1+"&endDate="+date2+"&apikey=pey9hcka8gnxp5hqmcdv2wza", function (error, response, body) {
		if (!error && response.statusCode == 200) {
				res.end(body);
		}
	});
})

app.get('/greatschools/:areaname/:stateabbr/:levelcode', function(req, res) { 
	var areaName = req.params.areaname;
	var stateAbbr = req.params.stateabbr;
	var levelcode = req.params.levelcode;

	request("http://api.greatschools.org/schools/nearby?key=b13pky8cnwckxntfdtodmqxx&city="+areaName+"&state="+stateAbbr+"&levelcode="+levelcode, function (error, response, body) {
		if (!error && response.statusCode == 200) {
				res.end(body);
		}
	});
})

app.get('/employment/:fips1/:fips2', function(req, res) { 
	areaOneStateFIPS = req.params.fips1;
	areaTwoStateFIPS = req.params.fips2;
	
	var sendTxt = '{"seriesid":["LAUST'+areaOneStateFIPS+'0000000000003","LAUST'+areaTwoStateFIPS+'0000000000003","LAUMT373958000000003"],' +
		'"startyear":"2010","endyear":"2016",' +
		'"catalog":false,"calculations":false,"annualaverage":true,' +
		'"registrationKey":"52904c416fa8482e846e6934fc173b04"}';

	request.post("http://api.bls.gov/publicAPI/v2/timeseries/data/", sendTxt, function (error, response, body) {
		if (!error && response.statusCode == 200) {
				res.end(body);
		}
	});
})


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("Magic is happening", host, port);

});