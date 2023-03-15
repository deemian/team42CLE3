window.addEventListener('load', init);

//Global variables
let imageList = ['ballonnen', 'cars', 'planes', 'goudkistje'];
shuffleArray(imageList)
let playingField;
let lastTarget;
let form;
let alert;
let input;
let correctAnswer = "3";
let winnerImage = 'goudkistje';

/**
 * Initialize after the DOM is ready
 */
function init()
{
    playingField = document.getElementById('playing-field');
// let playingField = playingFieldElement.innerHTML;
    console.log(playingField);
    createPlayField();

    playingField.addEventListener('click', playingFieldClickHandler);

    form = document.getElementById('play-form')
    console.log(form)

    form.addEventListener('submit', formSubmitHandler);

    alert = document.getElementById('alert');

}

/**
 * Generate the playing field dynamically with all the available images
 */
function createPlayField()
{
    for(let i = 0; i < imageList.length; i++) {
        console.log(imageList[i]);
        let div = document.createElement('div');
        div.classList.add('playing-card');

        let h2 = document.createElement('h2');
        h2.innerHTML = i.toString();
        div.appendChild(h2);

        let img = document.createElement('img');
        //img.src = `img/${imageList[i]}.png`;
        img.src = `img/vraagteken-plaatjes.png`;
        img.dataset.imageIndex = i.toString();
        div.appendChild(img);


        playingField.appendChild(div);
    }

}

/**
 * Show the card by its front so the player knows what's going on
 *
 * @param e
 */
function playingFieldClickHandler(e)
{
    let target = e.target;
    // console.log(e.target.nodeName);

    if(target.nodeName !== 'IMG') {
        return;
    }
    // console.log(target.dataset.imageIndex);
    if(lastTarget) {
        lastTarget.src = 'img/vraagteken-plaatjes.png'
    }

    target.src = `img/${imageList[target.dataset.imageIndex]}.png`;
    lastTarget = target;

    console.log(lastTarget);


}

/**
 * Handler for when the form is submitted
 *
 * @param e
 */
function formSubmitHandler(e)
{
    e.preventDefault();


    input = document.getElementById('guess-number').value;
    console.log(input);

    if(imageList[input] === winnerImage) {
        writeFeedbackMessage('Gefeliciteerd! Je hebt het goed geraden!')
    } else {
        writeFeedbackMessage('Helaas! Probeer opnieuw!')
    }

    /*
    if (input === correctAnswer) {
      writeFeedbackMessage('Gefeliciteerd! Je hebt het goed geraden!')
    } else {
      writeFeedbackMessage('Helaas! Probeer opnieuw!')
    }
    */
    /*
    if(imageList[input] === winnerImage) {
      writeFeedbackMessage
      } else {
      }
     */

}

/**
 * Write text for the user as feedback of their answer
 *
 * @param text
 */
function writeFeedbackMessage(text)
{
    alert.innerHTML = text;
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 * @link http://stackoverflow.com/a/12646864
 *
 * @param array
 * @returns {*}
 */
function shuffleArray(array)
{
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
