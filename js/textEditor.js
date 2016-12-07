'use strict';

var topColor;
var topFont = 50;
var topInput = document.querySelector('#topInput');

function addText() {
    var text = document.querySelector('#topInput').value;
    // document.querySelector('#result').innerHTML = "" + text;
};


function increaseTopFont() {
    topFont += 2;
}

function decreaseTopFont() {
    topFont -= 2;
}

function changeColor() {
    topColor = document.querySelector('.topColorChoose').value;
    topInput.style.color = topColor;
    drawOnCanvas(topColor);
}

function justifyLeft() {
    topInput.classList.add('justify-left');
}

function justifyRight() {
    topInput.classList.add('justify-right');
}

function justifyCenter() {
    topInput.classList.add('justify-center');
}

function toggleTextShadow() {
    topInput.classList.toggle('text-shadow');
}

function clearText() {
    topInput.innerHTML = '';
}

function wrapText(ctx, topText, x, y, maxWidth, lineHeight) {
        var words = topText.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
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

function drawOnCanvas(color) {
    var img = new Image();
    img.src = "assets/img/meme.png";
    img.onload = function() {
        ctx.fillRect(img, 0, canvas.width, canvas.height);
        document.getElementById('topInput').addEventListener('keyup', function() {
            ctx.drawImage(img, 0, 0, 568, 360);
            ctx.save();
            // ctx.clearRect(0, 0, canvas.width, canvas.height);
            // var result = document.querySelector('#result').value;
            if (topInput.classList.contains('text-shadow')){
                ctx.shadowColor = 'grey';
                ctx.shadowOffsetX = 2; 
                ctx.shadowOffsetY = 2; 
                ctx.shadowBlur = 3;
            }
            var topText = document.getElementById('topInput').value;
            topText.toUpperCase();
            ctx.font = topFont + 'px Lato';
            ctx.fillStyle = color;
            var maxWidth = canvas.width;
            var lineHeight = 55;
            var x = (canvas.width - maxWidth) / 2;
            var y = 60;
            // ctx.fillText(topText, 15, canvas.height / 5);
            wrapText(ctx,topText,x,y,maxWidth,lineHeight);
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