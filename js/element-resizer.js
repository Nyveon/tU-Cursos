/**
 * This script makes an element resizable from the page when the right page is matched.
 */
document.addEventListener("DOMContentLoaded", function(event) {

    // Resize pdf viewer
    if (window.location.toString().match(".*:\/\/.*u-cursos.cl\/.*\/material_docente\/.+")) {
        let obj = document.querySelector("object");
        obj.style="width:100%;height:100%;border-bottom: 0.8em solid #323639";
        obj.parentElement.style="resize:vertical;overflow:hidden;"
    }
});