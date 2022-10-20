var xMessage = document.getElementsByClassName("output-message")[0];
function booleanOnClick() {
    var booleanList = document.getElementsByClassName("checkbox-value");
    var counter = 0;
    var value;
   for(let i = 0; i < 7; ++i) {
       if(booleanList[i].checked) {
           ++counter;
           value = i - 3;
       }
   }
    if(counter == 1) {
        document.getElementById("formToSend:xToSend").value = value.toString();
        xMessage.innerText = "";
    } else {
        xMessage.innerText = "Please select exactly 1 x value!";
    }
}