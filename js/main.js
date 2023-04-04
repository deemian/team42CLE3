window.addEventListener('load', init);

//Global variables
let fetchUrl = (window.location.href + 'webservice/index.php');
let emergencies;
let back;
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

    back = document.getElementById('back');
    back.addEventListener('click', backClickHandler)
    
    // Get selected info of the emergencies
    let selectedInfoString = localStorage.getItem('selectedInfo');
    if (selectedInfoString !== null) {
        selectedInfo = JSON.parse(selectedInfoString);
    }

    getData();
}

/**
 * Handler for when the back button is clicked
 * 
 * @param e 
 */
function backButtonHandler(e) {
    selectedInfo.pop();
    localStorage.setItem('selectedInfo', JSON.stringify(selectedInfo));
    
    back.innerHTML = "";
    emergencies.innerHTML = "";

    let backfetchUrl;
    if (selectedInfo.length - 1 == -1) {
        backfetchUrl = fetchUrl;
    } else {
        let emergency = selectedInfo[selectedInfo.length - 1];
        backfetchUrl = (fetchUrl + '?id=' + emergency.id);
    }
    
    fetch(backfetchUrl)
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
 * Handler for when a back-button is clicked
 * 
 * @param e 
 */
function backClickHandler(e) {
    let clickedItem;

    if (e.target.nodeName == "BUTTON" && e.target.classList.contains('back')) {
        clickedItem = e.target;
    } else {
        return;
    }

    if (clickedItem.classList.contains('back')) {
        backButtonHandler(e);
    } else {
        return;
    }
}

/**
 * Handler for when the send button is clicked
 * 
 * @param e 
 */
function sendButtonHandler() {
    emergencies.innerHTML = "";

    let emergencyDiv = document.createElement('div');

    emergencyDiv.classList.add('send-emergency');

    // Title for the emergency div
    let title = document.createElement('h2');
    title.innerHTML = `Hulpdiensten​ worden ingelicht!`;
    emergencyDiv.appendChild(title);

    // Text for the emergency div
    let text = document.createElement('p');
    text.innerHTML = `We zullen zo spoedig mogelijk bij u zijn.`;
    emergencyDiv.appendChild(text);

    // // Append emergency to the actual HTML
    emergencies.appendChild(emergencyDiv);
}

/**
 * Handler for when the submit button is clicked
 * 
 * @param e 
 */
function submitButtonHandler() {
    selectedInfo[1].name = document.getElementById('edit').value;
    
    back.innerHTML = "";
    emergencies.innerHTML = "";

    let submitfetchUrl;
    if (selectedInfo.length - 1 == -1) {
        submitfetchUrl = fetchUrl;
    } else {
        let emergency = selectedInfo[selectedInfo.length - 1];
        submitfetchUrl = (fetchUrl + '?id=' + emergency.id);
    }
    
    fetch(submitfetchUrl)
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
 * Handler for when the edit button is clicked
 * 
 * @param e 
 */
function editButtonHandler() {
    emergencies.innerHTML = "";

    let emergencyDiv = document.createElement('div');

    emergencyDiv.classList.add('send-emergency');

    // Title for the emergency div
    let label = document.createElement('label');
    label.innerHTML = `Specificeer het noodgeval:`;
    emergencyDiv.appendChild(label);

    // Text for the emergency div
    let input = document.createElement('input');
    input.id = "edit";
    input.type = "text";
    input.value = selectedInfo[1].name;
    emergencyDiv.appendChild(input);

    let submitButton = document.createElement('button');
    submitButton.classList.add('submit');
    submitButton.innerHTML = "Veranderen";
    emergencyDiv.appendChild(submitButton);

    // // Append emergency to the actual HTML
    emergencies.appendChild(emergencyDiv);

    let sendButton = document.createElement('button');
    sendButton.classList.add('send');
    sendButton.innerHTML = "Versturen";
    emergencies.appendChild(sendButton);
}

/**
 * Handler for when the emergency button is clicked
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

    selectedInfo.push(emergency);
    localStorage.setItem('selectedInfo', JSON.stringify(selectedInfo));
    
    back.innerHTML = "";
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
 * Handler for when an emergency-button is clicked
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
    } else if (e.target.nodeName == "BUTTON" && (e.target.classList.contains('edit') || e.target.classList.contains('submit') || e.target.classList.contains('send'))) {
        clickedItem = e.target;
    } else {
        return;
    }
    
    if (clickedItem.classList.contains('emergency')) {
        emergencyButtonHandler(e);
    } else if (clickedItem.nodeName == "BUTTON") {
        if (clickedItem.classList.contains('edit')) {
            editButtonHandler();
        } else if (clickedItem.classList.contains('submit')) {
            submitButtonHandler();
        } else if (clickedItem.classList.contains('send')) {
            sendButtonHandler();
        } else {
            return;
        }
    } else {
        return;
    }
}

/**
 * AJAX-call to retrieve emergencies from the API
 */
function getData()
{
    let fullFetchUrl;
    if (selectedInfo.length - 1 == -1) {
        fullFetchUrl = fetchUrl;
    } else {
        let emergency = selectedInfo[selectedInfo.length - 1];
        fullFetchUrl = (fetchUrl + '?id=' + emergency.id);
    }

    fetch(fullFetchUrl)
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
    // Check to add back-button
    if (selectedInfo.length - 1 !== -1) {
        let backButton = document.createElement('button');
        backButton.classList.add('back');
        backButton.innerHTML = "Terug";
        back.appendChild(backButton);
    }

    // Check if data is first array
    let emergency_category = false;
    if (typeof data.length === 'undefined') {
        emergency_category = data["name"];
        data = data["options"];
    }
    
    // Loop through the list of emergencies
    if (data !== "send") {
        for (let x = 0; x < data.length; x++) {
            const emergency = data[x];
            // // Wrapper element for every emergency button. We need the wrapper now, because adding it later
            // // will result in the emergency being ordered based on the load times of the API instead of chronically
            let emergencyButton = document.createElement('div');
            
            // Add attributes to the emergency button
            emergencyButton.classList.add('emergency');
            if (emergency_category) {
                emergencyButton.classList.add(emergency_category);
            } else {
                emergencyButton.classList.add(emergency.name);
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
    } else {
        let emergencyDiv = document.createElement('div');

        emergencyDiv.classList.add('send-emergency');

        // Title for the emergency div
        let title = document.createElement('h2');
        title.innerHTML = `U heeft de ${selectedInfo[0].name} nodig om deze reden: "${selectedInfo[1].name}"`;
        emergencyDiv.appendChild(title);

        // Text for the emergency div
        let text = document.createElement('p');
        text.innerHTML = `Wilt u het noodgeval bewerken?`;
        emergencyDiv.appendChild(text);

        // // Append emergency to the actual HTML
        emergencies.appendChild(emergencyDiv);

        let editButton = document.createElement('button');
        editButton.classList.add('edit');
        editButton.innerHTML = "Ja";
        emergencies.appendChild(editButton);

        let sendButton = document.createElement('button');
        sendButton.classList.add('send');
        sendButton.innerHTML = "Nee, versturen";
        emergencies.appendChild(sendButton);
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