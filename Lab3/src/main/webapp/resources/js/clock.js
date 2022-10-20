document.querySelector(".date").innerText = getDay(new Date().getUTCDay())
    + ", " + new Date().toLocaleString().slice(0, -13);
var time = document.querySelector(".time");
setInterval(updateTime, 1000);
function updateTime() {
    time.innerText = new Date().toLocaleString().substring(11, 23);
}

updateTime();

function getDay(e) {
    switch (e) {
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "Sunday";
    }
}