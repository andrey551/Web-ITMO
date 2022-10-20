var yMessage = document.getElementsByClassName("output-message")[1];
function onTyping() {
    var y = document.querySelector(".input-value").value;
    if(isNaN(parseFloat(y))) {
        yMessage.innerText = "Please enter y as number!"
    }  else if(parseFloat(y) > 5 || parseFloat(y) < -3)  {
        yMessage.innerText = "Please enter y in range [-3 .. 5]!"
        y = "";
    } else {
        yMessage.innerText = "";
        document.getElementById("formToSend:yToSend").value = y.toString();
    }
}