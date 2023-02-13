const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const days = ['Duminica', 'Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata']
const months = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

//const API_KEY = 'd0acb85066607cda4a9600dd25bb841d';
const API_KEY = 'e2c46abe48c1f489d20593766f20b1f9'

setInterval(() => {
    const time = new Date();

    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour
    const ampm = hour >= 12 ? 'PM' : 'AM'

    timeEl.innerHTML = hoursIn12HrFormat + ':' + minutes + ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]

}, 1000)

getWeatherData()
function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {


        let { latitude, longitude } = success.coords;
        // apiVechi = 
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {


            console.log(data)
            showWeatherData(data);
        })


    })
}



function showWeatherData(data) {
    let { humidity, pressure } = data.main;
    let { speed } = data.wind;
    let { sunrise, sunset } = data.sys;
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var dateSunr = new Date(sunrise * 1000);
    // Hours part from the timestamp
    var hours = dateSunr.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + dateSunr.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + dateSunr.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var dateSuns = new Date(sunset * 1000);
    // Hours part from the timestamp
    var hours = dateSuns.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + dateSuns.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + dateSuns.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime2 = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    currentWeatherItemsEl.innerHTML =
        `<div class="weather-item">
                        <div>Humidity</div>
                        <div>${humidity}%</div>
                    </div>

    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    
    <div class="weather-item">
        <div>Wind-speed</div>
        <div>${speed}</div>
    </div>
    <div class="weather-item">
        <div>Sunrise</div>
        <div>${formattedTime}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${formattedTime2}</div>
    </div>`;



    currentTempEl.innerHTML = `
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="other">
                <div class="day">Monday</div>
                <div class="temp">Night - 25.6&#176; C</div>
                <div class="temp">Day - 35.6&#176; C</div>`

    let otherDayForecast = `pl`;





}



