// List of categories and their corresponding classes
const categoryBackgrounds = {
    "calm music": "calm-music",
    "white noise": "white-noise",
    "ocean sounds": "ocean-sounds",
    "thunderstorm": "thunderstorm",
    "rainforest": "rainforest",
    "rain sounds": "rain-sounds",
    "country garden": "country-garden",
    "relaxing music": "relaxing-music",
    "meditation music": "meditation-music",
    "forest": "forest",
    "beach": "beach",
    "waterfalls": "waterfalls",
    "wind": "wind"
};

// Fetch music and update background
document.getElementById('fetch-music').addEventListener('click', () => {
    const category = document.getElementById('category-select').value;

    // Update background based on category
    document.body.className = ''; // Clear any previous classes
    if (categoryBackgrounds[category]) {
        document.body.classList.add(categoryBackgrounds[category]);
    }

    // Fetch music data from the backend
    fetch(`http://localhost:5000/api/music?category=${encodeURIComponent(category)}`)
        .then(response => response.json())
        .then(data => {
            const musicList = document.getElementById('music-list');
            musicList.innerHTML = ""; // Clear previous results

            if (data.error) {
                musicList.innerHTML = `<p>Error: ${data.error}</p>`;
            } else {
                data.forEach(track => {
                    const trackElement = document.createElement('div');
                    trackElement.className = "music-item";
                    trackElement.innerHTML = `
                        <h3>${track.title}</h3>
                        <audio controls>
                            <source src="${track.preview_url}" type="audio/mpeg">
                            Your browser does not support the audio element.
                        </audio>
                    `;
                    musicList.appendChild(trackElement);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching music:', error);
            const musicList = document.getElementById('music-list');
            musicList.innerHTML = `<p>Error fetching music. Please try again later.</p>`;
        });
});
