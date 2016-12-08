'use strict';

var canvas;
var ctx;
var lineHeight = 55;
var topInput = document.querySelector('#topInput');
var bottomInput = document.querySelector('#bottomInput');
var gImg;



var topText = { content: '',
                color: '#ffffff',
                positionX: 30,
                positionY: 40,
                textShadow: 'no',
                textAlign: 'left',
                fontSize: 40,
            };

var bottomText = {  content: '',
                    color: '#ffffff',
                    positionX: 30,
                    positionY: 240,
                    textShadow: 'no',
                    textAlign: 'left',
                    fontSize: 40,
                    };


// function addText() {
//     var text = document.querySelector('#topInput').value;
//     // document.querySelector('#result').innerHTML = "" + text;
// };

function sendPicToEditor(_img) {
    gImg = _img.getAttribute('id');
    console.log(gImg);
    init();
    var editor = document.querySelector('.boxes');
    editor.classList.toggle('hide');
}


function increaseTopFont() {
    topText.fontSize += 2;
}

function decreaseTopFont() {
    topText.fontSize -= 2;
}

function increaseBottomFont() {
    bottomText.fontSize += 2;
    var counter = document.querySelector('.bottom-font-display');
}

function decreaseBottomFont() {
    bottomText.fontSize -= 2;
}

function changeColor() {
    topText.color = document.querySelector('.topColorChoose').value;
    bottomText.color = document.querySelector('.bottomColorChoose').value;
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

function writeTextToObject() {
    topText.content = document.getElementById('topInput').value;
    bottomText.content = document.getElementById('bottomInput').value;
    drawImageOnCanvas();
    // writeOnTopCanvas(gImg, ctx);    
}

function wrapAndPrintText(ctx, input, x, y, maxWidth, lineHeight) {
    var words = input.split(' ');
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


function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    drawImageOnCanvas();
}

function drawImageOnCanvas() {
    var picture = new Image();
    picture.src = gImg;
    // picture.onload = function() {
        ctx.fillRect(picture, 0, canvas.width, canvas.height);
        ctx.drawImage(picture, 0, 0, 568, 360);    
        writeOnTopCanvas(picture, ctx);  
        writeOnBottomCanvas(picture,ctx);          
    // }
}

function writeOnTopCanvas(gImg, ctx) {
            if (topInput.classList.contains('text-shadow')){
                ctx.shadowColor = 'black';
                ctx.shadowOffsetX = 4; 
                ctx.shadowOffsetY = 4; 
                ctx.shadowBlur = 2;
            }
            topText.content.toUpperCase();
            ctx.font = topText.fontSize + 'px Lato';
            ctx.fillStyle = topText.color;
            var maxWidth = canvas.width - (canvas.width * 0.3);                    
            wrapAndPrintText(ctx,topText.content,topText.positionX, topText.positionY,maxWidth,lineHeight);
}

function writeOnBottomCanvas(gImg, ctx) {
            if (bottomInput.classList.contains('text-shadow')){
                ctx.shadowColor = 'black';
                ctx.shadowOffsetX = 4; 
                ctx.shadowOffsetY = 4; 
                ctx.shadowBlur = 2;
            }
            bottomText.content.toUpperCase();
            ctx.font = bottomText.fontSize + 'px Lato';
            ctx.fillStyle = bottomText.color;
            var maxWidth = canvas.width - (canvas.width * 0.3);                    
            wrapAndPrintText(ctx,bottomText.content,bottomText.positionX, bottomText.positionY,maxWidth,lineHeight);
}



/**
 * This is the function that will take care of image extracting and
 * setting proper filename for the download.
 * IMPORTANT: Call it from within a onclick event.
 */
function downloadImg(elLink) {
    elLink.href = canvas.toDataURL();
    elLink.download = 'perfectMeme.jpg';
}


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