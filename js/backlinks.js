"use strict";

chrome.storage.local.get("settings", function (data) {
    const settings = data.settings ?? {};

    if (!settings["qol-backlinks"]) {
        return;
    }

    const posts = document.getElementsByClassName("msg");
    const children = Array.from(posts)
        .filter(children => children.classList.contains("hijo"))
        .forEach(item => {  const parent_id = item.parentNode.id;
                        const id = parent_id.split("_")[1];
                        const sticky = item.children[0].children[0];
                        const a = document.createElement("a");
                        const title = ">>" + id;
                        const txt = document.createTextNode(title);
                        a.appendChild(txt);
                        a.title = title;
                        const url_sep = window.location.href.split("#");
                        const url = url_sep[0];
                        a.href = url + "#" + parent_id;
                        sticky.appendChild(a);
    });
});