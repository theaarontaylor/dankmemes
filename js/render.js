'use strict';

/*
    - add a "cloud" of tags
      - will show all catagories, each catagory size is determined 
        by the amount of images.
      - pressing a tag will enter it to the search bar
 */

var catagoryCount = {};
var gCatagorys;
var gImageContainer = document.querySelector('.images-container');
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
        happy: 1,
        sad: 1
    }
}, {
    id: 4,
    url: 'img/4.jpg',
    keywords: {
        happy: 1
    }
}, {
    id: 5,
    url: 'img/5.jpg',
    keywords: {
        happy: 1
    }
}, {
    id: 6,
    url: 'img/6.jpg',
    keywords: {
        happy: 1,
        sad: 1
    }
}]



function main() {
    debugger
    countCatagoryOccur();
}

main();
/*OPTIONAL:
   when opening the webpage: 7 or 8 hexagons appear, each is from a 
   different catagory, how many different catagories? 21
   how many different images? 49 how can i actully take 
   a different image from each catagory
   array of different catagories.
 */



// render will gover and arr of images
function renderImages(_images) {
    // render will just render a row.
    var strHTML = '';
    for (var i = 0; i < _images.length; i++) {
        // debugger;
        var id = _images[i][id];
        strHTML += '<div id="' + id + '" class="hexagon"' +
            'style="background-image: url(' + _images[i].url + ')">'

        +
        '<div class="face1"></div><div class="face2"></div></div>'
    }
    gImageContainer.innerHTML = strHTML;
}
renderImages(gImages);


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


//filterImages(['happy','sad']);



function searchKeyWords() {
    // debugger
    gImageContainer.innerHTML = '';
    var keywordString = document.querySelector('.search-bar-input').value;
    var keywords = keywordString.split(",");

    renderImages(filterImages(keywords));
}

//---------------------
// count how many images belong to a catagory
function countCatagoryOccur() {
    for (var i = 0; i < gImages.length; i++) {
        for (var keyword in gImages[i].keywords) {
            if (catagoryCount[keyword]) {
                catagoryCount[keyword]++;
            } else {
                catagoryCount[keyword] = 1;
            }
        }
    }
    //gCatagorys is an arr of arr[key,value]
    var catagoryKeys = objToArr(catagoryCount);
    for (var d = 0; d < catagoryKeys.length; d++) {
        catagoryKeys[d].push(catagoryCount[catagoryKeys[d]]);
    }
    debugger
    gCatagorys = catagoryKeys.sort(function (a, b) {
        return a[1] - b[1];
    });
}

// turns an object keys to an array
function objToArr(_obj) {
    var keys = [];
    for (var key in _obj) {
        keys.push([key])
            // keys[keys.length - 1] = key;
    }
    debugger
    return keys;
}

//-------------
// cloud tag:
// each tag will be a button? or will have on click event
// each tag has amount of occurences,( maybe replace later with  popularity)
// num of occurence will make the word bigger
// will need to normalize the size. biggest will be 50 px?
// smallest will be 10px
// so first will have to sort  

// -------------------------------
// setting size of keywords proportionaly to occurences.

function renderCloudTag() {
    // this goes in a for loop
    var strHTML = '<ul class="list-tags">';

    for(var i = 0; i < gCatagorys.length; i++){
        // here i render each p, and add them to strHTML
        // strHTML will be push to the cloud-tag div
    }
    strHTML +='</ul>'
    var textScale = d3.scaleLinear().domain([1, 6]).range([10, 50]);
    var d = textScale(gCatagorys[0][1])
}