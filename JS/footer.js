function socialPopUp(socialMedia){ //taking socialMedia as parameter to get information on which social media link was clicked
    alert("Thank you for clicking our " + socialMedia + " link"); //displaying the correct social media according to the button pressed
}

function displaypopup(event){
    var emailValue = document.forms["subscribeForm"]["email"].value;
    if(emailValue == ""){ //checking if the user submitted an empty email
        alert("Empty email! Please enter a valid email"); //displaying message popup 
        event.preventDefault(); //this prevents the form submit to reload the page
    }
    else {
        alert("Thank you! You will be alerted of our updates."); //displaying message popup
        document.forms["subscribeForm"]["email"].value = ""; //clearing the email entered by user after displaying popup message
        event.preventDefault();
    }
}