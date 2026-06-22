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
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
                const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;


                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        if(data.cod === "404"){
                            document.getElementById("weather-result").style.display = "none";
                            document.getElementById("forecast").style.display = "none";
                            document.body.style.background = "linear-gradient(135deg, #1a1a2e, #16213e)";
                            alert("City not Found. Please try again!")
                            return;
                        }
                        document.querySelector('.intro').style.opacity = '0';
                        document.querySelector('.intro').style.pointerEvents = 'none';
                        document.querySelector('.intro').style.display = 'none';

                        document.getElementById("city-name").textContent = data.name + ", " + data.sys.country;
                        document.getElementById("temperature").textContent = Math.round(data.main.temp) + "°C";
                        document.getElementById("condition").textContent = getEmoji(data.weather[0].main) + " " + data.weather[0].description;
                        document.getElementById("feels-like").textContent = Math.round(data.main.feels_like) + "°C";
                        document.getElementById("humidity").textContent = data.main.humidity + "%";
                        document.getElementById("wind").textContent = data.wind.speed + " m/s";
                        const result = document.getElementById("weather-result");
                        result.style.animation = "none";
                        result.offsetHeight;
                        result.style.animation = "fadeIn 0.5s ease";
                        result.style.display = "block";

                        const condition = data.weather[0].main;
                        const backgrounds = {
                            "Clear": "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920')",
                            "Clouds": "url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1920')",
                            "Rain": "url('https://images.unsplash.com/photo-1428592953211-077101b2021b?w=1920')",
                            "Drizzle": "url('https://images.unsplash.com/photo-1428592953211-077101b2021b?w=1920')",
                            "Thunderstorm": "url('https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=1920')",
                            "Snow": "url('https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1920')",
                            "Mist": "url('https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?w=1920')"
                        };

                        const now = data.dt;
                        const sunrise = data.sys.sunrise;
                        const sunset = data.sys.sunset;
                        const isNight = now < sunrise || now > sunset;

                        const nightBackgrounds = {
                            "Clear": "url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920')",
                            "Clouds": "url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1920')",
                            "Rain": "url('https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=1920')",
                        };

                        if (isNight){
                            document.body.style.background = nightBackgrounds[condition] || "url('https://images.unsplash.com/photo-1475274047050-1d0c0975de51?w=1920')";
                        } else {
                            document.body.style.background = backgrounds[condition] || backgrounds["Clear"];
                        }
                        
                    });

                fetch(forecastUrl)
                    .then(response => response.json())
                    .then(forecast => {
                        const dailyForeCasts = forecast.list.filter(item => 
                            item.dt_txt.includes("12:00:00")
                        );
                        let forecastHTML = "";

                        dailyForeCasts.forEach(day => {
                            const date = new Date(day.dt * 1000).toLocaleDateString("en-US", {weekday: "short"});
                            const temp = Math.round(day.main.temp);
                            forecastHTML += `
                                <div class="forecast-item">
                                    <p>${date}</p>
                                    <p>${getEmoji(day.weather[0].main)}</p>
                                    <p>${temp}°C</p>
                                </div>
                            `;
                        });
                        document.getElementById("forecast-days").innerHTML = forecastHTML;
                        document.getElementById("forecast").style.display = "block";
                    });
            });

document.getElementById("city").addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        document.getElementById("search").click();
    }
});
 