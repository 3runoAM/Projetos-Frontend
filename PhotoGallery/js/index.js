async function fetchImages() {
    let photos_amount = document.getElementById('photos-amount').value;
    let gallery = document.getElementById('gallery');
    await fetch(`https://api.pexels.com/v1/curated?&per_page=${photos_amount}`, {
        headers: {
            Authorization: "QCHtV2WoeqgqAACLL6Get70uPT60nMBUdCqNDVsggioU5M8Hq2xXmPYK"
        }
    })
        .then(response => response.json())
        .then(data => data.photos.forEach(photo => {
            let newPhoto = document.createElement("img");
            newPhoto.src = photo.url;
            newPhoto.alt = photo.name;

            gallery.appendChild(newPhoto)
        }))
        .catch(error => console.error('Error:', error));
}

const button = document.getElementById('get-photos');
button.addEventListener('click', fetchImages);
