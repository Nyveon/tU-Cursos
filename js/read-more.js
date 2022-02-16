
var paragraph_limit = 5;
var text = document.getElementsByClassName('texto');

/**
* Function that counts the ammount of paragraphs in a HTML element
*/
function countLines(elem) {
    var paragraphs = elem.innerHTML.split("<br>").filter(String);
    var len = paragraphs.length;
    if (len == 0) {
        return 1;
    }
    else {
        return len;
    }
}

/**
* Iterate over the divs with class "texto", first we remove the last children for formatting purposes
* then we count the ammount of paragraphs, check if it's greater than the addmited threshold. If it's
* over the threshhold we generate a cut version of the text and the original text, then we change the
* innerHTML, displaying the short version and adding a button to toggle between the short text and the
* complete text. Finally we readd the children we had removed.
*/
for (var i = 0; i < text.length; i++) {
    var options = text[i].lastElementChild;
    var removed = text[i].removeChild(options);
    var text_length = countLines(text[i]);
    if (text_length > paragraph_limit) {
        var paragraphs = text[i].innerHTML.split("<br>");
        short_text = paragraphs[0];
        for (var j = 1; j <= paragraph_limit; j++) {
            if (paragraphs[j] == "") {
                short_text = short_text + "<br>";
            }
            else {
                short_text = short_text + "<br>" + paragraphs[j];
            }
        }
        long_text = text[i].innerHTML
        text[i].innerHTML = '<div><span class="short-text">' + short_text + '</span><span class="long-text" style="display: none">' + long_text + '</span><br><button class="show-more-button" data-more="0">Ver más</span></div>';
    }

    var added = text[i].append(options);
};


/**
 * We query all added buttons and add eventListeners for their click functionality, when a button
 * is clicked and the short text is being displayed it shows the entire text and changes to a button
 * that does the opposite.
 */
var buttons = document.querySelectorAll('.show-more-button');

for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        // If text is shown less, then show complete
        if (this.getAttribute('data-more') == 0) {
            this.setAttribute('data-more', 1);
            this.style.display = 'block';
            this.innerHTML = 'Leer menos';

            this.previousElementSibling.previousElementSibling.previousElementSibling.style.display = 'none';
            this.previousElementSibling.previousElementSibling.style.display = 'inline';
        }
        // If text is shown complete, then show less
        else if (this.getAttribute('data-more') == 1) {
            this.setAttribute('data-more', 0);
            this.style.display = 'inline';
            this.innerHTML = 'Leer más';

            this.previousElementSibling.previousElementSibling.previousElementSibling.style.display = 'inline';
            this.previousElementSibling.previousElementSibling.style.display = 'none';
        }
    });
};
