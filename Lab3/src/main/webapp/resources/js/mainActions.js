const message = document.getElementsByClassName("output-message")[2];
const canvas = document.querySelector(".graph-canvas");
const ctx = canvas.getContext('2d');

const X_CENTER = 220;
const Y_CENTER = 228;
const LINE_LENGTH = 20;

loadCanvas();
drawLastPoint();
setCoorToSend(null, null);

function getNearestY(yval) {
    return -parseFloat(yval - Y_CENTER) / parseFloat(2 * LINE_LENGTH);
}

function getNearestX(xval) {
    return parseInt((xval - X_CENTER) / (LINE_LENGTH* 2));
}

function getCursorPosition(event) {
    const x = getNearestX(event.offsetX);
    const y = getNearestY(event.offsetY);
    setPointFixed(x, y);
    setCoorToSend(x, y);
}

function setCoorToSend(xval, yval) {
    document.getElementById("formToSend:xToSend").value = xval;
    document.getElementById("formToSend:yToSend").value = yval;
}

function setRadiusToSend(rval) {
    document.getElementById("formToSend:rToSend").value = rval;
}

function sendReq() {
    document.querySelector(".submit-btn").click();

}

function getX() {
    let xtemp = document.getElementById("formToSend:xToSend").value
    let xval = parseFloat(xtemp);
    if(xval == null || isNaN(xval)) return 9;
    return xtemp;
}

function getY() {
    let ytemp = document.getElementById("formToSend:yToSend").value;
    let yval = parseFloat(ytemp);
    if(yval == null || isNaN(yval)) return 9;
    return ytemp;
}

function getR() {
    let rtemp = document.getElementById("formToSend:rToSend").value;
    let rval = parseFloat(rtemp);
    if(rval == null || isNaN(rval)) return -1;
    return rtemp;
}
canvas.addEventListener('mousedown', function(e) {
    let xval = getX();
    let yval = getY();
    let rval = getR();
    if(rval !== -1 ) {
        drawArea(parseFloat(rval));
        setRadiusToSend(rval);
        if(xval !== 9 && yval !== 9) {
            setCoorToSend(xval, yval);
            message.textContent = ""
        } else {
            getCursorPosition(e);
        }
        sendReq();
    } else{
        message.textContent = "Please type R !"
        loadCanvas();
    }

})

//Draw point submitted
function setPoint(xval, yval) {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(X_CENTER + xval * 2 * LINE_LENGTH,Y_CENTER - yval * 2 * LINE_LENGTH, 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

//Draw recently point with different color
function setPointFixed(xval, yval) {
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.arc(X_CENTER + xval * 2 * LINE_LENGTH, Y_CENTER - yval * 2 * LINE_LENGTH, 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}


function drawArea(r) {
    ctx.beginPath();

    //Draw triangle
    ctx.fillStyle = 'rgba(0,255,255, 0.4)';
    ctx.moveTo(X_CENTER - 2 * r * LINE_LENGTH, Y_CENTER);
    ctx.lineTo(X_CENTER, Y_CENTER +  r * LINE_LENGTH);
    ctx.lineTo(X_CENTER, Y_CENTER);
    ctx.fill();
    ctx.closePath();

    // Draw square
    ctx.beginPath();
    ctx.fillStyle = 'rgba(0,255,255, 0.4)';
    ctx.fillRect(X_CENTER - 2 * r * LINE_LENGTH , Y_CENTER - 2 * r * LINE_LENGTH, 2 * r * LINE_LENGTH, 2 * r * LINE_LENGTH);
    ctx.closePath();

    // Draw a quarter's cake part
    ctx.beginPath();
    ctx.fillStyle = 'rgba(0,255,255, 0.4)';
    ctx.moveTo(X_CENTER, Y_CENTER);
    ctx.lineTo(X_CENTER, Y_CENTER  + r * LINE_LENGTH);
    ctx.lineTo(X_CENTER + r * LINE_LENGTH, Y_CENTER );
    ctx.lineTo(X_CENTER, Y_CENTER );
    ctx.fill();
    ctx.arc(X_CENTER, Y_CENTER, r * LINE_LENGTH,  0, Math.PI * 0.5);
    ctx.fill();

    ctx.closePath();
}

//Draw list of point submitted
function drawLastPoint() {
    let x = document.getElementsByClassName("xRes");
    let y = document.getElementsByClassName('yRes');
    let r = document.getElementsByClassName('resultRes')
    for(let i = 0 ;i < x.length ; ++i) {
        if(r[i].textContent == "Hit") {
            setPointFixed(parseFloat(x[i].textContent), parseFloat(y[i].textContent));
        } else {
            setPoint(parseFloat(x[i].textContent), parseFloat(y[i].textContent));
        }

    }
}


function loadCanvas() {
    ctx.beginPath();
    ctx.fillStyle="rgba(255,255,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.moveTo(220, 448);
    ctx.lineTo(220, 0);
    ctx.moveTo(0, 228)
    ctx.lineTo(448, 228);
    ctx.stroke();
    var rad = getR();
    if(rad != -1) {
        drawArea(rad);
    }
}

var preventSubmit = function(event) {
    if(event.keyCode == 13) {
        console.log("caught ya!");
        event.preventDefault();
        //event.stopPropagation();
        return false;
    }
}

var formSubmit = document.getElementById("formToSend");
formSubmit.addEventListener("keydown", preventSubmit);
formSubmit.addEventListener("keyup", preventSubmit);
formSubmit.addEventListener("keypress", preventSubmit);
var formInput = document.querySelector(".data-form");
formInput.addEventListener("keydown", preventSubmit);
formInput.addEventListener("keyup", preventSubmit);
formInput.addEventListener("keypress", preventSubmit);

