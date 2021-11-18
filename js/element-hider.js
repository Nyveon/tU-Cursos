/**
 * This script remove various elements from the page when the right page is matched.
 */

/**
 * Hides specific element given a selector.
 * @param n Parent element.
 * @param selector Element target.
 */
function hideElement(n, selector) {
	if (n.firstElementChild && n.querySelector(selector)) {
		for (const el of n.querySelectorAll(selector)) {
			el.style.cssText += "display:none;";
		}
	}
}

/**
 * Censors a given element's inner text content with a deterministically generated integer.
 * @param n Parent element.
 * @param selector Element target.
 * @param prefix String prefixed to output.
 */
function censorElementText(n, selector, prefix) {
	if (n.firstElementChild && n.querySelector(selector)) {
		for (const el of n.querySelectorAll(selector)) {
			el.textContent = prefix + stringRandom(el.textContent.split("  ").at(-1));
			//todo: This removes ALL inner HTML for some reason
			//Result: deletes miniature profile pictures next to names that are in the same element
		}
	}
}

/**
 * Censors a given profile picture element with a generic image.
 * Modulates the color of the image deterministically based on the alt-text.
 * @param n Parent element.
 * @param selector Element target.
 */
function censorElementImage(n, selector) {
	if (n.firstElementChild && n.querySelector(selector)) {
		for (const el of n.querySelectorAll(selector)) {
			el.style.cssText += 'filter: hue-rotate(' + stringRandom(el.alt) + 'deg);';
			el.src = "https://static.u-cursos.cl/images/servicios/datos_usuario.png";
		}
	}
}

/**
 * Makes a random integer from a string.
 * Not actually very secure, but good enough for what's needed here.
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
	const x = Math.sin(seed) * 100000;
	return Math.abs(Math.round(x));
}


/**
 * Mutation observer so that changes are applied as the page generates and not after.
 */
chrome.storage.local.get("settings", function (data) {
	const settings = data["settings"] ?? {};

	const ehHidePiechart = window.location.toString().match(".*:\\/\\/.*u-cursos.cl\\/.*\\/tareas_usuario\\/.*")
		&& settings["eh-hide-piechart"];
	const ehHidePiechartSelector = '.detalle';

	const ehHidePreview = window.location.toString().match(".*:\/\/.*u-cursos.cl\/.*\/historial\/.*")
		&& settings["eh-hide-preview"];
	const ehHidePreviewSelector = '.sidebar';

	const ehAnonPeople = settings['eh-anon-people'];
	const ehAnonPeopleSelector = ['.usuario', '.perfil>h1'];
	if (window.location.toString().match(".*:\/\/.*u-cursos.cl\/.*\/integrantes\/.*")) {
		ehAnonPeopleSelector.push('.string>h1~h2');
		ehAnonPeopleSelector.push('.string>h1>a');
	}
	if (window.location.toString().match(".*:\/\/.*u-cursos.cl\/.*\/mi_historial\/.*")) {
		ehAnonPeopleSelector.push('.cont>h1>span');
		ehAnonPeopleSelector.push('.c_0>li>h2');
	}
	if (window.location.toString().match(".*:\/\/.*u-cursos.cl\/.*\/historial\/.*")) {
		ehAnonPeopleSelector.push('.c_0>li>h2');
	}
	//todo: Estadisticas
	//todo: Clases Virtuales
	//todo: Leyendo correos
	//todo: Notas
	//todo: Preview blog historial




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
						ehAnonPeopleSelector.forEach(function(selector) {
							censorElementText(n, ehAnonPeopleSelector, "User-");
						});
					}

					// Anonymize profile pictures
					if (ehAnonPP) {
						censorElementImage(n, ehAnonPPSelector);
					}

					//todo: censor own profile name
					//todo: censor name in historial
					//todo: censor name in notas
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

