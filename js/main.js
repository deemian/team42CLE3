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
    let clickedItem;
    
    if (e.target.nodeName == "DIV" && e.target.classList.contains('emergency')) {
        clickedItem = e.target;
    } else if (e.target.parentElement.nodeName == "DIV" && e.target.parentElement.classList.contains('emergency')) {
        clickedItem = e.target.parentElement;
    }
  
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
    let clickedItem;

    if (e.target.nodeName == "DIV" && e.target.classList.contains('emergency')) {
        clickedItem = e.target;
    } else if (e.target.parentElement.nodeName == "DIV" && e.target.parentElement.classList.contains('emergency')) {
        clickedItem = e.target.parentElement;
    } else {
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
    // Check if data is first array
    let emergency_name = false;
    if (typeof data.length === 'undefined') {
        emergency_name = data["name"];
        data = data["options"];
    }
    
    // Loop through the list of emergencies
    for (let x = 0; x < data.length; x++) {
        const emergency = data[x];
        // // Wrapper element for every emergency button. We need the wrapper now, because adding it later
        // // will result in the emergency being ordered based on the load times of the API instead of chronically
        let emergencyButton = document.createElement('div');
        
        // Add attributes to the emergency button
        emergencyButton.classList.add('emergency');
        if (emergency_name) {
            emergencyButton.classList.add(emergency_name);
        }
        emergencyButton.dataset.id = emergency.id;
        emergencyButton.dataset.name = emergency.name;

        // If button has image add for the emergency button
        if (emergency.id == 1 || emergency.id == 2 || emergency.id == 3) {
            let img = document.createElement('img');
            img.src = `./images/${emergency.name}.png`;
            emergencyButton.appendChild(img);
        }
    
        // Title for the emergency button
        let title = document.createElement('h2');
        title.innerHTML = `${emergency.name}`;
        emergencyButton.appendChild(title);

        // Add emergency to emergencyData
        emergencyData[emergency.id] = emergency;
        
        // // Append emergency to the actual HTML
        emergencies.appendChild(emergencyButton);
    }
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