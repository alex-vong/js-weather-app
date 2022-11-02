const body = document.querySelector('body');
const cityForm = document.querySelector('form');

const card = document.querySelector('.main-card');
const details = document.querySelector('.weather-details');

const errorMsg = document.querySelector('.error-msg');

const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const city = document.querySelector('.city');
const forecastUl = document.querySelector(".forecast ul");






const updateUI = (data) => {
    const cityDetails = data.cityDetails;
    const weather = data.weather;
    const forecast = data.forecast;

    let state = cityDetails.AdministrativeArea.CountryID === 'US' ? cityDetails.AdministrativeArea.ID : cityDetails.Country.EnglishName;


    const date = new Date(weather.LocalObservationDateTime);
    const dayOfWeek = date.toLocaleString("default", { weekday: "long" });

  card.innerHTML = `
       <div class="weather-card">
       		<div class="weather-icon">
	       		<picture>
		            <img src="images/icons/${weather.WeatherIcon}.svg" class="time card-img" alt="default city">
		        </picture>
	        	<h3 class="second-level-heading">${weather.WeatherText}</h3>
       		</div>

	        <div class="weather-details">
    			<p class="fourth-level-heading">${dayOfWeek}</p>
    			<h2 class="second-level-heading">${cityDetails.EnglishName}, ${state}</h2>
				<div class="temp-container main-temp">
				    <span class="body-copy">${weather.Temperature.Imperial.Value}&deg;</span>
				</div>
				<div class="hi-low">
					<span class="body-copy">H: ${forecast.DailyForecasts[0].Temperature.Maximum.Value}&deg;</span>
					<span class="body-copy">L: ${forecast.DailyForecasts[0].Temperature.Minimum.Value}&deg;</span>
				</div>
	        </div>
        </div>
	`;

    // let bodyImg = '';

    if (weather.IsDayTime) {
    	body.classList.remove('night-time');
    	body.classList.add('day-time');
    } else {
    	body.classList.add('night-time');
    	body.classList.remove('day-time');
    }


    errorMsg.style.display = 'none';
    card.style.display = 'flex';


    if (forecastUl.innerHTML) {
   		forecastUl.innerHTML = '';
	};


    forecast.DailyForecasts.forEach( day => {
    	

    	//capitlizie first word of each sentence
		const getDayConditions = day.Day.IconPhrase;
		const setDayCondition = getDayConditions.split(" ");

		for (let i = 0; i < setDayCondition.length; i++) {
		    setDayCondition[i] = setDayCondition[i][0].toUpperCase() + setDayCondition[i].substr(1);
		}
		const dayCondition = setDayCondition.join(" ");

		const getNightConditions = day.Night.IconPhrase;
		const setNightCondition = getNightConditions.split(" ");

		for (let i = 0; i < setNightCondition.length; i++) {
		    setNightCondition[i] = setNightCondition[i][0].toUpperCase() + setNightCondition[i].substr(1);
		}
		const nightCondition = setNightCondition.join(" ");
		
		const date = new Date(day.Date);
    	const dayOfWeek = date.toLocaleString("default", { weekday: "long" });
    	console.log(dayOfWeek);

    	const html = `
	    	<li>
	    		<p class="day-of-week"> ${dayOfWeek}</p>
	    		<section>
		    		<div class="day">
		    			<picture>
		    				<img src="images/icons/${day.Day.Icon}.svg" alt="weather icon by artist: @starline https://www.freepik.com/author/starline">
		    			</picture>	
		    			<div class="day-of-week-text">	
				    		<p>${dayCondition}</p>
				    		<p class='degrees'>H: ${day.Temperature.Maximum.Value}&deg</p>
			    		</div>
		    		</div>
		    		 <div class="night">
		    			<picture>
		    				<img src="images/icons/${day.Night.Icon}.svg" alt="weather icon">
		    			</picture>	
		    			<div class="day-of-week-text">	
				    		<p>${nightCondition}</p>
				    		<p class='degrees'>L: ${day.Temperature.Minimum.Value}&deg</p>
			    		</div>
		    		</div>
	    		</section>


	    	</li>
	    	`;
    	forecastUl.innerHTML += html;
    });
};



const updateCity = async (city) => {
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);
    const forecast = await getForeCast(cityDetails.Key);
    return {
        cityDetails: cityDetails,
        weather: weather,
        forecast: forecast
    };

};



cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset(); //reset city form after submit


    //update ui with new city
    updateCity(city)
        .then(data => {
            console.log(data);
            updateUI(data);
        })
        .catch(error => {
            console.log(error);
            card.style.display = 'none';
            errorMsg.style.display = 'flex';

        });
})