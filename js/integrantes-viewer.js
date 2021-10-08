chrome.storage.local.get("users", function (data) {
    if (data !== "undefined") {
        console.log(data);
    }
});