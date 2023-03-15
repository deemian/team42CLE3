window.addEventListener('load', init);

//Global variables
let ambulance;

/**
 * Initialize after the DOM is ready
 */
function init()
{
    ambulance = document.getElementById('ambulance')
    console.log(ambulance)

    ambulance.addEventListener('click', clickedAmbulance);
}

function clickedAmbulance()
{
    console.log("You clicked on ambulance!")
}

