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


function censorElementText(n, selector, prefix) {
	if (n.firstElementChild && n.querySelector(selector)) {
		for (const el of n.querySelectorAll(selector)) {
			el.innerHTML = prefix + stringRandom(el.innerHTML);
		}
	}
}

function censorElementImage(n, selector) {
	if (n.firstElementChild && n.querySelector(selector)) {
		for (const el of n.querySelectorAll(selector)) {
			el.src = "https://static.u-cursos.cl/images/servicios/datos_usuario.png";
		}
	}
}


/**
 * Makes a random integer from a string.
 * @param str String of any length (seed)
 * @returns {number} Between 1 and 100000
 */
function stringRandom(str) {
	if (!str) {
		return 0
	}

	str = str.replace(/\s+/g, '');

	let seed = 1;
	for (let i = 0; i < str.length; i++) {
		seed += str.charCodeAt(i);
	}
	let x = Math.sin(seed) * 100000;
	return Math.abs(Math.round(x));
}



chrome.storage.local.get("settings", function (data) {
	const settings = data["settings"] ?? {};

	const ehHidePiechart = window.location.toString().match(".*:\\/\\/.*u-cursos.cl\\/.*\\/tareas_usuario\\/.*") && settings["eh-hide-piechart"];
	const ehHidePiechartSelector = '.detalle';

	const ehHidePreview = window.location.toString().match(".*:\/\/.*u-cursos.cl\/.*\/historial\/.*") && settings["eh-hide-preview"];
	const ehHidePreviewSelector = '.sidebar';

	const ehAnonPeople = settings['eh-anon-people'];
	const ehAnonPeopleSelector = '.usuario';

	const ehAnonIntegrantes = ehAnonPeople && window.location.toString().match(".*:\/\/.*u-cursos.cl\/.*\/integrantes\/.*");
	const ehAnonIntegrantesSelector = ['.string>h1~h2', '.string>h1>a'];

	const ehAnonPP = settings['eh-anon-pp'];
	const ehAnonPPSelector = '.avatar';

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

					// Anonymize usernames
					if (ehAnonPeople) {
						//ehAnonPeopleSelector.forEach(function(selector) {
							censorElementText(n, ehAnonPeopleSelector, "User-");
						//});
					}
					if (ehAnonIntegrantes) {
						ehAnonIntegrantesSelector.forEach(function(selector) {
							censorElementText(n, selector, "User-");
						});
					}

					// Anonymize profile pictures
					if (ehAnonPP) {
						censorElementImage(n, ehAnonPPSelector);
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

