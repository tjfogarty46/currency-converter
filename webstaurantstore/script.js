//Script by TJ Fogarty

//Start by declaring constants
//the start of the string for the GET request
const baseUrl = 'https://api.exchangeratesapi.io/latest?base=';

//fetching the DOM objects for the selectors and the text box
const firstSelect = document.getElementById("currency1");
const secondSelect = document.getElementById("currency2");
const myInput = document.getElementById("input");

//adding event listeners for when each of these elements experience a change
firstSelect.addEventListener('change', conversionFunction);
secondSelect.addEventListener('change', conversionFunction);
myInput.addEventListener('change', conversionFunction);


//function to be called when the user changes an element
//async because fetch is an async function itself
//converts the input value from the first input currency into the second input currency
async function conversionFunction(){
    var toBeConverted = myInput.value;
    //checks if the input value is a non-negative number
    //if not a non-negative number, exits function and alerts user
    if(toBeConverted.length == 0 || toBeConverted < 0){
        alert("please enter a non-negative value to be converted");
        return;
    }

    //curr1 equals the currency code. ex: curr1 = USD when US Dollar selected
    //fullCurr1 equals the written out currency. ex: fullCurr1 = US Dollar
    var curr1 = firstSelect.options[firstSelect.selectedIndex].value;
    var fullCurr1 = firstSelect.options[firstSelect.selectedIndex].innerHTML;

    var curr2 = secondSelect.options[secondSelect.selectedIndex].value;    
    var fullCurr2 = secondSelect.options[secondSelect.selectedIndex].innerHTML;

    //uses fetch api to obtain the conversion rate between the two currencies    
    const response = await fetch(baseUrl + curr1 + "&symbols=" + curr2);
    const myJson = await response.json();

    //gets the rate from the json returned by fetch and converts the input value
    const rate = myJson.rates[curr2];
    var converted = toBeConverted * rate;

    //modifies the inner html of the top elements to show the conversion
    document.getElementById("conversion").innerHTML = "" + toBeConverted + " " + fullCurr1 + " equals";
    document.getElementById("endConversion").innerHTML = "" + converted + " " + fullCurr2;
    document.getElementById("dayStamp").innerHTML = "as of " + myJson.date;
    document.getElementById("output").value = converted;
}