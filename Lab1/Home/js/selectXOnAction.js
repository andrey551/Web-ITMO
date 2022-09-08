const MIN_X = -5;
const MAX_X = 3;
function selectXOnAction() {
    let X = parseFloat(document.getElementById("type-X").value);
    let message = document.getElementById("message");
    if(isNaN(X)) {
        message.textContent = "Please type x as a number!"
        message.style = "color: red";
    } else if(X >= MAX_X || X <= MIN_X) {
        message.textContent = "Please type x in range {-5 .. 3}"
        message.style = "color: red";
    } else {
        message.textContent ="";
        let currentX = document.getElementById("current-X");
        currentX.textContent="Current X selected: " + X;
        document.getElementById("x-value").value = X;
    }
}