document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button').addEventListener('click', onclick, false)
    function onclick () {
        chrome.storage.local.clear();
    }
}, false)