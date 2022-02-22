/*
* Query all a hrefs that belong to students grades and then add
* attributes target and onclick so it opens a popup instead of
* changing the page when clicking on the link.
*/

var elem = document.querySelectorAll('a[href*="historial?id_evaluacion="]');

for (i = 0; i < elem.length; i++){
    var link = elem[i].attributes[0].nodeValue;
    elem[i].setAttribute("target", "popup")
    elem[i].setAttribute("onclick", "window.open('" + link + "','popup','width=600,height=600'); return false;")
}