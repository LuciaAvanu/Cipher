import { characters } from './characters.js'

// ----- FUNCTIONS ---------
function getIndexes(str) {
    str = [...str]
    return str.map((letter) => {
        for (let char of characters) {
            if (letter == char) return characters.indexOf(char)
        }
    })
}

function getChars(arrOfIndexes) {
    return arrOfIndexes.map((index) => {
        for (let char of characters) {
            if (characters.indexOf(char) == index) return char.toLowerCase()
        }
    })
}

function modifyIndexesArr(messageIndexes, keyIndexes) {
    if (keyIndexes.length == 1) {
        let element = keyIndexes[0];
        keyIndexes = [];
        for (let el of messageIndexes) keyIndexes.push(element)
    }
    let position = 0;

    while (keyIndexes.length < messageIndexes.length) {
        keyIndexes.push(keyIndexes[position]);
        position++;
    }
    return keyIndexes

}

function encryptMessage(message, secretKey) {
    message = message.toUpperCase();
    secretKey = secretKey.toUpperCase();

    const messageIndexes = getIndexes(message)
    let keyIndexes = getIndexes(secretKey)

    if (keyIndexes.length != messageIndexes.length) {
        keyIndexes = modifyIndexesArr(messageIndexes, keyIndexes)
    }

    const indexesSum = []
    for (let i = 0; i < messageIndexes.length; i++) {
        indexesSum.push((messageIndexes[i] + keyIndexes[i]) % characters.length)
    }

    return getChars(indexesSum).join('')
}

function decryptMessage(message, secretKey) {
    message = message.toUpperCase();
    secretKey = secretKey.toUpperCase();

    const messageIndexes = getIndexes(message)
    let keyIndexes = getIndexes(secretKey)

    if (keyIndexes.length != messageIndexes.length) {
        keyIndexes = modifyIndexesArr(messageIndexes, keyIndexes)
    }

    const indexesDif = []

    for (let i = 0; i < messageIndexes.length; i++) {
        indexesDif.push((messageIndexes[i] - keyIndexes[i]) % characters.length)
    }
    for (let i = 0; i < indexesDif.length; i++) {
        if (indexesDif[i] < 0) {
            indexesDif[i] += characters.length;
        }
    }
    return getChars(indexesDif).join('')
}



// -------- DOM MANIPULATION --------------

const encryptBtn = document.querySelector('#encrypt-btn')
const decryptBtn = document.querySelector('#decrypt-btn')
const copyBtn = document.querySelector('#copy-btn')

encryptBtn.addEventListener('click', () => {
    const message = document.querySelector('#message').value;
    const secretKey = document.querySelector('#secret-code').value;

    document.querySelector('#encrypted-msg').innerText = encryptMessage(message, secretKey);
})

decryptBtn.addEventListener('click', () => {
    const message = document.querySelector('#message').value;
    const secretKey = document.querySelector('#secret-code').value;

    document.querySelector('#encrypted-msg').innerText = decryptMessage(message, secretKey);
})

copyBtn.addEventListener('click', () => {
    const valueToCopy = document.querySelector('#encrypted-msg').value;
    navigator.clipboard.writeText(valueToCopy);
})