//Getting Args from console
var operasi = document.querySelectorAll('.operation');
var check_operasi = function () {
    [...operasi].forEach(q => {
        var value;
        [...operasi].forEach((q) => {
            if (q.checked) {
                value = q.value;
            }
        })
        return value;
    });
};
var a_number = document.getElementById('a');
var b_number = document.getElementById('b');
var plaintext = document.getElementById('plaintext');

var args = {
    "operation": check_operasi(),
    "a": a_number.value,
    "b": b_number.value,
    "word": plaintext.value
};

var encryptedWord = [];
var decryptedWord = [];

document.getElementById('pure-form').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('operasi-txt').innerHTML = check_operasi();
    if (typeof parseInt(a_number.value) === 'number' || typeof parseInt(b_number.value) === 'number') {
        if (typeof plaintext.value !== 'string') {
            console.log("Word must be a string");
        } else {
            if (gcdCalc(parseInt(a_number.value), 26) === 1) {
                if (check_operasi() === "encrypt") {
                    document.getElementById('txt').innerHTML = 'Plaintext: ' + plaintext.value;
                    encryptWord().then(function (encrWord) {
                        console.log("Word " + plaintext.value + " got encrypted into " + encrWord);
                        document.getElementById('hasil').innerHTML = encrWord.toUpperCase();
                    });
                } else if (check_operasi() === "decrypt") {
                    document.getElementById('txt').innerHTML = 'Ciphertext: ' + plaintext.value;
                    decryptWord().then(function (decrWord) {
                        console.log("Ciphertext " + plaintext.value + " got decrypted into " + decrWord);
                        document.getElementById('hasil').innerHTML = decrWord.toUpperCase();
                    });
                } else {
                    console.log("Invalid operation specified. Use encrypt or decrypt.");
                }
            } else {
                console.log("a " + parseInt(a_number.value) + " and m 26 are not coprimes");
            }
        }
    } else {
        console.log("You must assign an Integer number to a and b. Remember that a must be coprime with m (26)");
    }
})

function gcdCalc(a, b) {
    if (b) {
        return gcdCalc(b, a % b);
    } else {
        return Math.abs(a);
    }
};

function encryptWord() {
    return new Promise(function (resolve) {
        var chars = plaintext.value.split("");
        var currInt = 0;
        var currEnc = "";
        encryptedWord = [];
        chars.forEach(function (currChar) {
            currInt = parseInt(currChar, 36) - 10;
            currEnc = mod((parseInt(a_number.value) * currInt + parseInt(b_number.value)), 26);
            encryptedWord.push(String.fromCharCode(97 + currEnc));
        });
        return resolve(encryptedWord.join(""));
    });
}

function decryptWord() {
    return new Promise(function (resolve) {
        var chars = plaintext.value.split("");
        var currInt = 0;
        var currDec = "";
        decryptedWord = [];
        var a_1 = modInverse(parseInt(a_number.value), 26);

        chars.forEach(function (currChar) {
            currInt = parseInt(currChar, 36) - 10;
            currDec = mod((a_1 * (currInt - parseInt(b_number.value))), 26);
            decryptedWord.push(String.fromCharCode(97 + currDec));
        });

        return resolve(decryptedWord.join(""));
    });
}

function modInverse(a, m) {
        var m0 = m;
    var x0 = 0;
    var x1 = 1;

    if (m == 1) return 0;

    while (a > 1) {
        var q = Math.floor(a / m);
        var t = m;

        m = a % m;
        a = t;
        t = x0;

        x0 = x1 - q * x0;
        x1 = t;
    }

    if (x1 < 0) x1 += m0;

    return x1;
}


function mod(n, m) {
    var remain = n % m;
    return Math.floor(remain >= 0 ? remain : remain + m);
};