"use strict";

chrome.storage.local.get("settings", function (data) {
    const settings = data.settings ?? {};

    if (!settings["qol-backlinks"]) {
        return;
    }

    /*
    * Give sticky divs a 0 z-index so they don't cover the backlinks previews and divs with
    * class "raiz", the parent node of the actual thread, z-index of 1 so they don't overlap
    * with the thread name + info.
    */

    const stickyDivs = document.getElementsByClassName("sticky");
    Array.from(stickyDivs).forEach(item => {
        item.style.zIndex = 0;
    });
    const raizDivs = document.getElementsByClassName("raiz");
    Array.from(raizDivs)
        .forEach(item => item.previousElementSibling.style.zIndex = 1);

    /*
    * A dictionary is created for the parent nodes to check if they have already been cloned.
    * Get all divs with class "hijo" from the document.
    * For every div, information about their parent node is saved for later.
    * A reference to the div where the backlink is going to be appended is saved.
    * A link element is created with the info of the parent node. Before appending it, it
    * is checked if the parent id is not in the parent dictionary, if it's not then a clone
    * of the parent node is created and appended to the body so it can be used for the
    * preview. If it is in the parent dictionary then the value stored is copied. Onmousemove
    * and onmouseleave functions are added in both cases, they track the position of the
    * cursor and show a preview of the parent node whenever it hovers over the backlink and
    * hide it when it leaves the element. Then the link is appended.
    */

    const parents = {};
    const posts = document.getElementsByClassName("hijo");
    Array.from(posts)
        .forEach(item => {
            const parentNode = item.parentNode;
            const parentId = parentNode.id;
            const id = parentId.split("_")[1];
            const postHeader = item.children[0].children[0];
            const a = document.createElement("a");
            const title = ">>" + id;
            const txt = document.createTextNode(title);
            a.appendChild(txt);
            const urlSep = window.location.href.split("#");
            const url = urlSep[0];
            a.href = url + "#" + parentId;
            if(!(id in parents)){
                const parentText = parentNode.getElementsByClassName("texto")[0];
                const clonedParentText = parentText.cloneNode(true);
                clonedParentText.getElementsByClassName("opciones")[0].remove();
                clonedParentText.getElementsByClassName("avatar")[0].remove();
                clonedParentText.classList.add("cloned");
                clonedParentText.style = "margin: .2em 1em 1em 0; padding: .5em .5em 0 1em; background-color: #fafafb; border: 1px solid #d5d5d5; font-weight: 400; overflow: auto; position: absolute; display: none";
                document.getElementById("body").appendChild(clonedParentText);
                parents[id] = clonedParentText;
                a.onmousemove = function(event){
                    clonedParentText.style.display = "block";
                    const x = event.clientX;
                    const y = event.clientY + window.scrollY;
                    clonedParentText.style.left = x + 15 + "px";
                    clonedParentText.style.top = y + 15 + "px";
                };
                a.onmouseleave = function(){
                    clonedParentText.style.display = "none";
                };
            } else {
                const clonedParentText = parents[id];
                a.onmousemove = function(event){
                    clonedParentText.style.display = "block";
                    const x = event.clientX;
                    const y = event.clientY + window.scrollY;
                    clonedParentText.style.left = x + 15 + "px";
                    clonedParentText.style.top = y + 15 + "px";
                };
                a.onmouseleave = function(){
                    clonedParentText.style.display = "none";
                };
            }
            postHeader.appendChild(a);
    });

    /*
    * Get all the cloned divs and give them z-index 2 so they stay on top of everything else
    * when shown.
    */
    const clonedDivs = document.getElementsByClassName("cloned");
    Array.from(clonedDivs).forEach(item => {
        item.style.zIndex = 2;
    });
});