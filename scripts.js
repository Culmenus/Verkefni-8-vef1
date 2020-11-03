/**
 * Verkefni 8 – Caesar dulmál með vefviðmóti
 *
 * Verður að passa _nákvæmlega_ við gefið HTML, mun annars brotna.
 * Þ.e.a.s., ekki þarf að skrifa meðhöndlun á HTML elementum sem vantar
 */

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n, alphabet) {
  const upper = str.toLocaleUpperCase();

  let result = '';
  for (let i = 0; i < str.length; i += 1) {
    result += alphabet[(alphabet.indexOf(upper[i]) + n) % alphabet.length];
  }
  return result;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n, alphabet) {
  // dæmi sem notar „fallaforritun“
  return str
    .toLocaleUpperCase()
    .split('')
    .map((s) => alphabet.indexOf(s) - n) // hliðruð staðsetning stafs
    .map((i) => (i < 0 ? alphabet.length + i : i)) // ef i verður neikvætt, förum aftast í stafróf
    .map((i) => alphabet[i])
    .join('');
}

const Caesar = (() => {
  // Default stafróf, uppfært þegar slegið inn í "alphabet"
  let alphabet = 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ';

  // Default type, uppfært af radio input
  let type = 'encode';

  // Default hliðrun, uppfært af "shift"
  let shift = 3;

  // Strengurinn í Strengur input
  let currentString = '';

  /**
 * Fall til að undirbúa streng til kóðunnar.
 * Fallið biggir streng sem er einungis með stöfum úr stafrófi
 * @param {string} stringToTrim
 * @return trimmedString
 */
  function legalCharString(stringToTrim) {
    let trimmedString = '';
    for (let i = 0; i < stringToTrim.length; i += 1) {
      const letter = (stringToTrim[i]).toLocaleUpperCase();
      if (alphabet.indexOf(letter) >= 0) {
        trimmedString = trimmedString.concat(letter);
      }
    }
    return trimmedString;
  }

  /**
 * Fallið kallar á annaðhvort encode eða decode eftir
 * núvernadi stöðu á global breytunum og breytir
 * textContent i result div-inu.
 * @param Ekkert
 * @return Ekkert
 */
  function output() {
    // querySelector fyrir results
    const resultOutput = document.querySelector('div[class=result]');
    let outputString;
    const codeInput = legalCharString(currentString);
    switch (type) {
      case 'encode':
        outputString = encode(codeInput, shift, alphabet);
        break;
      case 'decode':
        outputString = decode(codeInput, shift, alphabet);
        break;
      default:
        console.log(`Critical error radio value is ${type}`);
    }
    resultOutput.textContent = outputString;
  }

  function init() {
    // Setja event handlera á viðeigandi element

    // inputAlphabet eventlistener - breyting a stafrofi
    const inputAlphabet = document.querySelector('input[name=alphabet]');

    // kýs að hafa change því input er svo janky
    inputAlphabet.addEventListener('change', (e) => {
      const newAlphabet = e.target.value;
      alphabet = newAlphabet.toLocaleUpperCase().trim();
      output();
    });

    // querySelector fyrir shiftValue
    const shiftVal = document.querySelector('span[class=shiftValue]');

    // range eventlistener
    const range = document.querySelector('input[type=range]');

    range.addEventListener('input', (e) => {
      shift = Number.parseInt(e.target.value, 10);
      shiftVal.textContent = shift;
      output();
    });

    // radio eventlistener
    const radios = document.querySelectorAll('input[type=radio]');

    function radioChanged(e) {
      type = e.target.value;
      output();
    }

    for (let i = 0; i < radios.length; i += 1) {
      radios[i].addEventListener('change', radioChanged);
    }

    // inputString eventlistener - strengur til að dulkóða
    const inputString = document.querySelector('input[name=input]');

    inputString.addEventListener('input', (e) => {
      currentString = e.target.value;
      output();
    });
  }
  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const ceasarForm = document.querySelector('.caesar');

  Caesar.init(ceasarForm);
});
