const inputVal = document.querySelector(".input-val");
const txt = document.querySelector(".txt");
const ptag = document.querySelector(".pronunciation");
const grammar = document.querySelector(".grammar");
const word = document.querySelector(".word");
const sentence = document.querySelector(".sentence");

const fetchData = async () => {
    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputVal.value}`);
        const data = await res.json();

        const entry = data[0];
        txt.innerText = inputVal.value;
        ptag.innerText = entry.phonetic || entry.phonetics[0]?.text || '';

        const meaning = entry.meanings[0];
        grammar.innerText = meaning.partOfSpeech || '';

        const definition = meaning.definitions[0];
        sentence.innerText = definition.example || '';

        const synonyms = meaning.synonyms || [];
        word.innerText = synonyms.join(', ') || '';
    } catch (error) {
        console.error("Error fetching data:", error);
        txt.innerText = "No data found";
        ptag.innerText = '';
        grammar.innerText = '';
        word.innerText = '';
        sentence.innerText = '';
    }
}

const sound = async () => {
    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputVal.value}`);
        const data = await res.json();

        const entry = data[0];
        const audioUrl = entry.phonetics[0]?.audio;

        if (audioUrl) {
            let audio = new Audio(audioUrl);
            audio.play();
        } else {
            console.error("No audio available");
        }
    } catch (error) {
        console.error("Error fetching sound:", error);
    }
}
