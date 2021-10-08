/**
 * This script runs when the "integrantes" page is viewed.
 */

const currentURL = window.location.toString();
const splitURL = currentURL.split("/");
const thisCourse = splitURL[6];
const thisSection = splitURL[7];
const thisYear = splitURL[4];
const courseID = thisYear + "-" + thisCourse + "-" + thisSection;
const myID = document.querySelector('a[href *= "usuario"]')["href"].split("/")[4];


chrome.storage.local.get("users", function (data) {
    const users = data["users"] ?? {};

    // Go through the page, acquire users listed.
    const userLinks = document.querySelectorAll('a[href *= "usuario"]');
    const localUsers = {};
    for (const user of userLinks) {
        const splitUser = user["href"].split("/");

        // All links where usuario is the before-last part of the URL.
        //todo: There is probably a better way to do this
        if (splitUser.length === 6) {
            const userID = splitUser[4];
            const userType = user.parentElement.parentElement.querySelector('.cargo')["title"];
            const userName = user.textContent;
            localUsers[userID] = {"name": userName, "type": userType};
        }
    }

    // Get my user type for relationship type
    const myType = localUsers[myID]["type"] ?? "None";

    /**
     * Add local user values to global user values
     * Data structure:
     * > User ID
     * - - "name":  User Name
     * > > "course":    Course ID
     * - - - "code":    Course Code
     * - - - "section": Course Section
     * - - - "year":    Course Year
     * - - - "theirType":    User type
     * - - - "myType":  My User type
     */
    for (const [key, value] of Object.entries(localUsers)) {
        users[key] = users[key] ?? {};

        users[key]["name"] = value["name"];
        users[key][courseID] = {
            "code": thisCourse,
            "section": thisSection,
            "year": thisYear,
            "theirType": value["type"],
            "myType": myType
        };
    }

    // Save updated values to local storage
    chrome.storage.local.set({"users": users}, function() {
        console.log(users);
        //todo: log that this page was scraped

        chrome.storage.local.get("scraped", function(data) {
            const scraped = data["scraped"] ?? {};
            scraped[currentURL] = true;
            chrome.storage.local.set({"scraped": scraped});
            console.log(scraped);
        });
    });
});