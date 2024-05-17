var guestname = prompt("Hello! What is your name?");
var firstChar = guestname.slice(0,1);
var restChar = guestname.slice (1,guestname.length)
var uppercase_firstChar = firstChar.toUpperCase();
var uppercase_restChar = restChar.toLowerCase();
alert("Hi " + uppercase_firstChar + uppercase_restChar + "!" + "  Thank you for visiting my first webpage :)" + "  My web app aims to streamline the way people travelling in a group plan their trip - hope you find it useful!");