'use strict';

// this  is a render
// render to index.html

var gImages = [{
    id: 1,
    url: 'url',
    keywords: {
        animal: 1,
        happy: 1
    }
}, {
    id: 2,
    url: 'url',
    keywords: {
        animal: 1,
        happy: 1
    }
}, {
    id: 3,
    url: 'url',
    keywords: {
        animal: 1,
        happy: 1,
        sad:1
    }
}]


//first there will be a table inside the gallery

// render will gover and arr of images
function renderImageRow(_imageRow) {
    // render will just render a row.
    var tbody = document.querySelector('.images-container');
    var strHTML = '<div class="images-row">';
    for (var i = 0; i < _imageRow.length; i++) {
        // * add id 
        // debugger;
        var id = _imageRow[i][id];
        // * change div to img
        strHTML += '<div id="' + id + '" class="red-box"></div>'
            // * might have to make a function to make hexagon and than
            //   return the result here to append.
    }
    strHTML += '</div>';
    tbody.innerHTML = strHTML;
}
renderImageRow(gImages);

//-------------------------
// * make a function to render hexagon
// * should the function also add image?
// * i think so => and render will just take them all togther


//--------------------------
//* function to search, filter.
// recives an arr of keywords
// will return an arr of the filtered images


function filterImages(_keyWordsToSearch) {
    debugger
    var matchedImages = [];
    var curImage;
    //first loop
    for (var i = 0; i < gImages.length; i++) {
        curImage = gImages[i];
        
        // second loop
        for (var j = 0; j < _keyWordsToSearch.length; j++) {
            if (!gImages[i].keywords[_keyWordsToSearch[j]]) {
                curImage = null;
                break;
            }
            // if we have image with all the tags than put in matchedImages
        }
        if (curImage) {
            matchedImages.push(curImage);
        }
        console.log('out the second loop')
    }
    return matchedImages;
    // will go to another function that will break the matchedImages
    // to appropriate sizes. 5 images => 1 , 2, 1
    // 4 => 1 , 2, 1
    // 3 => 3
    // 2 => 2
}

function sliceMatchedImages(){

}

filterImages(['happy','sad']);