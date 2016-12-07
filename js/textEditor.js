'use strict';

var color;

function addText() {
    var text = document.querySelector('#topInput').value;
    document.querySelector('#result').innerHTML = "" + text;
};

function changeColor() {
    color = document.querySelector('.colorChoose').value;
    return color;
    // var text = document.querySelector('#result').style.color = color;
}

$(document).ready(function () {
    $('.increaseButton').click(function () {
        $('#result').css("font-size", function () {
            return parseInt($(this).css('font-size')) + 1 + 'px';
        });
    });
});

$(document).ready(function () {
    $('.decreaseButton').click(function () {
        $('#result').css("font-size", function () {
            return parseInt($(this).css('font-size')) - 1 + 'px';
        });
    });
});

function justifyLeft() {
    var result = document.querySelector('#result');
    result.classList.add('justify-left');
}

function justifyRight() {
    var result = document.querySelector('#result');
    result.classList.add('justify-right');
}

function justifyCenter() {
    var result = document.querySelector('#result');
    result.classList.add('justify-center');
}

function toggleTextShadow() {
    var result = document.querySelector('#result');    
    result.classList.toggle('text-shadow');
}

function clearText() {
    var result = document.querySelector('#result');
    result.innerHTML = '';
}

    
var canvas;
var ctx;

window.onload = function init() {
            canvas = document.getElementById('canvas');
            ctx = canvas.getContext('2d');
            drawOnCanvas();
        }

function drawOnCanvas() {
    var img = new Image();
    img.src = "assets/img/meme.png";
    img.onload = function () {
    ctx.fillRect(img, 0, canvas.width, canvas.height);
    document.getElementById('topInput').addEventListener('keyup', function () {
        ctx.drawImage(img, 0, 0, 568, 360);
        ctx.save();
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        var topText = document.getElementById('topInput').value;
        ctx.font = '60px sans-serif';
        ctx.fillStyle = color;
        var text_title = topText;
        ctx.fillText(topText, 15, canvas.height / 2 + 35);
        ctx.restore();        
    });
}
}

/**
 * This is the function that will take care of image extracting and
 * setting proper filename for the download.
 * IMPORTANT: Call it from within a onclick event.
 */
// function downloadImg(elLink) {
//     elLink.href = canvas.toDataURL();
//     elLink.download = 'perfectMeme.jpg';
// }