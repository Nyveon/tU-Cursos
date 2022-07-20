"use strict";

chrome.storage.local.get("settings", function (data) {
    const settings = data.settings ?? {};

    if (!settings["qol-backlinks"]) {
        return;
    }

    const sticky = document.getElementsByClassName("sticky");
    Array.from(sticky).forEach(item => {
        item.style.zIndex = 0;
    });
    const raiz = document.getElementsByClassName("raiz");
    Array.from(raiz)
        .forEach(item => item.previousElementSibling.style.zIndex = 1);
    const posts = document.getElementsByClassName("msg");
    Array.from(posts)
        .filter(children => children.classList.contains("hijo"))
        .forEach(item => {  const parent = item.parentNode;
                        const parent_id = parent.id;
                        const id = parent_id.split("_")[1];
                        const sticky = item.children[0].children[0];
                        const a = document.createElement("a");
                        const title = ">>" + id;
                        const txt = document.createTextNode(title);
                        a.appendChild(txt);
                        const url_sep = window.location.href.split("#");
                        const url = url_sep[0];
                        a.href = url + "#" + parent_id;
                        let parent_text = parent.getElementsByClassName("texto")[0];
                        let clone_parent_text = parent_text.cloneNode(true);
                        clone_parent_text.getElementsByClassName("opciones")[0].remove();
                        clone_parent_text.getElementsByClassName("avatar")[0].remove();
                        clone_parent_text.classList.add("cloned");
                        clone_parent_text.style = "margin: .2em 1em 1em 0; padding: .5em .5em 0 1em; background-color: #fafafb; border: 1px solid #d5d5d5; font-weight: 400; overflow: auto; position: absolute; display: none";
                        document.getElementById("body").appendChild(clone_parent_text);
                        a.onmousemove = function(event){
                            clone_parent_text.style.display = "block";
                            const x = event.clientX;
                            const y = event.clientY + window.scrollY;
                            clone_parent_text.style.left = x + 15 + "px";
                            clone_parent_text.style.top = y + 15 + "px";
                        };
                        a.onmouseleave = function(){
                            clone_parent_text.style.display = "none";
                        };
                        sticky.appendChild(a);
    });
    const cloned = document.getElementsByClassName("cloned");
    Array.from(cloned).forEach(item => {
        item.style.zIndex = 2;
    });
});