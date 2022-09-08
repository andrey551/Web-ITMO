const Y_VAL = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

function typeYOnAction() {
    let typeY = document.querySelectorAll(".y-checkbox");
    let message = document.getElementById("message");
    let yCount= 0;
    let yval;
    for(let i = 0; i < 9; ++i) {
        if(typeY[i].checked) {
            ++yCount
            yval = i - 4;
        }
    }

    if(yCount > 1 ) {
        message.style = "color: red";
        message.textContent = "Please select no more than 1 y value!"
    } else if(yCount == 0) {
        message.style = "color: red";
        message.textContent = "Please select y"
        document.getElementById("y-value").value = "";
        document.getElementById("current-Y").textContent = "Current Y selected:";
    } else {
        message.textContent ="";
        if(!Y_VAL.includes(yval)) return;
        let currentY = document.getElementById("current-Y");
        currentY.textContent="Current Y selected: " + yval;
        document.getElementById("y-value").value = yval;
    }
}