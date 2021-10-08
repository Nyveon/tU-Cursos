chrome.storage.local.get("users", function (data) {
    const users = data["users"]

    if (users !== "undefined") {
        console.log(data);
    }
});