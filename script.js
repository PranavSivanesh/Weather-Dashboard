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
                        if(data.cod === "404"){
                            document.getElementById("weather-result").style.display = "none";
                            alert("City not Found. Please try again!")
                            return;
                        }
                        document.getElementById("city-name").textContent = data.name + ", " + data.sys.country;
                        document.getElementById("temperature").textContent = Math.round(data.main.temp) + "°C";
                        document.getElementById("condition").textContent = getEmoji(data.weather[0].main) + " " + data.weather[0].description;
                        document.getElementById("feels-like").textContent = Math.round(data.main.feels_like) + "°C";
                        document.getElementById("humidity").textContent = data.main.humidity + "%";
                        document.getElementById("wind").textContent = data.wind.speed + " m/s";
                        document.getElementById("weather-result").style.display = "block";

                        const condition = data.weather[0].main;
                        const gradients = {
                            "Clear": "linear-gradient(135deg, #1a1a2e, #1e3a5f)",
                            "Clouds": "linear-gradient(135deg, #2c2c3e, #4a4a6a)",
                            "Rain": "linear-gradient(135deg, #0f0f1a, #1a2a3a)",
                            "Drizzle": "linear-gradient(135deg, #1a1a2e, #2a3a4a)",
                            "Thunderstorm": "linear-gradient(135deg, #0a0a1a, #1a1a2a)",
                            "Snow": "linear-gradient(135deg, #1a1a2e, #2a3a5a)",
                            "Mist": "linear-gradient(135deg, #1a1a2e, #2a2a3a)"
                        };
                        document.body.style.background = gradients[condition] || "linear-gradient(135deg, #1a1a2e, #16213e)";
                    });
            });

document.getElementById("city").addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        document.getElementById("search").click();
    }
});
 