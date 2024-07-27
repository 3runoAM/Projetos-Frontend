const button = document.getElementById('get-photos');
const gallery = document.getElementById('gallery');
const errorMessage = document.getElementById('errorMessage');
const loadingSpiner = document.getElementById('loading-spinner');


let randomPage = () =>  {
    return Math.floor(Math.random() * 500);
};

let createNewPhoto = (photo) => {
    let newPhoto = document.createElement("img");
    newPhoto.src = photo.src.portrait;
    newPhoto.alt = photo.alt;
    newPhoto.classList.add("gallery-img")

    return newPhoto;
}

async function fetchImages() {
    let photoAmount = document.getElementById('photos-amount').value;

    button.style.display = "none";
    loadingSpiner.style.display = "block";

    await fetch(`https://api.pexels.com/v1/curated?&per_page=${photoAmount}&page=${randomPage()}`, {
        headers: {
            Authorization: "QCHtV2WoeqgqAACLL6Get70uPT60nMBUdCqNDVsggioU5M8Hq2xXmPYK"
        }
    })
        .then(response => response.json())
        .then(data => data.photos.forEach(photo => {
            if (photoAmount < 1 || photoAmount > 10) {
                button.style.display = "block";

                loadingSpiner.style.display = "none";

                errorMessage.innerText = "Enter a number between 1 and 10"
                errorMessage.style.display = 'block';
                return;
            }

            errorMessage.style.display = 'none';
            gallery.prepend(createNewPhoto(photo));
            button.style.display = "block";
            loadingSpiner.style.display = "none";

            gallery.hasChildNodes() ? gallery.style.display = 'flex' : gallery.style.display = 'none';
        }))
        .catch(err => {
            button.style.display = "block";
            loadingSpiner.style.display = "none";
            errorMessage.innerText = "An error ocurred while fetching images";
            errorMessage.style.display = 'block';
        });
}

button.addEventListener('click', fetchImages);