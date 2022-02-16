
var char_limit = 400;
var text = document.getElementsByClassName('texto');

for(i=0; i<text.length; i++){
    var opciones = text[i].lastElementChild;
    var removed = text[i].removeChild(opciones);

    if(text[i].innerHTML.length >= char_limit){
       text[i].innerHTML = '<div><span class="short-text">' + text[i].innerHTML.substring(0, char_limit) + '</span><span class="long-text" style="display: none">' + text[i].innerHTML.substring(char_limit) + '</span><br><button class="show-more-button" data-more="0">Ver más</span></div>';
    }
    var added = text[i].append(opciones)
};


document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, "");
    createRegion();
    createComuna("default");
    setDate(1);
});

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
