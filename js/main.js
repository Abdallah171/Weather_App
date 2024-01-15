let todayName = document.getElementById('today-day-name')
let todayNumber = document.getElementById('today-day-number')
let todayMonth = document.getElementById('today-day-month')
let todayLocation = document.getElementById('today-location')
let todayTemp = document.getElementById('today-temp')
let todayImg = document.getElementById('today-temp-img')
let todayCondition = document.getElementById('today-condition')
let humidity = document.getElementById('humidity')
let wind = document.getElementById('wind')
let windDirection = document.getElementById('wind-direction')


let nextDay = document.getElementsByClassName('next-day-name')
let nextImg = document.getElementsByClassName('next-temp-img')
let nextMaxTemp = document.getElementsByClassName('next-max-temp')
let nextMinTemp = document.getElementsByClassName('next-min-temp')
let nextCondition = document.getElementsByClassName('next-condition-text')

let searchInput = document.getElementById('search-input')
let searchBtn = document.getElementById('search-input')

let date = new Date()




async function getWeather(cityName) {
    let weatherRespons = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2ccaea7c1ff74448aa823637241401&q=${cityName}&days=3`)
    let weatherData = await weatherRespons.json()
    return weatherData
}
// getWeather()


//display today data
function displayToday(data) {
    todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString("en-US", { weekday: "long" })
    todayNumber.innerHTML = date.getDate()
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-US", { month: "long" })
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c
    todayImg.setAttribute("src", data.current.condition.icon)
    todayCondition.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity
    wind.innerHTML = data.current.wind_kph
    windDirection.innerHTML = data.current.wind_dir

}

//display next day data
function displayNext(data) {

    let forecastData = data.forecast.forecastday

    for (let i = 0; i < 2; i++) {

        let nextDate = new Date(forecastData[i + 1].date)
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US", { weekday: "long" })

        nextMaxTemp[i].innerHTML = forecastData[i + 1].day.maxtemp_c
        nextMinTemp[i].innerHTML = forecastData[i + 1].day.mintemp_c
        nextImg[i].setAttribute("src", forecastData[i + 1].day.condition.icon)
        nextCondition[i].innerHTML = forecastData[i + 1].day.condition.text

    }

}



//Start App
async function startApp(city = "cairo") {
    let weatherData = await getWeather(city)
    if (!weatherData.error) {
        displayToday(weatherData)
        displayNext(weatherData)
    }

}
startApp()


searchInput.addEventListener("input", function() {
    startApp(searchInput.value)
})