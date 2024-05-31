// pembungkus content
const container = document.querySelector('main')

// searching
const boxInput = document.querySelector('#boxInput')
const btnSubmit = document.querySelector('#btnSubmit')

btnSubmit.addEventListener('click',function (e) {
    loading()
    const city = boxInput.value;
    searchCity(city)
})

async function searchCity(city){
    try {
        const result = await getWeather(city);
        const data = cardWeather(result);
        pushContent(data)
    } catch (error) {
        const cardErorr = ` <div id="erorr"><h5>${error}</h5></div>`
        pushContent(cardErorr)
    }
}

// api weather
function getWeather(city) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=4f02936380684eb7f2a8e9d8133e33c1`)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json();
    })
}

// loader
function loading() {
    const load = `
    <div class="loader-container">
        <div class="loader"></div>
    </div>
    `;
    pushContent(load)
}

// Card weather
function cardWeather(data) {
    const temp = Math.round(data.main.temp - 273.15);
    const date = new Date(data.dt * 1000)
    const hours = date.getHours()
    const minute = date.getMinutes()
    return `
    <div id="weather">
        <h3>${data.name}</h3>
        <h1 class="temperature">${temp}</h1>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" class="img-icon">
        <p>${data.weather[0].main}</p>
        <p>${data.weather[0].description}</p>
        <hr width="150px" style="margin-top: 10px;">
        <div class="time">
            <p>Time</p>
            <p>${hours} : ${minute}</p>
        </div>
    </div>`
}
function pushContent(content) {
    container.innerHTML = content;
}