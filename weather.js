const timeE1 = document.getElementById('time');
const dateE1 = document.getElementById('date');
const currentweatheritemsE1 = document.getElementById('currentweatheritems');
const timezone = document.getElementById('timezone');
const countryE1 = document.getElementById('country');
const weatherforcastE1 = document.getElementById('weatherforcast');
const currentTempE1 = document.getElementById('currenttemp');

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const months = ['January', 'february', 'March', 'April', ' May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December']

const API_KEY = "8c3aaf8222b95e7d1104dabd06b75d7e";

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12Hformat = hour >= 13 ? hour % 12 : hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'


    timeE1.innerHTML = hoursIn12Hformat + ':' + minutes + ' ' + `<span id="ampm"> ${ampm} </span>`
    dateE1.innerHTML = days[day] + ' ' + date + ' ' + months[month]
}, 1000);
getweatherdata()
function getweatherdata() {
    navigator.geolocation.getCurrentPosition((success) => {


        let { latitude, longitude } = success.coords;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutly&units=metric&appid=${API_KEY}`).then(res => res.json())
            .then(data => {
                console.log(data)
                showweatherdata(data);
            })


    })

}

function showweatherdata(data) {
    let { humidity, pressure, sunrise, sunset, wind_speed } = data.current;
    currentweatheritemsE1.innerHTML =
        `<div class="weatheritems">
                        <div>Humidity</div>
                        <div>${humidity}%</div>
                    </div>
                    <div class="weatheritems">
                        <div>pressure</div>
                        <div>${pressure} mb</div>
                    </div>
                    <div class="weatheritems">
                      <div>Wind-Speed</div>
                       <div>${wind_speed} m/s</div>
                    </div>
                    <div class="weatheritems">
                        <div>Sunrise</div>
                        <div>${window.moment(sunrise * 1000).format('HH:mma')}</div>
                    </div>

                    <div class="weatheritems">
                        <div>Sunset</div>
                        <div>${window.moment(sunset * 1000).format('HH:mma')} </div>
                    </div>
                    `;



    let otherdayforcast = ' '
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempE1.innerHTML =`
            <img src=" http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" class="wicon">
            <div class="others">${window.moment(day.dt*1000).format('ddd')}</div>
            <div class="temp">Day-${day.temp.day}&#176;C</div>
            <div class="temp">Night-${day.temp.night}&#176;C</div>
            
        </div>`


        } else {

            otherdayforcast += `
    <div class="weatherforcastitems">
    <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
    <img src=" http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png

" alt="weather icon" class="wicon">
    <div class="temp">Day-${day.temp.day}&#176;C</div>
    <div class="temp">Night-${day.temp.night}&#176;C</div>
    </div>
    `
        }
    })
   weatherforcastE1.innerHTML = otherdayforcast;
}