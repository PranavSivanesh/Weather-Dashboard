function getEmoji(condition){
    const emojis = {
        "Clear": "☀️",
        "Clouds": "☁️",
        "Rain": "🌧️",
        "Drizzle": "🌦️",
        "Thunderstorm": "⛈️",
        "Snow": "❄️",
        "Mist": "🌫️",
        "Fog": "🌫️"
    };
    return emojis[condition] || "🌡️";
}

document.getElementById("search").addEventListener("click", function(){
                const city= document.getElementById("city").value;
                const API_KEY = "6911ede542e054b5ad4f4bc6e7a72a42";
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById("city-name").textContent = data.name + ", " + data.sys.country;
                        document.getElementById("temperature").textContent = Math.round(data.main.temp) + "°C";
                        document.getElementById("condition").textContent = getEmoji(data.weather[0].main) + " " + data.weather[0].description;
                        document.getElementById("feels-like").textContent = Math.round(data.main.feels_like) + "°C";
                        document.getElementById("humidity").textContent = data.main.humidity + "%";
                        document.getElementById("wind").textContent = data.wind.speed + " m/s";
                        document.getElementById("weather-result").style.display = "block";
                    });
            });

document.getElementById("city").addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        document.getElementById("search").click();
    }
});
 