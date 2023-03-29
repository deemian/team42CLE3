window.addEventListener('load', init);

//Global variables
let fetchUrl = 'http://localhost/team42CLE3/webservice/index.php';
let emergencies;
let emergencyData = {};
let selectedInfo = [];

/**
 * Initialize after the DOM is ready
 */
function init()
{
    // Get div element for emergencies
    emergencies = document.getElementById('emergencies')
    emergencies.addEventListener('click', emergencyClickHandler);

    getData();

    // Get selected info of the emergencies
    let selectedInfoString = localStorage.getItem('selectedInfo');
    if (selectedInfoString !== null) {
        selectedInfo = JSON.parse(selectedInfoString);
    }
}

/**
 * Handler for when the details button is clicked
 * 
 * @param e 
 */
function emergencyButtonHandler(e) {
    let clickedItem = e.target;
  
    let emergency = emergencyData[clickedItem.dataset.id];
    
    emergencies.innerHTML = "";

    fetch(fetchUrl + '?id=' + emergency.id)
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    })
    .then(createEmergencies)
    .catch(ajaxErrorHandler);
}


/**
 * Handler for when a button is clicked
 *
 * @param e
 */
function emergencyClickHandler(e)
{
    let clickedItem = e.target;

    if (clickedItem.nodeName !== "DIV" && clickedItem.classList.contains('emergency')) {
        return;
    }

    if (clickedItem.classList.contains('emergency')) {
        emergencyButtonHandler(e);
    } else {
        return;
    }
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
        .then(createEmergencies)
        .catch(ajaxErrorHandler);
}

/**
 * Create initial emergency divs based on initial API data
 *
 * @param data
 */
function createEmergencies(data)
{
    // Loop through the list of emergencies
    for (let x = 0; x < data.length; x++) {
        const emergency = data[x];
        // // Wrapper element for every emergency button. We need the wrapper now, because adding it later
        // // will result in the emergency being ordered based on the load times of the API instead of chronically
        let emergencyButton = document.createElement('div');
        
        // Add attributes to the emergency button
        emergencyButton.classList.add('emergency');
        emergencyButton.dataset.id = emergency.id;
        emergencyButton.dataset.name = emergency.name;
        
        // // Append emergency to the actual HTML
        emergencies.appendChild(emergencyButton);

        // Retrieve the detail information from the API
        fetch((fetchUrl + '?id=' + emergency.id))
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(fillEmergencyButton)
            .catch(ajaxErrorHandler);
    }
}

function fillEmergencyButton(emergency) {
    // Wrapper element for every emergency button
    let emergencyButton = document.querySelector(`.emergency[data-name='${emergency.name}']`);

    // Image for the emergency button
    let img = document.createElement('img');
    img.src = `./images/${emergency.name}.png`;
    emergencyButton.appendChild(img);

    // Title for the emergency button
    let title = document.createElement('h2');
    title.innerHTML = `${emergency.name}`;
    emergencyButton.appendChild(title);

    // Add emergency to emergencyData
    emergencyData[emergency.id] = emergency;
}

/**
 * Show an error message to inform the API isn't working correctly
 *
 * @param data
 */
function ajaxErrorHandler(data)
{
    let error = document.createElement('div');
    error.classList.add('error');
    error.innerHTML = 'Er is helaas iets fout gegaan met de API, probeer het later opnieuw';
    emergencies.before(error);
}