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
        sad: 1,
        fail: 1
    }
}, {
    id: 7,
    url: 'img/7.jpg',
    keywords: {
        happy: 1,
        sad: 1
    }
}, {
    id: 8,
    url: 'img/8.jpg',
    keywords: {
        happy: 1,
        crazy: 1
    }
}, {
    id: 9,
    url: 'img/9.jpg',
    keywords: {
        sarcastic: 1,
        success: 1
    }
}, {
    id: 10,
    url: 'img/10.jpg',
    keywords: {
        success: 1,
        sad: 1
    }
}, {
    id: 11,
    url: 'img/11.jpg',
    keywords: {
        happy: 1,
        success: 1
    }
}, {
    id: 12,
    url: 'img/12.jpg',
    keywords: {
        crazy: 1,
        animal: 1
    }
}, {
    id: 13,
    url: 'img/13.jpg',
    keywords: {
        sarcastic: 1
    }
}]



function main() {
    // debugger
    countCatagoryOccur();
    renderCloudTag();
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
        var id = 'img/' + _images[i].id + '.jpg';
        strHTML += '<div id="' + id + '" class="hexagon" onclick="sendPicToEditor(this)"' +
            'style="background-image: url(' + _images[i].url + '); background-size: 100%;">'

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

// adding words from the cloud tag to the search bar
function addToSearchBar(_tag){    
    var searchBar = document.querySelector('.search-bar-input');
    var searchTerms = searchBar.value;
    var tag = _tag.innerHTML;
    // _tag.
    searchTerms += ',' + tag;
    searchBar.value = searchTerms;

}

function searchKeyWords() {
    // debugger
    gImageContainer.innerHTML = '';
    var keywordString = document.querySelector('.search-bar-input').value;
    var keywords = keywordString.split(",");
    keywords = keywords.filter(v => v!=='');
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
    // debugger
    // this goes in a for loop
    var cloudTag = document.querySelector('.cloud-tag');
    var textScale = d3.scaleLinear()
        .domain([gCatagorys[0][1], gCatagorys[gCatagorys.length - 1][1]])
        .range([10, 50]);
    var opacity = d3.scaleLinear()
        .domain([gCatagorys[0][1], gCatagorys[gCatagorys.length - 1][1]])
        .range([0.5, 1]);
    var strHTML = '<ul class="list-tags">';
    var shuffled = shuffle(gCatagorys);
    for (var i = 0; i < gCatagorys.length; i++) {
        strHTML += '<li style="font-size:' 
                   + parseInt(textScale(shuffled[i][1])) + 'px;"'
                   + ' onclick="addToSearchBar(this)">' 
                   + shuffled[i][0] + '</li>'
            // here i render each p, and add them to strHTML
            // strHTML will be push to the cloud-tag div
    }
    strHTML += '</ul>'
    cloudTag.innerHTML = strHTML;
}

// shuffle array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


//------------------------------------
// jquery animation
$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});