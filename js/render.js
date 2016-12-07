'use strict';

/*
    - add a search bar:
      - search bar is input
      - after each keyword ',' will symbole the next keyword
 */

var gImages = [{
    id: 1,
    url: 'img/1.jpg',
    keywords: {
        animal: 1,
        happy: 1
    }
}, {
    id: 2,
    url: 'img/2.jpg',
    keywords: {
        animal: 1,
        happy: 1
    }
}, {
    id: 3,
    url: 'img/3.jpg',
    keywords: {
        animal: 1,
        happy: 1,
        sad:1
    }
},{
    id: 1,
    url: 'img/1.jpg',
    keywords: {
        animal: 1,
        happy: 1
    }
}, {
    id: 2,
    url: 'img/2.jpg',
    keywords: {
        animal: 1,
        happy: 1
    }
}, {
    id: 3,
    url: 'img/3.jpg',
    keywords: {
        animal: 1,
        happy: 1,
        sad:1
    }
}
]

/*OPTIONAL:
   when opening the webpage: 7 or 8 hexagons appear, each is from a 
   different catagory, how many different catagories? 21
   how many different images? 49 how can i actully take 
   a different image from each catagory
   array of different catagories.
 */



// render will gover and arr of images
function renderImageRow(_imageRow) {
    // render will just render a row.
    var tbody = document.querySelector('.images-container');
    var strHTML = '<div class="images-row">';
    for (var i = 0; i < _imageRow.length; i++) {
        // debugger;
        var id = _imageRow[i][id];
        strHTML += '<div id="' + id + '" class="hexagon"'+ 
        'style="background-image: url('+_imageRow[i].url+')">'
    
        +'<div class="face1"></div><div class="face2"></div></div>'
    }
    strHTML += '</div>';
    tbody.innerHTML = strHTML;
}
renderImageRow(gImages);


//--------------------------
/* function to search, filter.
 recives an arr of keywords
 will return an arr of the filtered images*/
function filterImages(_keyWordsToSearch) {
    // debugger
    var matchedImages = [];
    var curImage;
    for (var i = 0; i < gImages.length; i++) {
        curImage = gImages[i];
        
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
}


filterImages(['happy','sad']);



