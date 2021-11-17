/**
 * This script makes an element resizable from the page when the right page is matched.
 */
document.addEventListener("DOMContentLoaded", function(event) {
	chrome.storage.local.get("settings", function (data) {
		const settings = data["settings"] ?? {};

		// Resize pdf viewer
		if (true) {
			if (window.location.toString().match(".*:\/\/.*u-cursos.cl\/.*\/material_docente\/.+")) {
                let obj = document.querySelector("object");
                obj.style="width:100%;height:100%;";
                obj.parentElement.style="resize:vertical;overflow:hidden;"
			}
		}
	});
});