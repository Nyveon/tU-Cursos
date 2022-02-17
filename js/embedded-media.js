var a_nodes = document.querySelectorAll('div.texto > a');
for (var i = 0; i < a_nodes.length; i++) {
    var node = a_nodes[i];
    var link = node.outerHTML.split("<a href=")[1].split("\"")[1];
    if (/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/.test(link)) {
        var id = link.split("/")[3].split("?")[1].split("=")[1];
        var iframe = document.createElement('iframe');
        iframe.src = 'http://www.youtube.com/embed/' + id;
        iframe.width = '640';
        iframe.height = '390';
        iframe.style.display = "none";
        node.insertAdjacentElement("afterend",iframe)
        var video = node.nextSibling
        video.insertAdjacentHTML("afterend", "<br> <button class='video-button' data-more='0'>Ver video</button>")
    }
    else if (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(link)) {
        var image = "<img src='" + link + "' style='display: none''>"
        node.insertAdjacentHTML("afterend",image)
        image = node.nextSibling
        image.insertAdjacentHTML("afterend", "<br> <button class='image-button' data-more='0'>Ver imagen</button>")
    }
}

var buttons = document.querySelectorAll('.video-button');

for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        if (this.getAttribute('data-more') == 0) {
            this.setAttribute('data-more', 1);
            this.style.display = 'block';
            this.innerHTML = 'Cerrar video';

            this.previousElementSibling.previousElementSibling.style.display = 'inline';
        }
        else if (this.getAttribute('data-more') == 1) {
            this.setAttribute('data-more', 0);
            this.style.display = 'inline';
            this.innerHTML = 'Ver video';

            this.previousElementSibling.previousElementSibling.style.display = 'none';
        }
    });
};

var buttons = document.querySelectorAll('.image-button');

for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        if (this.getAttribute('data-more') == 0) {
            this.setAttribute('data-more', 1);
            this.style.display = 'block';
            this.innerHTML = 'Cerrar imagen';

            this.previousElementSibling.previousElementSibling.style.display = 'inline';
        }
        else if (this.getAttribute('data-more') == 1) {
            this.setAttribute('data-more', 0);
            this.style.display = 'inline';
            this.innerHTML = 'Ver imagen';

            this.previousElementSibling.previousElementSibling.style.display = 'none';
        }
    });
};