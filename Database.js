/*	class to handle request to server related to the database

*/

function Database(){
	//simulate static variable, input "" to return previous error message without modifying it
	function error(errMsg) {
		if (errMsg == "") {
			if(typeof error.msg == 'undefined' ){
				error.msg = "";
			}
		}else{
			error.msg = errMsg;
		}
		return error.msg;	
	}
}


Database.query = function(data){
	if(arguments.length != 1){
		//on modifie data
		for(var i=1; i<arguments.length; i++){  
			var arg=arguments[i];
			var reg=new RegExp("[?]");
			if(arg.constructor.toString().indexOf("Array") != -1){
				//array
				for(var j=0; j<arg.length; i++){
					data=data.replace(reg, arg[j].toString());
				}
			}else{
				//string, int or objet
				if(typeof arg == 'string'){
					arg = "\'" + arg + "\'";
				}
				data=data.replace(reg, arg.toString());
			}
		}  
	}
	
	var obj = {
				"action" : "sql",
				"query" : data
				}
	
	var x = reqToServer(obj);
	
	if(x.status == 'ok'){
		//{'status':'ok','result':query result}
		return x.result;
	}else{
		//{'status':'err','msg':error message}
		Database.error(x.msg);
		return null;
	}			
}

Database.query0 = function(data){
	if(arguments.length != 1){
		//on modifie data
		for(var i=1; i<arguments.length; i++){  
			var arg=arguments[i];
			var reg=new RegExp("[?]");
			if(arg.constructor.toString().indexOf("Array") != -1){
				//array
				for(var j=0; j<arg.length; i++){
					data=data.replace(reg, arg[j].toString());
				}
			}else{
				//string, int or objet
				if(typeof arg == 'string'){
					arg = "\'" + arg + "\'";
				}
				data=data.replace(reg, arg.toString());
			}
		}  
	}
	
	var obj = {
				"action" : "sql",
				"query" : data
				}
	
	var x = reqToServer0(obj);
	
	if(x.status == 'ok'){
		//{'status':'ok','result':query result}
		return x.result;
	}else{
		//{'status':'err','msg':error message}
		Database.error(x.msg);
		return null;
	}			
}

//function to send a request to the server (DBserver.php)
function reqToServer(object) {
	debug = false;
	if(window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	}else if(window.ActiveXOject) {// IE
		try{
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			try{
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(el){
				xhr = null;
			}
		}
	}else {
		alert("Your browser doesn't support XMLHTTPRequest\nPlease update it");
	}
	
	if (!xhr) {
		alert('Giving up :( Cannot create an XMLHTTP instance')
		return null;
	}
	
	xhr.open('POST', "db/DBserver.php", false);// false -> send is blocking
	msg=JSON.stringify(object);
	//debugging
	if(debug){
		//alert("DEBUG sending: " + msg);
	}
	
	try {
		xhr.send(msg);
	} catch (e) {
		alert(e);
		return null;
	}
	
	if ((xhr.readyState == 4)
			|| (xhr.readyState == "complete")) {
		if (xhr.status != 200) {
			alert('There was a problem with the request: ' 
					+ xhr.status)
			return null;
		}
	}
		
	if(debug){
		alert("DEBUG answer: " + xhr.responseText);
	}
	return eval('(' + xhr.responseText + ')'); 

}

function reqToServer0(object) {
	debug = true;
	if(window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	}else if(window.ActiveXOject) {// IE
		try{
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			try{
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(el){
				xhr = null;
			}
		}
	}else {
		alert("Your browser doesn't support XMLHTTPRequest\nPlease update it");
	}
	
	if (!xhr) {
		alert('Giving up :( Cannot create an XMLHTTP instance')
		return null;
	}
	
	xhr.open('POST', "db/DBserver.php", false);// false -> send is blocking
	msg=JSON.stringify(object);
	//debugging
	if(debug){
		//alert("DEBUG sending: " + msg);
	}
	
	try {
		xhr.send(msg);
	} catch (e) {
		alert(e);
		return null;
	}
	
	if ((xhr.readyState == 4)
			|| (xhr.readyState == "complete")) {
		if (xhr.status != 200) {
			alert('There was a problem with the request: ' 
					+ xhr.status)
			return null;
		}
	}
		
	if(debug){
		alert("DEBUG answer: " + xhr.responseText);
	}
	return eval('(' + xhr.responseText + ')'); 

}
