document.addEventListener('DOMContentLoaded', function () {

    // Initializing tabs
    const settingsTabs = M.Tabs.init(document.getElementById("tucursos-tabs"));

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
    // Getting storage used and adding it above the delete data button
    chrome.storage.local.getBytesInUse(null, function(data) {
        const dataStored = document.createElement("span");
        dataStored.textContent = (Math.round(100 * (data/1024)/1024)/100).toString() + "MB usados.";
        dataStored.classList.add("right-align");
        switchCCR.parentElement.appendChild(document.createElement("br"));
        switchCCR.parentElement.appendChild(dataStored);
    });

    switchCCR.addEventListener('click', function() {
        alert("data reset");
        //chrome.storage.local.clear();
    }, false);




}, false)