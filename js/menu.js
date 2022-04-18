"use strict";

/**
 * Updates a setting to a new value
 * @param {String} key
 * @param {*} value
 */
function changeSetting(key, value) {
    chrome.storage.local.get("settings").then(data => {
        const settings = data.settings ?? {};
        settings[key] = value;
        chrome.storage.local.set({settings: settings}).then(() => {
            console.log("Setting " + key + " updated to " + value);
        });
    });
}

/**
 * Creates a switch and sets its value to the current setting
 * @param {Object} settings - The object containing the settings
 * @param {String} key - The key of the setting
 */
function initializeSwitch(settings, key) {
    console.log(settings);
    const this_switch = document.getElementById(key);
    this_switch.checked = settings[key];
    this_switch.addEventListener('change', function() {
        changeSetting(key, this_switch.checked);
    }, false);
}

/**
 * Resets the local storage
 * @param {HTMLElement} reset_data_button
 */
function initializeDataReset(reset_data_button) {
    reset_data_button.addEventListener('click', function() {
        console.log("Datos eliminados.");
        chrome.storage.local.clear();
    }, false);
}

/**
 * Calculates the storage in use and updates the UI
 * @param {integer} bytes
 * @param {HTMLElement} reset_data_button
 */
function insertStorageUsed(bytes, reset_data_button) {
    const dataStored = document.createElement("span");
    dataStored.textContent = (Math.round(100 * (bytes/1024)/1024)/100).toString() + "MB usados.";
    dataStored.classList.add("right-align");
    reset_data_button.parentElement.appendChild(document.createElement("br"));
    reset_data_button.parentElement.appendChild(dataStored);
}

/**
 * Initializes the settings page
 */
function initializeMenu() {
    chrome.storage.local.get("settings").then(data => {
        const settings = data.settings ?? {};

        // Course Counter (cc-)
        initializeSwitch(settings, "cc-show-counter");
        initializeSwitch(settings, "cc-save-participants");
        //initializeSwitch(settings, "cc-show-saved-icon");

        // Element Hider (eh-)
        initializeSwitch(settings, "eh-hide-piechart");
        initializeSwitch(settings, "eh-shorten-message");
        initializeSwitch(settings, "eh-hide-preview");

        // Quality of life (qol-)
        initializeSwitch(settings, "qol-grade-comments");
        initializeSwitch(settings, "qol-element-resizer");
        initializeSwitch(settings, "qol-week-counter");

        // Delete data button
        const reset_data_button = document.getElementById("tucursos-cc-r");
        chrome.storage.local.getBytesInUse(null)
            .then(bytes => {insertStorageUsed(bytes, reset_data_button);})
            .then({});
        initializeDataReset(reset_data_button);
    });
}

// Initialize the menu upon loading
document.addEventListener('DOMContentLoaded', initializeMenu);