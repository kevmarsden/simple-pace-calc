<!DOCTYPE html>
<html lang="en">
	
	<head>
	
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta http-equiv="Cache-control" content="public">
	
		<title>Simple Pace Calculator - Running</title>
		<meta name = "description" content = "Once you enter your running time and distance, the simple pace calculator will output the running pace in minutes per mile">
	
		<link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
	
		<link rel='stylesheet' href='assets/css/style.min.css'>
	
		<script async language="javascript" type="text/javascript" src="assets/js/pace.min.js"></script>
	
		<!-- Bootstrap CSS and theme -->
		<link rel="stylesheet" href='assets/css/bootstrap.min.css'>
			
		<!-- Latest compiled and minified JavaScript -->
		<script async src="assets/js/bootstrap.min.js"></script>
	
		<!-- Google Analytics script -->
		<script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	
		  ga('create', 'UA-12018723-17', 'auto');
		  ga('send', 'pageview');
		</script>
	
	</head>
	
	<body>
	
		<!-- Bootstrap fixed navbar -->
	    <nav class="navbar navbar-default navbar-fixed-top">
	      
	    <div class="container">
	        
	        <div class="navbar-header">
	          
	          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
	          
	            <span class="sr-only">Toggle navigation</span>
	            <span class="icon-bar"></span>
	            <span class="icon-bar"></span>
	            <span class="icon-bar"></span>
	            
	          </button>
	          
	          <a class="navbar-brand" href="http://www.simplepacecalc.com">Simple Pace Calculator</a>
	        
	        </div>
	        
	        <div id="navbar" class="collapse navbar-collapse">
	          
	        	<ul class="nav navbar-nav">
					
					<li class="active"><a href="http://www.simplepacecalc.com">Home</a></li>
					
					<li><a href="help.html">Help</a></li>
					
	        	</ul>
	          
	    	</div><!--.nav-collapse -->
	    	
	    </div><!-- .container -->
	    
	    </nav>
	
		<!-- Bootstrap page content -->
	    <div class="container">
	    	
	    	<div class="page-header">
	    	
	    	</div> <!-- end page-header div -->
	
	
				<form>
					
					<div class = "form">
	
						<label>Time:</label> <input name="timeEntry" type="text" maxlength="10" id="timeEntry"
						class="timeEntry" placeholder="Enter as: hrs:min:sec" pattern="\d:"/>
	
						<label>Distance:</label> <input name="distanceEntry" type="text" maxlength="15" id="distanceEntry"
						class="distanceEntry" list="distanceDropMenu" placeholder="Enter distance"/>
						<datalist id="distanceDropMenu">
							<option>3 miles</option>
							<option>5k</option> <!-- value = 3.10686 -->
							<option>8k</option> <!-- value = 4.97097 -->
							<option>10k</option> <!-- value = 6.21371 -->
							<option>15k</option> <!-- value = 9.32057 -->
							<option>10 miles</option><!-- value = 10 -->
							<option>Half Marathon</option>
							<option>Marathon</option> <!-- value = 26.21875 -->
							<option>50k</option> <!-- value = 31.0686 -->
							<option>50 miles</option> <!-- value = 50 -->
							<option>100k</option> <!-- value = 62.1371 -->
							<option>100 miles</option> <!-- value = 100 -->
						</datalist>
	
						<label></label><input type="button" value="Submit" onclick="paceFunction();"/>
	
						<div id = "calc">
							
							<label>Pace:</label>
							
							<script>
								document.write("");
							</script>
	
						</div>
	
					</div> <!-- .form-->
					
				</form>
				
	    </div> <!-- .container-->
	
	
		<!-- Bootstrap fixed footer -->
		<footer class="footer">
	    	
	    	<div class="container">
		    	
				<p class="text-muted">Created by <a href='https://kmarsden.com'>Kevin Marsden</a></p>
				
	    	</div>
	    	
		</footer>
	
	</body>
	
</html>