window.addEventListener('load', init);

//Global variables
let fetchUrl = 'http://localhost/team42CLE3/webservice/index.php';
let emergencies;
let emergencyData = {};

/**
 * Initialize after the DOM is ready
 */
function init()
{
    emergencies = document.getElementById('emergencies')
    console.log(emergencies)
    emergencies.addEventListener('click', emergencyClickHandler);

    getData();

}

/**
 * Handler for when a button is clicked
 * 
 * @param e 
 */
function emergencyClickHandler(e)
{
    let clickedItem = e.target;

    if (clickedItem.nodeName !== "BUTTON") {
        return;
    }

    console.log("You clicked on an emergency button!")
    // if (clickedItem.id == "name") {
    //     elementClickHandler(e);
    // } else {
    //     return;
    // }
}

/**
 * AJAX-call to retrieve emergencies from the API
 */
function getData()
{
    fetch(fetchUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            
            return response.json();
        })
        .then(createEmergencyButtons)
        .catch(ajaxErrorHandler);
}

/**
 * Create initial emergency buttons based on initial API data
 *
 * @param data
 */
function createEmergencyButtons(data)
{
    // Loop through the list of anime
    for (let emergency of data) {
        console.log("Emergency buttons for ambulance, police and firefighters will be created here");
        // // Wrapper element for every emergency button. We need the wrapper now, because adding it later
        // // will result in the emergency being ordered based on the load times of the API instead of chronically
        // let emergencyButton = document.createElement('div');
        // emergencyButton.classList.add('emergency-card');
        // emergencyButton.dataset.name = emergency.name;

        // // Append anime card to the actual HTML
        // emergencies.appendChild(emergencyButton);

        // // Retrieve the detail information from the API
        // fetch((fetchUrl + '?id=' + emergency.id))
        // .then((response) => {
        //     if (!response.ok) {
        //         throw new Error(response.statusText);
        //     }
        //     return response.json();
        // })
        // .then(fillEmergencyButton)
        // .catch(ajaxErrorHandler);
    }
}
