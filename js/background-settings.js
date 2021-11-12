// First time launch
chrome.runtime.onInstalled.addListener(function() {
    alert("first load");

    /* Get settings
    chrome.storage.local.get("settings", function (data) {
        const settings = data["settings"] ?? {};
    });
    */

    // Set default settings
    const settings = {
        "my-user": -1,
        "cc-show-counter": true,
        "cc-save-participants": true,
        "cc-show-saved-icon": false
    }
    chrome.storage.local.set({"settings": settings}, function() {
        console.log("Default settings set successfully.");
    });

});