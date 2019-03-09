function distanceConvert() {
	// convert entry from dropdown menu into miles and return or return manual entry
	var distanceUnit;
	var distanceEntry;
	
	distanceEntry = document.getElementById( 'distanceEntry' ).value;
	
	if ( distanceEntry.indexOf('k') != -1 || distanceEntry.indexOf( 'K' ) != -1 ) {
		distanceUnit = 'k';
	}
	
	else if ( distanceEntry.indexOf( 'k' ) == -1 && distanceEntry.indexOf( 'eter' ) != -1 ) {
		//if user enters 'meters' but not kilometers
		// used 'eter' to capture 'Meter', 'meter', 'Meters', 'meters'
		distanceUnit = 'meters';
	}
	
	else if ( distanceEntry.indexOf( 'ile' ) != -1 ) {
		// used 'ile' to capture 'Miles', 'miles', 'mile', and 'Miles'
		distanceUnit = 'm';
	}
	
	else if ( distanceEntry === 'Marathon' ) {
		distanceUnit = 'marathon';
	}
	
	else if ( distanceEntry === 'half-marathon' || distanceEntry === 'Half Marathon' || distanceEntry === 'half marathon' ) {
		distanceUnit = 'half';
	}
	
	else {
		distanceUnit = 'm';
	}
	
	//regex to remove unit if entered. 
	//from stackoverflow.com/questions/1862130/strip-non-numeric-characters-from-string
	 
	distanceConversion = distanceEntry.replace( /[^\d.-]/g, '' );
	
	// prints vars in console log.  remove once app is stable
	//console.log( "distanceEntry: " + distanceEntry + " distanceConversion: " + distanceConversion + "  Unit: " + distanceUnit );

	distanceToMiles( distanceConversion, distanceUnit );
	
}

var distanceConversion;	

function distanceToMiles(distance, unit) {
	
	if ( unit == 'k' ) {
		distanceConversion = distance * 0.62137119;
	}
	
	else if ( unit == 'marathon' ) {
		distanceConversion = 26.21875;
	}
	
	else if ( unit == 'half' ) {
		distanceConversion = 13.109375;
	}
	
	else if ( unit == 'meters' ) {
		distanceConversion = distance * 0.000621371;
	}
	
	else {
		distanceConversion = distance;
	}
		
	return distanceConversion;
}

var totalSeconds;	

function paceFunction() {

	var timeEntry;
	var timeHours;
	var timeMinutes;
	var timeSeconds;

	timeEntry = document.getElementById( 'timeEntry' ).value;
	
	var timeParts = timeEntry.split( ':' ); //split the time entry at the colons into an array
		
	if ( typeof timeParts[1] == 'undefined' ) {
		// if no colons are entered, assume the number is minutes (might to need to readdress this assumption)
		timeHours = 0;
		timeMinutes = timeParts[0];
		timeSeconds = 0;
		}	
	
	else if ( typeof timeParts[2] == 'undefined' ) {  
		// if only one colon is used, assume that the entry is mm:ss
		timeHours = 0;
		timeMinutes = timeParts[0];
		timeSeconds = timeParts[1];
		}
	
	else {
		// otherwise assume that the entry is hh:mm:ss
		timeHours = timeParts[0];
		timeMinutes = timeParts[1];
		timeSeconds = timeParts[2];
		}

	var hoursToSeconds = Number( timeHours === 0 ? 0 : ( timeHours * 60 * 60 ) );
	var minutesToSeconds = Number(timeMinutes * 60); 
	var secondsToSeconds = Number(timeSeconds);
	totalSeconds = Number( hoursToSeconds + minutesToSeconds + secondsToSeconds );
	
	displayPace( totalSeconds );
		
	// prints vars in console log.  remove once app is stable
	//console.log( "Hours: " + hoursToSeconds + "  Min: " + minutesToSeconds + "  Sec: " + secondsToSeconds + "  Tot: "+ totalSeconds );	
	
	return totalSeconds;
}

var paceTotalSeconds;	
var paceResult;

