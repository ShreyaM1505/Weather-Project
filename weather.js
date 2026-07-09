document.addEventListener('DOMContentLoaded',function(){
    let cityInput =document.getElementById("city-name")
    let Getweatherbutton = document.getElementById("get-weatherBtn")
    let InfoWeather = document.getElementById("weather-info")
    let CityName = document.getElementById("mycity-name")
    let Temperature = document.getElementById("temperature")
    let CityDiscription = document.getElementById("discription")
    let errorMessage = document.getElementById("error-message")
    const API_KEY = "460474a4d2bd5d5a6d29e87a642f6814"
    Getweatherbutton.addEventListener("click" ,async ()=>{
        const city = cityInput.value.trim();
        if(!city) return;
        try {
            let weatherData = await fetchWeatherData(city)
            displayWeatherData(weatherData)

        } catch (error) {
           getError();
        }
    })
    async function fetchWeatherData(city){
        const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const promise =  await fetch(url)
        const response = await promise.json();
        console.log(promise)
        // console.log(response)
        if(!promise.ok){
          getError()
        }
        return response;
    }
    function displayWeatherData(data){
        console.log(data)
        const{name ,main ,weather} = data;
        CityName.textContent=name;
        Temperature.textContent=`Temperature : ${main.temp}`;
        CityDiscription.textContent=`Condition : ${weather[0].description}`
        InfoWeather.classList.remove('hidden');
        errorMessage.classList.add('hidden');
       
    }

    function getError(){
        InfoWeather.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
})