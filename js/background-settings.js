// First time launch
chrome.runtime.onInstalled.addListener(function() {
    //alert("first load");

    /* Get settings
    chrome.storage.local.get("settings", function (data) {
        const settings = data["settings"] ?? {};
    });
    */

    // Set default settings
    const settings = {
        "my-user": -1,
        "cc-show-counter": true,            // Toggle for showing shared course counter
        "cc-save-participants": true,       // Toggle for saving course participants
        "cc-show-saved-icon": false,        //todo Shows which courses have been scraped
        "eh-hide-preview": false,           // Toggles hiding the Historial blog preview
        "eh-hide-sidebar": false,           //todo Hides the left-hand sidebar
        "eh-hide-piechart": false,          // Toggles hiding the homework piechart block
        "eh-notification-bubble": false,    //todo Hides Notification bubbles
        "eh-anon-course": false,            //todo Censors course names
        "eh-anon-people": false,            //todo Censors people's names
    }

    chrome.storage.local.set({"settings": settings}, function() {
        console.log("Default settings set successfully.");
    });
});