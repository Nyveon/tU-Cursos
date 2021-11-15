/**
 * This script remove various elements from the page when the right page is matched.
 */
document.addEventListener("DOMContentLoaded", function(event) {
	chrome.storage.local.get("settings", function (data) {
		const settings = data["settings"] ?? {};

		// Remove sidebar
		if (settings["eh-hide-preview"]) {
			if (window.location.toString().match(".*:\/\/.*u-cursos.cl\/.*\/historial\/.*")) {
				document.querySelector(".sidebar").remove();
			}
		}

		// Remove homework pie chart
		if (settings["eh-hide-piechart"]) {
			if (window.location.toString().match(".*:\/\/.*u-cursos.cl\/.*\/tareas_usuario\/.*")) {
				document.querySelector('#body').children[1].remove();
			}
		}
	});
});
