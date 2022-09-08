let clock = document.getElementById("clock");
setInterval(()=> {
    clock.textContent = new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
}, 1000)