function displayPace(seconds){ 
	
	distanceConvert();

	
	var paceMinutes = Math.floor(seconds / distanceConversion / 60);
	var paceSeconds = Math.round(((seconds / distanceConversion / 60) % 1) * 60);
	
	if (paceSeconds === 60) {
		//if seconds rounds up to 60, add a minute and make seconds == '00'
		paceMinutes = paceMinutes + 1;
		paceSeconds = 0;
	}
	
	paceTotalSeconds = paceMinutes * 60 + paceSeconds;
	
	paceResult = paceMinutes + ':' + (paceSeconds < 10 ? '0' : '') + paceSeconds;	
	
	// instead of form validation, this will catch most entries that won't work
	if (paceResult === 'NaN' || paceResult === 'NaN:NaN' || paceResult === 'NaN:NaN:NaN' ||paceResult === 'Infinity:NaN') {
		paceResult = "<span class = 'rejection'>" + "Please reenter the time and distance" + "</span>";
		document.getElementById('calc').innerHTML = "<label>Pace:</label><output>" + paceResult + "</output>";
	}
	
	else {
	document.getElementById('calc').innerHTML = "<label>Pace:</label><output>" + paceResult + " minutes/mile" + "</output>" + "<div class = 'workout-pace'> <label></label><input type='button' value='Show Race Pace for Workouts' onclick='workoutFunction();'/> </div>";
	}
	
 }

function convertSecondstoMinutes(seconds) {
		var timeMinutes = Math.floor(seconds / 60);
		var timeSeconds = Math.round(((seconds / 60) % 1) * 60);
	
		if (timeSeconds === 60) {
		//if seconds rounds up to 60, add a minute and make seconds == '00'
		timeMinutes = timeMinutes + 1;
		timeSeconds = 0;
		}
	
		totalTime = timeMinutes + ':' + (timeSeconds < 10 ? '0' : '') + timeSeconds;		
		return totalTime;
}


function workoutFunction() {
	//TODO cleanup this function
	 
	var twoHundredMeters = Math.round(1600*paceTotalSeconds/1609.34/8);
		if (twoHundredMeters > 90) {
			twoHundredMeters = convertSecondstoMinutes(twoHundredMeters);	
		}

	var threeHundredMeters = Math.round(1600*paceTotalSeconds/1609.34/5.33333);
		if (threeHundredMeters > 90) {
			threeHundredMeters = convertSecondstoMinutes(threeHundredMeters);	
		}
	
	var fourHundredMeters = Math.round(1600*paceTotalSeconds/1609.34/4);
		if (fourHundredMeters > 90) {
			fourHundredMeters = convertSecondstoMinutes(fourHundredMeters);	
		}
	
	var sixHundredMeters = Math.round(1600*paceTotalSeconds/1609.34/16*6);
		if (sixHundredMeters > 90) {
			sixHundredMeters = convertSecondstoMinutes(sixHundredMeters);	
		}
	
	var eightHundredMeters = Math.round(1600*paceTotalSeconds/1609.34/2);
		if (eightHundredMeters > 90) {
			eightHundredMeters = convertSecondstoMinutes(eightHundredMeters);	
		}	
	
	var oneThousandMeters = Math.round(1600*paceTotalSeconds/1609.34/16*10);
		if (oneThousandMeters  > 90) {
			oneThousandMeters  = convertSecondstoMinutes(oneThousandMeters );	
		}
	
	var twelveHundredMeters = Math.round(1600*paceTotalSeconds/1609.34/16*12);
		if (twelveHundredMeters > 90) {
			twelveHundredMeters = convertSecondstoMinutes(twelveHundredMeters);	
		}
		
	var sixteenHundredMeters = Math.round(1600*paceTotalSeconds/1609.34/16*16);
		if (sixteenHundredMeters > 90) {
			sixteenHundredMeters = convertSecondstoMinutes(sixteenHundredMeters);	
		}	
	

	var workoutPaces = "<table class='table workout'>"+
							"<caption>Race Pace for Workouts</caption>"+
							"<th>Distance (meters)</th><th>Time</th>"+
							"<tr><td class = 'table-distance'>200</td><td>" + twoHundredMeters + "</td></tr>"+
							"<tr><td class = 'table-distance'>300</td><td>" + threeHundredMeters + "</td></tr>"+
							"<tr><td class = 'table-distance'>400</td><td>" + fourHundredMeters + " </td></tr>"+
							"<tr><td class = 'table-distance'>600</td><td>" + sixHundredMeters + " </td></tr>"+
							"<tr><td class = 'table-distance'>800</td><td>" + eightHundredMeters + " </td></tr>"+
							"<tr><td class = 'table-distance'>1000</td><td>" + oneThousandMeters + " </td></tr>"+
							"<tr><td class = 'table-distance'>1200</td><td>" + twelveHundredMeters + " </td></tr>"+
							"<tr><td class = 'table-distance'>1600</td><td>" + sixteenHundredMeters + " </td></tr>"+
							"</table>";

	document.getElementById('calc').innerHTML = "<label>Pace:</label><output>"  + paceResult + " minutes/mile" + "</output>" + "<div class = 'workout-pace'><p>" + workoutPaces +"</p></div>";
}