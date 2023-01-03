const button = document.getElementById("btn");
const imgContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loading");



//funktion som lyssnar på en click event. När det händer så kallar det en annan funktion.
button.addEventListener("click", function (event) {
  event.preventDefault();
  getDataToAppend();
});

//funktion som fetch:ar (hämtar) data från API:n. Den tar in user input och retunerar bilder på det man sökt.
async function getDataToAppend() {
  const number = document.querySelector("#number-input").value;
  const sort = document.querySelector("#multiple-input").value;
  const textInput = document.getElementById("txt-input").value;
  const sizeInput = document.querySelector("#size-input").value;
  if (imgContainer.innerHTML !== "") {
    clearDom();
  }
  if (textInput == "") {
    const errorMsg = document.createElement("p");
    errorMsg.innerHTML = "Nothing was found. Try again!";
    imgContainer.append(errorMsg);
  } else {
    const data = await fetchData(textInput, number, sort);
    appendImagesToContainer(data.photos.photo, sizeInput);
  }
}

//tömmer sök inputen
function clearDom() {
  imgContainer.innerHTML = "";
}

//funktion som tar in två parameter och skapar en error message om text inputen är tom. Om den inte är tom då loopar den genom arrayn och kallar en till funktion som tar in varje bild objekt i arrayn som parameter.
function appendImagesToContainer(photos, sizeInput) {
  if (photos.length === 0) {
    const errorMsg = document.createElement("p");
    errorMsg.innerHTML = "Nothing was found. Try again!";
    imgContainer.append(errorMsg);
  } else {
    photos.forEach((photo) => {
      createImgElementAndAppendToDom(photo, sizeInput);
    });
  }
}

//funktion som skapar image element och appendar det till DOM:en.
function createImgElementAndAppendToDom(photo, sizeInput) {
  const imgSrc = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${sizeInput}.jpg`;
  const imgHolder = document.createElement("imgHolder");
  imgContainer.className = "container";
  const img = document.createElement("img");
  img.src = imgSrc;
  imgHolder.append(img);
  imgContainer.append(imgHolder);
}

//funktion som fetch:ar (hämtar) data från API. Funktionen retunerar data i JSON format.
async function fetchData(textInput, number, sort) {
  const apiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f90c4c919c7617075a763b6d292dce9c&text=${textInput}&sort=${sort}&per_page=${number}&format=json&nojsoncallback=1`;
  try {
    //animationen visar när man hämtar datan.
    showLoading();
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    //annars så göms den.
    hideLoading();
  }
}

//en funktion som gör att en loader animation visas medan datan hämtas från API. 
function showLoading() {
  loader.classList.add("display");
  setTimeout(() => {
    loader.classList.remove("display");
  }, 4000);
}

function hideLoading() {
  loader.classList.remove("display");
}


//här har jag använd ett bibliotek (Jquery). Om man lägger muspillen på p elementet så blir texten rosa från den originella blåa färgen den hade i början.
$( "p" ).on( "mouseover", function() {
  $( this ).css( "color", "#FF0088" );
});
