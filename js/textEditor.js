'use strict';

var lineHeight = 55;

var topText = { color: '#ffffff',
                positionX: 130,
                positionY: 40,
                textShadow: 'no',
                textAlign: 'left',
                fontSize: 40,
            };

var bottomText = {  color: '#ff0000',
                    positionX: 0,
                    positionY: 0,
                    textShadow: 'no',
                    textAlign: 'left',
                    fontSize: 40,
                    };

var topInput = document.querySelector('#topInput');

function addText() {
    var text = document.querySelector('#topInput').value;
    // document.querySelector('#result').innerHTML = "" + text;
};


function increaseTopFont() {
    topText.fontSize += 2;
}

function decreaseTopFont() {
    topText.fontSize -= 2;
}

function changeColor() {
    topText.color = document.querySelector('.topColorChoose').value;
    bottomText.color = document.querySelector('.bottomColorChoose').value;
    topInput.style.color = topText.color;
    // drawOnCanvas(topColor);
}

// function justifyLeft() {
//     topInput.classList.add('justify-left');
// }

// function justifyRight() {
//     topInput.classList.add('justify-right');
// }

// function justifyCenter() {
//     topInput.classList.add('justify-center');
// }

function toggleTextShadow() {
    topInput.classList.toggle('text-shadow');
}

function clearTopText() {
    topInput.innerHTML = '';
}

function clearBottomText() {
    topInput.innerHTML = '';
}

function wrapAndPrintText(ctx, topText, x, y, maxWidth, lineHeight) {
    var words = topText.split(' ');
    var line = '';

    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line.toUpperCase(), x, y);
            line = words[n] + ' ';
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    ctx.fillText(line.toUpperCase(), x, y);
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
    img.onload = function() {
        ctx.fillRect(img, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, 568, 360);                
        document.getElementById('topInput').addEventListener('input', function() {
        ctx.drawImage(img, 0, 0, 568, 360);        
        ctx.save();
            if (topInput.classList.contains('text-shadow')){
                ctx.shadowColor = 'grey';
                ctx.shadowOffsetX = 2; 
                ctx.shadowOffsetY = 2; 
                ctx.shadowBlur = 3;
            }
            var topInputEl = document.getElementById('topInput').value;
            topInputEl.toUpperCase();
            ctx.font = topText.fontSize + 'px Lato';
            ctx.fillStyle = topText.color;
            // ctx.textAlign = 'end';
            var maxWidth = canvas.width - (canvas.width * 0.3);
            // var x = (canvas.width - maxWidth) / 2;
            // var y = 60;
            // ctx.fillText(topText, 15, canvas.height / 5);
            wrapAndPrintText(ctx,topInputEl,topText.positionX, topText.positionY,maxWidth,lineHeight);
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


// $(document).ready(function () {
//     $('.increaseButton').click(function () {
//         $('#topInput').css("font-size", function () {
//             return parseInt($(this).css('font-size')) + 1 + 'px';
//         });
//     });
// });

// $(document).ready(function () {
//     $('.decreaseButton').click(function () {
//         $('#topInput').css("font-size", function () {
//             return parseInt($(this).css('font-size')) - 1 + 'px';
//         });
//     });
// });