/**
 * This script runs when the "integrantes" page is viewed.
 * @type {NodeListOf<Element>}
 */

//todo: Check if this page has ben scraped before

const userLinks = document.querySelectorAll('a[href *= "usuario"]');
const localUsers = {}

//todo: Get my user Id

for (const user of userLinks) {
    const splitUser = user["href"].split("/")

    // All links where usuario is the before last part of the URL.
    //todo: There is probably a better way to do this
    if (splitUser.length === 6) {
        const userID = splitUser[4];
        const userType = user.parentElement.parentElement.querySelector('.cargo')["title"];
        const userName = user.textContent;
        //todo: Save to localUsers
    }
}

