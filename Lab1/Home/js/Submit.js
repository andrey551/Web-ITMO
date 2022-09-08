const message = document.getElementById("message");
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const X_CENTER = 220;
const Y_CENTER = 228;
const LINE_LENGTH = 20;

var globalX;
var globalY;
var PersistentSize;
loadCanvas();
loadPersistent();
function loadPersistent() {
    PersistentSize = localStorage.getItem("PersistentSize");
    if(PersistentSize == null) {
        PersistentSize = 0;
    } else {
        PersistentSize = parseInt(PersistentSize);
    }
    localStorage.setItem("PersistentSize", PersistentSize);
    for(let i = 0 ; i < PersistentSize; ++i) {
        let str = localStorage.getItem(i + 1).split(" ");
        addRow(str[0], str[1], str[2], str[3]);
    }
}
//Set condition for submit action
document.getElementById("send-data-form").addEventListener('submit', function(event) {
    event.preventDefault();
    let xToSend = document.getElementById("x-value").value;
    let yToSend = document.getElementById("y-value").value;
    let rToSend = document.getElementById("r-value").value;
    if(xToSend == "" || yToSend == "" || rToSend == "" ) {

        message.textContent = "Please full fill/ select x, y and r"
        message.style = "color: red";
    } else if(isNaN(xToSend)){
        message.textContent = "Please type x as a number"
        message.style = "color: red";
    } else if(yToSend > 4 || yToSend < -4) {
        message.textContent = "Please type y in range {-4 .. 4}"
        message.style = "color: red";
    } else {
        globalX = xToSend;
        globalY = yToSend;
        let xhttp = new XMLHttpRequest(); // XMLHttpRequest make HTTP request :))
        xhttp.onreadystatechange = function() {
            if (this.status==200 && this.readyState == 4) {
                let arr = JSON.parse(this.responseText); 
                addRow(xToSend, yToSend, rToSend, arr.result);
                message.textContent = "Process sucessfully!"
                message.style = "color: green";
                localStorage.setItem(++PersistentSize, xToSend + " " + yToSend + " " + rToSend + " " + arr.result);
                localStorage.setItem("PersistentSize", PersistentSize);
              }
        }
        xhttp.open("GET", "../Process/process.php?x=" + xToSend + "&y=" + yToSend + "&r=" + rToSend, true);
        xhttp.send();
    }
    loadCanvas();
    drawArea(rToSend);
    drawLastPoint();
    setPointFixed(globalX, globalY);
    setDefaultValue();
})

function addRow(x, y, r, result) {
    let rowToAdd = document.getElementById("main-table");
    let row = document.createElement("tr");
    let xCol = document.createElement("td");
    let yCol = document.createElement("td");    
    let rCol = document.createElement("td");
    let resCol = document.createElement("td");
    xCol.textContent = x;
    xCol.className = "result-x";
    yCol.textContent = y;
    yCol.className = "result-y";
    rCol.textContent = r;
    rCol.className = "result-r";
    resCol.textContent = result;
    if(result == "hit") resCol.style = "color: green";
        else resCol.style= "color: red";
    row.appendChild(xCol);
    row.appendChild(yCol);
    row.appendChild(rCol);
    row.appendChild(resCol);
    rowToAdd.appendChild(row); // Add row at the top of table
}

// Draw image of canvas
function loadCanvas() {
    const img = new Image();
    img.src = 'image/ver1.png';
    ctx.drawImage(img, 0, 0, 449, 449);

}

//Draw point submited
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
    ctx.fillStyle = '#FFA500';
    ctx.arc(X_CENTER + xval * 2 * LINE_LENGTH, Y_CENTER - yval * 2 * LINE_LENGTH, 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}



function drawArea(r) {
    loadCanvas();
    ctx.beginPath();

    //Draw triangle
    ctx.fillStyle = 'blue';
    ctx.moveTo(X_CENTER + r * LINE_LENGTH, Y_CENTER);
    ctx.lineTo(X_CENTER, Y_CENTER - r * LINE_LENGTH);
    ctx.lineTo(X_CENTER, Y_CENTER);
    ctx.fill();
    ctx.closePath();
    // Draw square
    ctx.beginPath();
    ctx.fillStyle = '#ff6';
    ctx.fillRect(X_CENTER , Y_CENTER, 2 * r * LINE_LENGTH, 2 * r * LINE_LENGTH);
    ctx.closePath();

    // Draw a quarter's cake part
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.moveTo(X_CENTER, Y_CENTER);
    ctx.lineTo(X_CENTER, Y_CENTER - 2 * r * LINE_LENGTH);
    ctx.lineTo(X_CENTER - 2 * r * LINE_LENGTH, Y_CENTER );
    ctx.lineTo(X_CENTER, Y_CENTER );
    ctx.fill();
    ctx.arc(X_CENTER, Y_CENTER, 2 * r * LINE_LENGTH,  Math.PI, Math.PI * 1.5);
    ctx.fill();

    ctx.closePath();
}

//Draw list of point submited
function drawLastPoint() {
    let x = document.getElementsByClassName('result-x');
    let y = document.getElementsByClassName('result-y');
    for(let i = 0 ;i < x.length ; ++i) {
        setPoint(parseInt(x[i].textContent), parseFloat(y[i].textContent));
    }
}

// Set default element after submit( clear expired data )
function setDefaultValue() {
    document.getElementById("x-value").value = "";
    document.getElementById("y-value").value = "";
    document.getElementById("r-value").value = "";

    document.getElementById("type-X").value = "";
    let checkboxList = document.getElementsByClassName("y-checkbox");
    for(let i = 0; i < checkboxList.length; ++i) {
        checkboxList[i].checked = false;
    }

    document.getElementById("x-value").value = "";
    document.getElementById("y-value").value = "";
    document.getElementById("r-value").value = "";

    document.getElementById("current-X").textContent = "Current X selected:";
    document.getElementById("current-Y").textContent = "Current Y selected:";
    document.getElementById("current-R").textContent = "Current R selected:";

}

function reset() {
    localStorage.clear();
    location.reload();
}