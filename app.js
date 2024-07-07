// app.js
// Initialize the map
const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Voice recognition setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;
let recognizing = false;

recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    handleVoiceCommand(command);
};

recognition.onend = () => {
    if (recognizing) {
        recognition.start(); // Restart recognition if it's still active
    }
};

// Toggle voice recognition with button
document.getElementById('voice-toggle').addEventListener('click', () => {
    if (recognizing) {
        recognition.stop();
        recognizing = false;
        document.getElementById('voice-toggle').innerText = 'Start Voice Recognition';
    } else {
        recognition.start();
        recognizing = true;
        document.getElementById('voice-toggle').innerText = 'Stop Voice Recognition';
    }
});

function handleVoiceCommand(command) {
    if (command.includes('zoom in')) {
        map.zoomIn();
    } else if (command.includes('zoom out')) {
        map.zoomOut();
    } else if (command.includes('show restaurants')) {
        showRestaurants();
    }
}

function showRestaurants() {
    const restaurants = [
        { lat: 51.505, lon: -0.09, name: 'Restaurant 1' },
        { lat: 51.51, lon: -0.1, name: 'Restaurant 2' },
        { lat: 51.51, lon: -0.08, name: 'Restaurant 3' },
    ];

    restaurants.forEach(restaurant => {
        L.marker([restaurant.lat, restaurant.lon]).addTo(map)
            .bindPopup(restaurant.name)
            .openPopup();
    });
}
