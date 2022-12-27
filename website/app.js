/* Global Variables */
// add API key to app.js file instead of hiding it as stated in project requirements
const apiKey = "f8ee7a111b1c5b2a89314e7262b539da&units=imperial";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const countryCode = ",us&appid=";

// Create a new date instance dynamically with JS
function getDate() {
    let d = new Date();
    return (d.getMonth() + 1)+'.'+ d.getDate()+'.'+ d.getFullYear();
}

const getWeatherFromApi = async() => {
    const zip = document.getElementById('zip').value;
    if(zip === undefined || zip.trim() === '') {
        alert("Invalid input! Please enter a valid zipcode!");
        return;
    }
    const result = await fetch(baseUrl + zip + countryCode + apiKey)
    try {
        const data = await result.json();
        return data;
    } catch(error) {
        console.log("error", error);
    }
};

const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    
    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log("error", error);
    }
};

const updateView = async(url = '') => {
    const request = await fetch(url)
    try {
        const data = await request.json();
        document.getElementById('date').innerHTML = "Date: " + data.date;
        document.getElementById('temp').innerHTML = "Temperature: " + data.temperature + ' degrees';
        document.getElementById('content').innerHTML = "Feelings: " + data.userResponse;
    } catch(error) {
        console.log("error", error);
    }
};

function onGenerateClicked(event) {
    event.preventDefault();
    getWeatherFromApi()
    .then(function(data) {
        const newData = {
            'temperature': data.main.temp,
            'date': getDate(),
            'userResponse': document.getElementById('feelings').value
        }
        postData('http://localhost:8001/entry', newData);
    }).then(function () {
        updateView('http://localhost:8001/all')
    })
}

document.getElementById('generate').addEventListener('click', onGenerateClicked);