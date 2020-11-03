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
function encode(str, n, alphabet = '') {
  return 'Hello';
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n, alphabet = '') {
  return 'Wadd';
}

const Caesar = (() => {
  // Default stafróf, uppfært þegar slegið inn í "alphabet"
  let alphabet = 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ';

  // Default type, uppfært af radio input
  let type = 'encode';

  // Default hliðrun, uppfært af "shift"
  let shift = 3;

  // Strengurinn í Strengur input

  let currentString;

  function init(el) {
    // Setja event handlera á viðeigandi element

    // inputAlphabet eventlistener - breyting a stafrofi
    const inputAlphabet = document.querySelector('input[name=alphabet]');

    inputAlphabet.addEventListener('change', (e) => {
      const { target } = e;
      console.log(`Alphabet before: ${alphabet}`);
      alphabet = e.target.value;
      console.log(`Alphabet after : ${alphabet}`);
    });

    // querySelector fyrir shiftValue
    const shiftVal = document.querySelector('span[class=shiftValue]');

    //range eventlistener
    const range = document.querySelector('input[type=range]');

    range.addEventListener('input', (e) => {
      const { target } = e;
      //console.log(e.target.value);
      //console.log(`shift before: ${shift}`);
      shift = e.target.value;
      //console.log(`shift after : ${shift}`);
      shiftVal.textContent = shift;
      output();
    });


    // radio eventlistener
    const radios = document.querySelectorAll('input[type=radio]');

    function radioChanged(e) {
      const { target } = e;
      type = e.target.value;
      output();
    }

    for (let i = 0; i < radios.length; i++) {
      radios[i].addEventListener('change', radioChanged);
    }

    // querySelector fyrir results
    const resultOutput = document.querySelector('div[class=result]');

    // inputString eventlistener - strengur til að dulkóða
    const inputString = document.querySelector('input[name=input]');

    inputString.addEventListener('input', (e) => {
      const { target } = e;
      console.log(`inputString: ${e.target.value}`);
      currentString = e.target.value;
      //console.log(`currentString: ${currentString}`);
      output();
    });

    /**
     * Fallið kallar á annaðhvort encode eða decode eftir
     * núvernadi stöðu á global breytunum og breytir
     * textContent i result div-inu.
     * @param Ekkert
     * @return Ekkert
     */
    function output(){
      let outputString;
      switch(type) {
        case 'encode':
          outputString = encode(currentString, shift, alphabet);
          break;
        case 'decode':
          outputString = decode(currentString, shift, alphabet);
          break;
        default:
          console.log(`Critical error radio value is ${type}`);
      }
      resultOutput.textContent = outputString;
    }
  }



  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const ceasarForm = document.querySelector('.caesar');

  Caesar.init(ceasarForm);
});
