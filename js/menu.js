/**
 * Updates a setting to a new value
 */
function change_setting(key, value) {
    chrome.storage.local.get("settings", function (data) {
        const settings = data["settings"] ?? {};
        settings[key] = value
        chrome.storage.local.set({"settings": settings}, function () {
            console.log("Setting updated.")
        });
    });
}


/**
 * Creates a switch and sets its value to the current setting
 */
function initialize_switch(settings, key) {
    const this_switch = document.getElementById(key);
    this_switch.checked = settings[key];
    this_switch.addEventListener('change', function() {
        change_setting(key, this_switch.checked)
    }, false);
}


document.addEventListener('DOMContentLoaded', function () {

    var instance = M.Tabs.init(document.getElementById("tucursos-tabs"), {});

    chrome.storage.local.get("settings", function (data) {
        const settings = data["settings"] ?? {};

        // Page 1 Switches
        initialize_switch(settings, "cc-show-counter");
        initialize_switch(settings, "cc-save-participants");
        initialize_switch(settings, "cc-show-saved-icon");

        initialize_switch(settings, "eh-hide-piechart");
        initialize_switch(settings, "eh-shorten-message");
        initialize_switch(settings, "eh-hide-preview");

        initialize_switch(settings, "qol-grade-comments");
        initialize_switch(settings, "qol-element-resizer");

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
            chrome.storage.local.clear();
        }, false);
    });
}, false)