const wordInput = document.getElementById('word-input');
const infoText = document.getElementById('info-text');
const meaningContainer = document.getElementById('meaning-container');
const wordTitle = document.getElementById('word-title');
const wordMeaning = document.getElementById('word-meaning');
const wordPronunciation = document.getElementById('audio');

wordInput.addEventListener("keyup", function(event) {
    if(event.target.value && event.key === "Enter"){
        console.log(fetchMeaningOfTheWord(wordInput.value));
    }
})

async function fetchMeaningOfTheWord(word){
    try {
        infoText.style.display = 'block';
        meaningContainer.style.display = 'none';
        infoText.innerText = `Searching meaning of ${word}`;

        let result = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then(response => response.json());
        infoText.style.display = 'none';

        if(result.title) {
            wordTitle.innerText = word;
            wordMeaning.innerText = "N/A";

            wordPronunciation.style.display = 'none';
            meaningContainer.style.display = 'block';
        } else {
            wordTitle.innerText = result[0].word;

            wordMeaning.innerText = result[0].meanings[0].definitions[0].definition
            wordPronunciation.src = result[0].phonetics[0].audio;

            wordPronunciation.style.display = 'inline';
            meaningContainer.style.display = 'block';
        }
    } catch (err){
        console.log(err)
        infoText.innerText = `An error happened, try again latter`;
    }
}