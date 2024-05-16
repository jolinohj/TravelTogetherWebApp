var guestname = prompt("Hello! What is your name?");
var name_firstChar = guestname.slice(0,1);
var name_restChar = guestname.slice (1,guestname.length)
var uppercase_firstChar = name_firstChar.toUpperCase();
var uppercase_restChar = name_restChar.toLowerCase();
alert("Hi " + uppercase_firstChar + uppercase_restChar "!" + "Thank you for visiting my first webpage :)" + "  This a web app that aims to streamline the way people travelling in a group plan their trip - hope you find it useful!");