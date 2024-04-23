const apiKey = "d53fbe1b360d4f893c5323c63465b0dc";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=`;

const searchbox = document.querySelector(".search-part input");
const searchbtn = document.querySelector(".search-part button");
async function getCity(city) {
    try {
        const response = await fetch(`${apiUrl}${city}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        console.log(data);
        document.querySelector('.cityname').innerHTML = data.name; 
        document.querySelector(".temp").innerHTML = `Temperature: ${Math.round(data.main.temp - 273.15)}°C`;

        document.querySelector(".humi").innerHTML = `Humidity: ${data.main.humidity}%`;
        document.querySelector(".wind").innerHTML = `Wind Speed: ${Math.round(data.wind.speed * 3.6)} km/h`;
        document.querySelector(".pressure").innerHTML = `<span style="font-size: 26px;">Pressure: ${(data.main.pressure * 0.75006 / 760).toFixed(2)} atm</span>`;




        // document.querySelector(".weather_icon").innerHTML = `Weather Description: ${data.weather[0].description}`;
    
        const weatherDescription = data.weather[0].description.toLowerCase(); // Convert description to lowercase for easier comparison
        const weatherIcon = document.querySelector('.weather_icon');
        
        if (weatherDescription.includes('few clouds')||weatherDescription.includes('broken clouds') || weatherDescription.includes( 'scattered clouds')|| weatherDescription.includes('Partly cloudy')) {
            weatherIcon.src = "assets/Cloudy.png";
        } else if (weatherDescription.includes("clear sky") || weatherDescription.includes("clear")) {
            weatherIcon.src = 'assets/sunny.png';
        } else if (weatherDescription.includes("overcast clouds") ||weatherDescription.includes('light snow')) {
            weatherIcon.src = 'assets/mist.png';
        } else if (weatherDescription.includes("Dust")||weatherDescription.includes('Fog') ||weatherDescription.includes('Smoke') ) {
            weatherIcon.src = 'assets/dust.png';
        } else if (weatherDescription.includes("Rain") || weatherDescription.includes('Thunderstorm')) {
            weatherIcon.src = 'assets/rainy.png';
        } else if (weatherDescription.includes("dust") ||weatherDescription.includes('sand') || weatherDescription.includes('dust whirls')||weatherDescription.includes('sandstorm')) {
            weatherIcon.src = 'assets/dust.png';
        } else {
            weatherIcon.src = "assets/main-logo.png";
        }
    } catch (error) {
        console.error('An error occurred:', error);
        document.querySelector('.cityname').innerHTML = "incorrect city name"; 
    }
}


searchbtn.addEventListener("click", () => {
    const city = searchbox.value.trim();
    if (city !== '') {
        getCity(city);
    } else {
        alert('Please enter a city name');
    }
});
