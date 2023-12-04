// const API_URL = `https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0`

// const previousWeatherToggle = document.querySelector('.container');
// const previousWeather = document.querySelector('.previous-weather')

// const currentSolElement = document.querySelector('[data-current-sol]')
// const currentDateElement = document.querySelector('[data-current-date]')
// const currentTempHighElement = document.querySelector('[data-current-temp-high]')
// const currentTempLowElement = document.querySelector('[data-current-temp-low]')
// const windSpeedElement = document.querySelector('[data-wind-speed]')
// const windDirectionText = document.querySelector('[data-wind-direction-text]')
// const windDirectionArrow = document.querySelector('[data-wind-direction-arrow]')

// const previousSolTemplate = document.querySelector('[data-previous-sol-template]')
// const previousSolContainer = document.querySelector('[data-previous-sols]')

// const unitToggle = document.querySelector('[data-unit-toggle]')
// const metricRadio = document.getElementById('cel')
// const imperialRadio = document.getElementById('fah')

// previousWeatherToggle.addEventListener('click', () => {
// 	previousWeather.classList.toggle('show-weather')
// })

// let selectedSolIndex

// getWeather().then(sols => {
// 	selectedSolIndex = sols.length - 1
// 	displaySelectedSol(sols)
// 	displayPreviousSols(sols)
// 	updateUnits()

// 	unitToggle.addEventListener('click', () => {
// 		let metricUnits = !isMetric()
// 		metricRadio.checked = metricUnits
// 		imperialRadio.checked = !metricUnits
// 		displaySelectedSol(sols)
// 		displayPreviousSols(sols)
// 		updateUnits()
// 	})

// 	metricRadio.addEventListener('change', () => {
// 		displaySelectedSol(sols)
// 		displayPreviousSols(sols)
// 		updateUnits()
// 	})

// 	imperialRadio.addEventListener('change', () => {
// 		displaySelectedSol(sols)
// 		displayPreviousSols(sols)
// 		updateUnits()
// 	})
// })

// function displaySelectedSol(sols) {
// 	const selectedSol = sols[selectedSolIndex]
// 	currentSolElement.innerText = selectedSol.sol
// 	currentDateElement.innerText = displayDate(selectedSol.date)
// 	currentTempHighElement.innerText = displayTemperature(selectedSol.maxTemp)
// 	currentTempLowElement.innerText = displayTemperature(selectedSol.minTemp)
// 	windSpeedElement.innerText = displaySpeed(selectedSol.windSpeed)
// 	windDirectionArrow.style.setProperty('--direction', `${selectedSol.windDirectionDegrees}deg`)
// 	windDirectionText.innerText = selectedSol.windDirectionCardinal
// }

// function displayPreviousSols(sols) {
// 	previousSolContainer.innerHTML = ''
// 	sols.forEach((solData, index) => {
// 		const solContainer = previousSolTemplate.content.cloneNode(true)
// 		solContainer.querySelector('[data-sol]').innerText = solData.sol
// 		solContainer.querySelector('[data-date]').innerText = displayDate(solData.date)
// 		solContainer.querySelector('[data-temp-high]').innerText = displayTemperature(solData.maxTemp)
// 		solContainer.querySelector('[data-temp-low]').innerText = displayTemperature(solData.minTemp)
// 		solContainer.querySelector('[data-select-button]').addEventListener('click', () => {
// 			selectedSolIndex = index
// 			displaySelectedSol(sols)
// 		})
// 		previousSolContainer.appendChild(solContainer)
// 	})
// }

// function displayDate(date) {
// 	return date.toLocaleDateString(
// 		undefined,
// 		{ day: 'numeric', month: 'long' }
// 	)
// }

// function displayTemperature(temperature) {
// 	let returnTemp = temperature
// 	if (!isMetric()) {
// 		returnTemp = (temperature - 32) * (5 / 9)
// 	}
// 	return Math.round(returnTemp)
// }

// function displaySpeed(speed) {
// 	let returnSpeed = speed
// 	if (!isMetric()) {
// 		returnSpeed = speed / 1.609
// 	}
// 	return Math.round(returnSpeed)
// }


