function distanceConvert() {
	// convert entry from dropdown menu into miles and return or return manual entry
	
	var distanceEntry = document.getElementById( 'distanceEntry' ).value;
	
	var distanceUnit;

	if ( distanceEntry.indexOf('k') != -1 || distanceEntry.indexOf( 'K' ) != -1 ) {
		distanceUnit = 'k';
	}
	
	else if ( distanceEntry.indexOf( 'k' ) == -1 && distanceEntry.indexOf( 'eter' ) != -1 ) {
		// if user enters 'meters' but not kilometers
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
	distanceSanitize = distanceEntry.replace( /[^\d.-]/g, '' );
	
	return convertDistanceToMiles( distanceSanitize, distanceUnit );
	
}

function convertDistanceToMiles(distance, unit) {
	
	let distanceConversion = "";

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

function convertTimeToSeconds(timeEntry) {

	let timeHours;
	let timeMinutes;
	let timeSeconds;
	
	let timeParts = timeEntry.split( ':' ); //split the time entry at the colons into an array
		
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
			
	return totalSeconds;
}
 
function distanceCalc() {
	let timeEntry = document.getElementById( 'timeEntry' ).value;
	let totalSeconds = convertTimeToSeconds(timeEntry);

	let paceEntry = document.getElementById( 'paceEntry').value;
	let paceSeconds = convertTimeToSeconds(paceEntry);

	let distance = totalSeconds / paceSeconds;
	displayDistance( distance );
}

function displayDistance(distance) { 
	if (isNaN(parseInt(distance))) {
		distance = "<span class = 'rejection'>" + "Please reenter the time and pace" + "</span>";
		document.getElementById('calc').innerHTML = "<output>" + distance + "</output>";
	}
	else {
		document.getElementById('distanceEntry').value = `${distance.toFixed(2)}`;
		//Change focus state to the distance input field
		document.getElementById('distanceEntry').focus();
	}
}

function timeCalc() {
	let distanceEntry = distanceConvert();

	let paceEntry = document.getElementById( 'paceEntry').value;
	let paceSeconds = convertTimeToSeconds(paceEntry);

	totalTime = distanceEntry * paceSeconds;

	if (totalTime > 3599) {
		let hours = Math.floor(totalTime / 3600);
		let minutes = Math.floor(((totalTime / 3600 ) % 1) * 60);
		let seconds = Math.round(((totalTime / 60 ) % 1) * 60); 
		if (seconds === 60) {
			//if seconds round up to 60, add a minute and make seconds == '00'
			minutes = minutes + 1;
			seconds = 0;
		}
		if (minutes === 60) {
			//if minutes round up to 60, add an hour and make minutes == '00'
			hours = hours +1;
			minutes = 0;
		}
		totalTime = hours + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;	
	}

	else {
		let minutes = Math.floor(totalTime / 60 );
		let seconds = Math.round(((totalTime / 60 ) % 1) * 60); 
		if (seconds === 60) {
			//if seconds round up to 60, add a minute and make seconds == '00'
			minutes = minutes + 1;
			seconds = 0;
		}
		totalTime = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;	
	}

	displayTime(totalTime);
}

function displayTime(time) { 
	if (isNaN(parseInt(time))) {
		time = "<span class = 'rejection'>" + "Please reenter the distance and pace" + "</span>";
		document.getElementById('calc').innerHTML = `<output> + ${time} + </output>`;
	}
	else {
		document.getElementById('timeEntry').value = `${time}`;
		//Change focus state to the time input field
		document.getElementById('timeEntry').focus();
	}
}

function paceCalc() {
	let timeEntry = document.getElementById( 'timeEntry' ).value;
	let totalSeconds = convertTimeToSeconds(timeEntry);
	displayPace( totalSeconds );
}

function displayPace(seconds) { 
	let paceResult = calculatePace(seconds);

	// instead of form validation, this will catch most entries that won't work
	if (paceResult === 'NaN' || paceResult === 'NaN:NaN' || paceResult === 'NaN:NaN:NaN' ||paceResult === 'Infinity:NaN') {
		paceResult = "<span class = 'rejection'>" + "Please reenter the time and distance" + "</span>";
		document.getElementById('calc').innerHTML = "<output>" + paceResult + "</output>";
	}
	
	else {
	document.getElementById('paceEntry').value = paceResult;
	//Change focus state to the pace input field
	document.getElementById('paceEntry').focus();
	}
}

function calculatePaceMinutes(seconds) {
	let distanceConversion = distanceConvert();
	return Math.floor(seconds / distanceConversion / 60);
}

function calculatePaceSeconds(seconds) {
	let distanceConversion = distanceConvert();
	return Math.round(((seconds / distanceConversion / 60) % 1) * 60);
}

function calculatePace(seconds) {

	let paceMinutes = calculatePaceMinutes(seconds);
	let paceSeconds = calculatePaceSeconds(seconds);
	
	if (paceSeconds === 60) {
		//if seconds rounds up to 60, add a minute and make seconds == '00'
		paceMinutes = paceMinutes + 1;
		paceSeconds = 0;
	}
		
	paceResult = paceMinutes + ':' + (paceSeconds < 10 ? '0' : '') + paceSeconds;	
	
	return paceResult;
}

function convertSecondstoMinutes(seconds) {

		let timeMinutes = Math.floor(seconds / 60);
		let timeSeconds = Math.round(((seconds / 60) % 1) * 60);
	
		if (timeSeconds === 60) {
		//if seconds rounds up to 60, add a minute and make seconds == '00'
		timeMinutes = timeMinutes + 1;
		timeSeconds = 0;
		}
	
		totalTime = timeMinutes + ':' + (timeSeconds < 10 ? '0' : '') + timeSeconds;		
		return totalTime;
}

function workoutFunction(seconds) {
	//TODO cleanup this function
	
	let paceTotalSeconds = convertTimeToSeconds();
	let paceResult = calculatePace(paceTotalSeconds);

	let twoHundredMeters = Math.round(1600 * paceTotalSeconds / 1609.34 / 8);
		if (twoHundredMeters > 90) {
			twoHundredMeters = convertSecondstoMinutes(twoHundredMeters);	
		}

	let threeHundredMeters = Math.round(1600 * paceTotalSeconds / 1609.34 / 5.33333);
		if (threeHundredMeters > 90) {
			threeHundredMeters = convertSecondstoMinutes(threeHundredMeters);	
		}
	
	let fourHundredMeters = Math.round( 1600 * paceTotalSeconds / 1609.34 / 4);
		if (fourHundredMeters > 90) {
			fourHundredMeters = convertSecondstoMinutes(fourHundredMeters);	
		}
	
	let sixHundredMeters = Math.round(1600 * paceTotalSeconds / 1609.34 / 16 * 6);
		if (sixHundredMeters > 90) {
			sixHundredMeters = convertSecondstoMinutes(sixHundredMeters);	
		}
	
	let eightHundredMeters = Math.round(1600 * paceTotalSeconds / 1609.34 / 2);
		if (eightHundredMeters > 90) {
			eightHundredMeters = convertSecondstoMinutes(eightHundredMeters);	
		}	
	
	let oneThousandMeters = Math.round(1600 * paceTotalSeconds / 1609.34 / 16 * 10);
		if (oneThousandMeters  > 90) {
			oneThousandMeters  = convertSecondstoMinutes(oneThousandMeters );	
		}
	
	let twelveHundredMeters = Math.round(1600 * paceTotalSeconds / 1609.34 / 16 * 12);
		if (twelveHundredMeters > 90) {
			twelveHundredMeters = convertSecondstoMinutes(twelveHundredMeters);	
		}
		
	let sixteenHundredMeters = Math.round(1600 * paceTotalSeconds / 1609.34 / 16 * 16);
		if (sixteenHundredMeters > 90) {
			sixteenHundredMeters = convertSecondstoMinutes(sixteenHundredMeters);	
		}	
	
	let workoutPaces = `<table class='table workout'>
							<caption>Race Pace for Track Workouts</caption>
							<th>Distance (meters)</th><th>Time (min:sec)</th>
							<tr><td class = 'table-distance'>200</td><td>${twoHundredMeters}</td></tr>
							<tr><td class = 'table-distance'>300</td><td>${threeHundredMeters}</td></tr>
							<tr><td class = 'table-distance'>400</td><td>${fourHundredMeters} </td></tr>
							<tr><td class = 'table-distance'>600</td><td>${sixHundredMeters}</td></tr>
							<tr><td class = 'table-distance'>800</td><td>${eightHundredMeters}</td></tr>
							<tr><td class = 'table-distance'>1000</td><td>${oneThousandMeters}</td></tr>
							<tr><td class = 'table-distance'>1200</td><td>${twelveHundredMeters}</td></tr>
							<tr><td class = 'table-distance'>1600</td><td>${sixteenHundredMeters}</td></tr>
						</table>`;

	document.getElementById('calc').innerHTML = "<div class = 'workout-pace'><p>" + workoutPaces +"</p></div>";
}