
var paragraph_limit = 5;
var text = document.getElementsByClassName('texto');

function getCharLen(str){
    str = str.replace(/<[^>]*>/g, "");
    return str.length;
}

function countLines(elem){
    var paragraphs = elem.innerHTML.split("<br>").filter(String);
    var len = paragraphs.length;
    if(len == 0){
        return 1;
    }
    else{
        return len;
    }
}

for(var i = 0; i < text.length; i++){
    var opciones = text[i].lastElementChild;
    var removed = text[i].removeChild(opciones);
    var text_length = countLines(text[i])
    if(text_length >= paragraph_limit){
        var paragraphs = text[i].innerHTML.split("<br>").filter(String);
        short_text = paragraphs[0];
        for(var j = 1; j <= paragraph_limit; j++){
            short_text = short_text + "<br>" + paragraphs[j];
        }
        long_text = text[i].innerHTML
        text[i].innerHTML = '<div><span class="short-text">' + short_text + '</span><span class="long-text" style="display: none">' + long_text + '</span><br><button class="show-more-button" data-more="0">Ver más</span></div>';
    }

    var added = text[i].append(opciones)
};

var buttons = document.querySelectorAll('.show-more-button')

for(i=0; i<buttons.length;i++){
    buttons[i].addEventListener('click', function() {
        // If text is shown less, then show complete
        if(this.getAttribute('data-more') == 0) {
            this.setAttribute('data-more', 1);
            this.style.display = 'block';
            this.innerHTML = 'Ver menos';

            this.previousElementSibling.previousElementSibling.previousElementSibling.style.display = 'none';
            this.previousElementSibling.previousElementSibling.style.display = 'inline';
        }
        // If text is shown complete, then show less
        else if(this.getAttribute('data-more') == 1) {
            this.setAttribute('data-more', 0);
            this.style.display = 'inline';
            this.innerHTML = 'Ver más';

            this.previousElementSibling.previousElementSibling.previousElementSibling.style.display = 'inline';
            this.previousElementSibling.previousElementSibling.style.display = 'none';
        }
    });
}