// function getWeather() {
// 	return fetch(API_URL)
// 		.then(res => res.json())
// 		.then(data => {
// 			const {
// 				sol_keys,
// 				validity_checks,
// 				...solData
// 			} = data
// 			return Object.entries(solData).map(([sol, data]) => {
// 				return {
// 					sol: sol,
// 					maxTemp: data.AT.mx,
// 					minTemp: data.AT.mn,
// 					windSpeed: data.HWS.av,
// 					windDirectionDegrees: data.WD.most_common.compass_degrees,
// 					windDirectionCardinal: data.WD.most_common.compass_point,
// 					date: new Date(data.First_UTC)
// 				}
// 			})
// 		})
// }

// function updateUnits() {
// 	const speedUnits = document.querySelectorAll('[data-speed-unit]')
// 	const tempUnits = document.querySelectorAll('[data-temp-unit]')
// 	speedUnits.forEach(unit => {
// 		unit.innerText = isMetric() ? 'kph' : 'mph'
// 	})
// 	tempUnits.forEach(unit => {
// 		unit.innerText = isMetric() ? 'C' : 'F'
// 	})
// }

// function isMetric() {
// 	return metricRadio.checked
// }

// -_- ----------------------------------------------------------
const apiKey = "OfzgBPXMt4Ao8IW5gKBFIePSEzUtHzhsIQV5M8oS";
const apodUrl = "https://api.nasa.gov/planetary/apod";
const afeedUrl = "https://api.nasa.gov/neo/rest/v1/feed";


function handleAFeedData({element_count, near_earth_objects}, afeedElement, afeedTable){
    

    afeedElement.innerHTML = Object.keys(near_earth_objects).map(date=>{
        return near_earth_objects[date].map(asteroid=>{
            const id        = asteroid.id;
            const name      = asteroid.name;
            const dangerous = asteroid.is_potentially_hazardous_asteroid;
            const magnitude = asteroid.absolute_magnitude_h;
            const min       = asteroid.estimated_diameter.meters.estimated_diameter_min;
            const max       = asteroid.estimated_diameter.meters.estimated_diameter_max;
            const close_approach_data = asteroid.close_approach_data.shift();
            const miss_distance = close_approach_data.miss_distance.kilometers;

            return `<tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${dangerous ? "YES" : "NO"}</td>
                <td>${magnitude}</td>
                <td>${min}</td>
                <td>${max}</td>
                <td>${miss_distance}</td>
                <td>${date}</td>
            </tr>`

        }).join("");

    }).join("");

    if(afeedElement.innerHTML === ""){
        afeedTable.className = "striped hide"
    } else{
        afeedTable.className = "striped";
    }


}

function contentLoaded(){
    const apodElement = document.getElementById("apod");
    const startElement = document.getElementById("start");
    const afeedElement = document.getElementById("afeed");
    const afeedTable   = document.getElementById("afeedTable");

    /** Apod */

    fetch(`${apodUrl}?api_key=${apiKey}`)
    .then(res=>res.json())
    .then(data=>{

        let media = "";
        if(data.media_type === "image"){
            media = `<img class="responsive-img" src="${data.hdurl}">`
        } else {
            media = `<div class="video-container">
                        <iframe src="${dat.hdurl}" width="560" height="315"></iframe>
                    </div>`
        }

        apodElement.innerHTML = (`
            <div class="card-image">
                ${media}
                <span class="card-title">${data.title}</span>
            </div>
            <div class="card-content">
                <p>
                    ${data.explanation}
                </p>

                <p>${(new Date(data.date)).toDateString()}</p>
                <p>© ${data.copyright}</p>
            </div>
            <div class="card-action">
                <a target="_blank" href="https://www.nasa.gov/">Find more @ Nasa</a>
            </div>
        `)
    }).catch(handleError);

    /** Asteroid Feed */
    const elems = document.querySelectorAll('.datepicker');
    const instances = M.Datepicker.init(elems, {
        autoClose: true,
        defaultDate: new Date(),
        format: 'yyyy-mm-dd'
    });

    start.addEventListener("change", function(){

        fetch(`${afeedUrl}?start_date=${this.value}&api_key=${apiKey}`)
        .then(res=>res.json())
        .then(data=>handleAFeedData(data, afeedElement, afeedTable))
        .catch(handleError);

        console.log(this.value);
    })

}


function handleError(error){
    console.warn(error.message);
}





window.addEventListener("DOMContentLoaded", contentLoaded)