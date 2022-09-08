const R_VAL = [1, 2, 3, 4, 5]
function clickROnAction(obj) {
    if(R_VAL.includes(parseInt(obj))) setCurrentR(obj);
}
function setCurrentR(R) {
    let selectR = document.getElementById("current-R");
    selectR.textContent="Current R selected: " + R;
    document.getElementById("r-value").value = R;
}