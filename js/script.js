const charMap = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D',
    'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z', ' ', '!', '"', '#', '$', '%', '&', '\'',
    '(', ')', '*', '+', ',', '-', '.', '/', ':', ';',
    '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_',
    '`', '{', '|', '}', '~', 'à', 'á', 'ả', 'ã', 'ạ',
    'ă', 'ằ', 'ắ', 'ẳ', 'ẵ', 'ặ', 'â', 'ầ', 'ấ', 'ẩ',
    'ẫ', 'ậ', 'đ', 'è', 'é', 'ẻ', 'ẽ', 'ẹ', 'ê', 'ề',
    'ế', 'ể', 'ễ', 'ệ', 'ì', 'í', 'ỉ', 'ĩ', 'ị', 'ò',
    'ó', 'ỏ', 'õ', 'ọ', 'ô', 'ồ', 'ố', 'ổ', 'ỗ', 'ộ',
    'ơ', 'ờ', 'ớ', 'ở', 'ỡ', 'ợ', 'ù', 'ú', 'ủ', 'ũ',
    'ụ', 'ư', 'ừ', 'ứ', 'ử', 'ữ', 'ự', 'ỳ', 'ý', 'ỷ',
    'ỹ', 'ỵ'
];
const baseChars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

/*
 * Shuffle char map with seed
 * @param charMap 
 * @return charMap - shuffled char map
 */
function shuffleCharMapWithSeed(key) {
    let shuffledCharMap = charMap.slice();
    const rng = new Math.seedrandom(key); // Create a seeded random number generator
    for (let i = shuffledCharMap.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1)); // Generate a random index based on the key
        [shuffledCharMap[i], shuffledCharMap[j]] = [shuffledCharMap[j], shuffledCharMap[i]]; // Swap the elements at the random index and the current index
    }
    return shuffledCharMap;
}

/*
 * Replace chars in the message as reference of shuffled char map
 * @param message - the original text input
 * @shuffledCharMap - the shuffled char map generated earlier
 * @return newMessage - the raw encrypted message
 */
function replaceChars(message, shuffledCharMap) {
    let newMessage = "";
    for (let i = 0; i < message.length; i++) {
        let char = message.charAt(i);
        if (charMap.includes(char)) {
            let index = charMap.indexOf(char);
            let newChar = shuffledCharMap[index];
            newMessage += newChar;
        } else {
            newMessage += char;
        }
    }
    return newMessage;
}

/*
 * Revert chars in the message as reference of shuffled char map
 * @param message - the raw encrypted message
 * @shuffledCharMap - the shuffled char map generated earlier
 * @return originalMessage - the original text input
 */
function revertChars(message, shuffledCharMap) {
    let originalMessage = "";
    for (let i = 0; i < message.length; i++) {
        let char = message.charAt(i);
        let index = shuffledCharMap.indexOf(char);
        if (index !== -1) {
            let originalChar = charMap[index];
            originalMessage += originalChar;
        } else {
            originalMessage += char;
        }
    }
    return originalMessage;
}

/*
 * Convert raw encrypted message to its index number plus 100
 * @param text - the raw encrypted message
 * @return result - the string contains index numbers with no padding
 */
function convertToIndex(text) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let index = charMap.indexOf(text[i]);
        if (index !== -1) {
            result += (index + 100).toString();
        }
    }
    return result;
}

/*
 * Revert the string contains index numbers to raw encrypted message
 * @param encodedString - the string contains index numbers
 * @return result - raw encrypted message
 */
function revertEncodedString(encodedString) {
    let result = '';
    let chunkSize = 3;
    let chunks = [];
    for (let i = 0; i < encodedString.length; i += chunkSize) {
        chunks.push(encodedString.slice(i, i + chunkSize));
    }
    for (let i = 0; i < chunks.length; i++) {
        result = result + charMap[parseInt(chunks[i]) - 100].toString();
    }
    return result;
}

/*
 * Convert the string contains index numbers to customized base-62 number
 * @param str - the string contains index numbers
 * @return result - the final encoded message
 */
function convertTo62Base(str) {
    let result = "";
    let num = BigInt(str);
    while (num > 0n) {
        result = baseChars[num % 62n] + result;
        num = num / 62n;
    }
    return result;
}

/*
 * Revert the final encoded message to the string contains index numbers
 * @param str - the final encoded message
 * @return result - the string contains index numbers
 */
function revertFrom62Base(str) {
    let result = 0n;
    let placeValue = 1n;
    for (let i = str.length - 1; i >= 0; i--) {
        const digit = BigInt(baseChars.indexOf(str[i]));
        result += digit * placeValue;
        placeValue *= 62n;
    }
    return result.toString();
}

function encrypt() {
    let key = document.getElementById("key").value;
    let shuffledCharMap = shuffleCharMapWithSeed(key);
    let message = document.getElementById("text").value;
    let step1 = replaceChars(message, shuffledCharMap);
    let step2 = convertToIndex(step1);
    let step3 = convertTo62Base(step2);
    document.getElementById("result").value = step3;
}

function decrypt() {
    let key = document.getElementById("key").value;
    let shuffledCharMap = shuffleCharMapWithSeed(key);
    let encoded = document.getElementById("text").value;
    let step1 = revertFrom62Base(encoded);
    let step2 = revertEncodedString(step1);
    let step3 = revertChars(step2, shuffledCharMap);
    document.getElementById("result").value = step3;
}

/*
 * Allows copy text to clipboard
 */
function copyText() {
    var copyText = document.getElementById("result");
    copyText.select();
    document.execCommand("copy");
}

/*
 * Count length of text and result
 */
function countLengths() {
    const textLength = document.getElementById("text").value.length;
    const resultLength = document.getElementById("result").value.length;
    document.getElementById("text-length").innerHTML = textLength;
    document.getElementById("result-length").innerHTML = resultLength;
}

function clearValueOnFocus(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.addEventListener('focus', () => {
            element.value = '';
        });
    }
}

clearValueOnFocus('text');
clearValueOnFocus('key');
