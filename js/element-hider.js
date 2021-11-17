/**
 * This script remove various elements from the page when the right page is matched.
 */


/**
 * Hides specific element given a selector
 * @param n Element being searched
 * @param selector Element target
 */
function hideElement(n, selector) {
	if (n.firstElementChild && n.querySelector(selector)) {
		for (const el of n.querySelectorAll(selector)) {
			el.style.cssText += "display:none;";
		}
	}
}


chrome.storage.local.get("settings", function (data) {
	const settings = data["settings"] ?? {};

	const ehHidePiechart = window.location.toString().match(".*:\\/\\/.*u-cursos.cl\\/.*\\/tareas_usuario\\/.*") && settings["eh-hide-piechart"];
	const ehHidePiechartSelector = '.detalle';

	const ehHidePreview = window.location.toString().match(".*:\/\/.*u-cursos.cl\/.*\/historial\/.*") && settings["eh-hide-preview"];
	const ehHidePreviewSelector = '.sidebar';

	const mo = new MutationObserver(onMutation);
	onMutation([{addedNodes: [document.documentElement]}]);
	observe();

	function onMutation(mutations) {
		for (const {addedNodes} of mutations) {
			for (const n of addedNodes) {
				if (n.tagName) {

					// Hide homework pie-chart
					if (ehHidePiechart) {
						hideElement(n, ehHidePiechartSelector);
					}

					// Hide blog preview sidebar
					if (ehHidePreview) {
						hideElement(n, ehHidePreviewSelector);
					}
				}
			}
		}
	}

	function observe() {
		mo.observe(document, {
				subtree: true,
				childList: true
			}
		);
	}
});

