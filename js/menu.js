document.addEventListener('DOMContentLoaded', function () {

    const switchCC1 = document.getElementById("tucursos-cc-1");
    switchCC1.addEventListener('change', function() {
        alert(switchCC1.checked);
    }, false);

    const switchCC2 = document.getElementById("tucursos-cc-2");
    switchCC2.addEventListener('change', function() {
        alert(switchCC2.checked);
    }, false);

    const switchCC3 = document.getElementById("tucursos-cc-3");
    switchCC3.addEventListener('change', function() {
        alert(switchCC3.checked);
    }, false);

    const switchCCR = document.getElementById("tucursos-cc-r");
    switchCCR.addEventListener('click', function() {
        alert("data reset");
        //chrome.storage.local.clear();
    }, false);

}, false)