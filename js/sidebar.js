function load() {   
    // Get u-cursos page html.
    fetch("http://www.u-cursos.cl", {method: "GET", headers : {"Content-Type":"text/html"}})
    // Use it as text
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error, status = " + response.status);
        }
        return response.arrayBuffer();
    })
    .then(buffer => {
        const decoder = new TextDecoder("ISO-8859-1");
        return decoder.decode(buffer);
    })
    // Parse as html, filter it and load it to current document
    .then(htmlText => {
        // Parse as html
        var parser = new DOMParser();
        var doc = parser.parseFromString(htmlText, "text/html");
        // Remove some elements by ID
        doc.getElementById("widget_buscador").remove();
        doc.getElementById("navigation").remove();
        doc.getElementById("toggler").remove();
        doc.getElementById("footer").remove();
        doc.getElementById("titulo").remove();
        doc.getElementById("favoritos").getElementsByTagName("a")[0].remove();
        // Remove some elements by ClassName
        doc.getElementsByClassName("modulos")[0].remove();
        doc.getElementsByClassName("curso")[0].remove();
        // Remove script elements
        let scripts = doc.getElementsByTagName("script");
        for (let script of scripts) {
            script.remove();
        }
        // Show and resize menu
        let menu = doc.getElementById("menu");
        menu.className="active";
        menu.style="width:100%";
        // Edit links to be opened in a new page
        let menuoptions = doc.getElementsByTagName("a");
        for (let option of menuoptions) {
            option.target="_blank";
        }
        // Get link elements on doc's head and append them to document's head
        let docLinks = doc.head.getElementsByTagName("link");
        for (let docLink of docLinks) {
            document.head.appendChild(docLink);
        }
        // Set document body
        document.body = doc.body;
    })

    window.removeEventListener("load", load, false);
}
window.addEventListener("load", load, false);
