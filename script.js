// variables related to biography page
var i = 0;
var heroHeadingText = "Hi, I am Akhil Eaga..."
var speed = 100;

// variables related to the demonstration page
var apiQuotes = [];
var loadedEarlier = false;

// runs the function once the window is loaded
window.onload = function(){
    // setting the biography page hero header to none
    if(document.getElementById("hero-heading-bio") !== null){
        document.getElementById("hero-heading-bio").innerHTML = "";
    }
    typingEffect();
    loadQuote();
    // randomQuoteGenerator();
    convertToHTML();
}

// creates the typing effect in the biography page
function typingEffect(){
    if(i < heroHeadingText.length){
        // utilised the generic "document" object to show it usage
        if(document.getElementById("hero-heading-bio") === null){
            // this if condition ensures that this typingEffect recursion works only when the hero-heading id is found
            i = heroHeadingText.length;
        }
        else{
            // this code block runs only when the hero-heading-bio is found in the page
            document.getElementById("hero-heading-bio").innerHTML += heroHeadingText.charAt(i);
            i++;
            setTimeout(typingEffect, speed);
        }
    }
    else {
        // utilised jquery to change the styling after the type effect by adding some theme coloring
        $('#hero-heading-bio').empty().append('Hi<span class = "color-theme">,</span> I am Akhil Eaga.<span class ="color-theme">.</span>.');
    }
}

// makes an XMLHttpRequest to the API and loads the quotes into a local array` for quicker loading upon clicking the new quote button
function loadQuote(){
    var xhttp = new XMLHttpRequest();
    const method = "GET"
    const url = "https://type.fit/api/quotes";
    xhttp.open(method, url, true);
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            apiQuotes = this.responseText;
            apiQuotes = JSON.parse(apiQuotes);
        }
    }
    xhttp.send();
}

// creates a random number and uses that number as the index to load a random quote from the quotes array
function randomQuoteGenerator(){
    var randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    var randomQuoteText = '<span><i class="ion-quote"></i></span> &nbsp; ' + randomQuote.text;
    if(randomQuote.author === null){
        var randomQuoteAuthor = "- Anonymous";
    }else{
        var randomQuoteAuthor = "- " + randomQuote.author;
    }
    
    if(document.getElementById("quote-of-the-day") !== null){
        document.getElementById("quote-of-the-day").innerHTML = randomQuoteText;
        document.getElementById("quote-author").innerHTML = randomQuoteAuthor;
    }
}

// converts the html code written in the right side pane of the HTML examples (demonstration.html page) to display it in the left pane
function convertToHTML(){
    var element = document.querySelectorAll(".demo-result-container");
    var display = document.querySelectorAll(".demo-code-container div");

    for(let j = 0; j < element.length; j++){
        var html = element[j].innerHTML;

        // string modification
        var displayString = html.replaceAll("<", "&lt;");
        displayString = displayString.replaceAll(">", "&gt;");

        // removes the trailing line breaks and spaces
        displayString = displayString.replace(/^\s+|\s+$/g, '');
    
        display[j].innerHTML = displayString;
        // console.log(displayString)
    }
}

// using js and DOM to change the appearance of a div
function toggleMode(){
    var element = document.getElementById("color-changer");
    element.classList.toggle("night-mode")
}

// Using jquery to animate a div
function animatedBox(){
    $("#animatedBox").animate({
        left: '+=50px',
        width: "+=50px"
    }, 2000);
}

// Using HTML forms and JS to perform calculations
function calculateSimpleInterest(){
    var principal = document.getElementById("principal").value;
    var percentage = document.getElementById("interest").value;
    var years = document.getElementById("years").value;
    var resultElement = document.getElementById("simpleInterest");

    // input validation 
    if(principal == "" || percentage == "" || years == ""){
        resultElement.innerHTML = "** please enter a valid input value";
        resultElement.style.color = "red";
    }
    else {
        principal = parseFloat(principal, 10);
        percentage = parseFloat(percentage, 10);
        years = parseFloat(years, 10);

        if(Number.isNaN(principal) || Number.isNaN(percentage) || Number.isNaN(years)){
            resultElement.innerHTML = "** please input only numbers in all fields";
            resultElement.style.color = "red";
        } 
        else{
            var interestValue = principal * (percentage / 100) * years;
            resultElement.innerHTML = "Simple interest payable is :  <strong style='color: green;'>" + interestValue + "</strong>";
        }
    }
}
