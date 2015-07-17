$(document).ready(function(){
	var query;
	var user=[];
	var mathMarks=[];
	var scienceMarks=[];
	var i,j;
	$('#statsBtn').on('click', function(){
		$('#download').show();
		$.getJSON('/statsData',{select:"username email maths science art"}, function(data){
			$('#a').html(JSON.stringify(data));
			j=data.length;
			user=[];
	 		mathMarks=[];
			scienceMarks=[];
			for(var i=4;i<j;i++){
				//console.log(data[i].username+" "+data[i].maths);
				user.push(data[i].username);
				mathMarks.push(data[i].maths);
				scienceMarks.push(data[i].science);
			}
			//console.log(user);
			var data = {
		  	labels: user,
		    datasets: [
		        {
		            label: "My First dataset",
		            fillColor: "rgba(220,220,220,0.2)",
		            strokeColor: "rgba(220,220,220,1)",
		            pointColor: "rgba(220,220,220,1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		          	data: mathMarks
		        },
		        {
		            label: "My Second dataset",
		            fillColor: "rgba(151,187,205,0.2)",
		            strokeColor: "rgba(151,187,205,1)",
		            pointColor: "rgba(151,187,205,1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(151,187,205,1)",
		            data: scienceMarks
		        }
		    ]
		};
		// Get the context of the canvas element we want to select
		var ctx = document.getElementById("myChart").getContext("2d");
		//var myNewChart = new Chart(ctx).PolarArea(data);
		ctx.clearRect(0,0,1000,400);
		var myLineChart = new Chart(ctx).Line(data);
		});
		//	console.log(data);
		
	});
	$('#statsBtnUsers').on('click', function(){
		$('#download').show();
		$.getJSON('/statsData', {select:"username maths science"},function(data){
			$('#a').html(JSON.stringify(data));
			j=data.length;
			user=[];
	 		mathMarks=[];
			scienceMarks=[];
			for(var i=4;i<j;i++){
				//console.log(data[i].username+" "+data[i].maths);
				user.push(data[i].username);
				mathMarks.push(data[i].maths);
				scienceMarks.push(data[i].science);
			}
			//console.log(user);
			var data = {
		  	labels: user,
		    datasets: [
		        {
		            label: "My First dataset",
		            fillColor: "rgba(220,220,220,0.2)",
		            strokeColor: "rgba(220,220,220,1)",
		            pointColor: "rgba(220,220,220,1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		          	data: mathMarks
		        },
		        {
		            label: "My Second dataset",
		            fillColor: "rgba(151,187,205,0.2)",
		            strokeColor: "rgba(151,187,205,1)",
		            pointColor: "rgba(151,187,205,1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(151,187,205,1)",
		            data: scienceMarks
		        }
		    ]
		};
		// Get the context of the canvas element we want to select
		var ctx = document.getElementById("myChart").getContext("2d");
		//var myNewChart = new Chart(ctx).PolarArea(data);
		ctx.clearRect(0,0,1000,400);
		var myLineChart = new Chart(ctx).Bar(data);
		
		});
		//console.log(user);
	}); 
	$('#download').on('click', function(){
		JSONToCSVConvertor($('#a').html(), "Users Data", true);
	});
	function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
	    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
	    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
	   // console.log(arrData);
	    var CSV = '';    
	    //Set Report title in first row or line
	    
	    CSV +=","+ReportTitle + '\r\n\n';

	    //This condition will generate the Label/Header
	    if (ShowLabel) {
	        var row = "";
	        
	        //This loop will extract the label from 1st index of on array
	        for (var index in arrData[0]) {
	           // console.log(index);
	            //Now convert each value to string and comma-seprated
	            row += index + ',';
	        }

	        row = row.slice(0, -1);
	       // console.log(row);
	        //append Label row with line break
	        CSV += row + '\r\n';
	    }
	    
	    //1st loop is to extract each row
	    for (var i = 0; i < arrData.length; i++) {
	        var row = "";
	        
	        //2nd loop will extract each column and convert it in string comma-seprated
	        for (var index in arrData[i]) {
	            row += '"' + arrData[i][index] + '",';
	        }

	        row.slice(0, row.length - 1);
	        
	        //add a line break after each row
	        CSV += row + '\r\n';
	    }

	    if (CSV == '') {        
	        alert("Invalid data");
	        return;
	    }   
	  //  console.log(CSV);
	    //Generate a file name
	    var fileName = "MyReport_";
	    //this will remove the blank-spaces from the title and replace it with an underscore
	    fileName += ReportTitle.replace(/ /g,"_");   
	    
	    //Initialize file format you want csv or xls
	    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
	    
	    // Now the little tricky part.
	    // you can use either>> window.open(uri);
	    // but this will not work in some browsers
	    // or you will not get the correct file extension    
	    
	    //this trick will generate a temp <a /> tag
	    var link = document.createElement("a");    
	    link.href = uri;
	    
	    //set the visibility hidden so it will not effect on your web-layout
	    link.style = "visibility:hidden";
	    link.download = fileName + ".csv";
	    
	    //this part will append the anchor tag and remove it after automatic click
	    document.body.appendChild(link);
	    link.click();
	    document.body.removeChild(link);
	}
})
