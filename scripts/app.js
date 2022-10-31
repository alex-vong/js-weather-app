const body = document.querySelector('body');
const cityForm = document.querySelector('form');

const card = document.querySelector('.weather-card');
const details = document.querySelector('.weather-details');

const errorMsg = document.querySelector('.error-msg');

const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');






const updateUI = (data) => {
    const cityDetails = data.cityDetails;
    const weather = data.weather;


    //update details template

    // let state = '';
    // if (cityDetails.AdministrativeArea.CountryID === 'US') {
    //     // state = cityDetails.AdministrativeArea.EnglishName;
    //     state = cityDetails.AdministrativeArea.ID;
    // } else {
    //     state = cityDetails.Country.EnglishName;

    // }

    let state = cityDetails.AdministrativeArea.CountryID === 'US' ? cityDetails.AdministrativeArea.ID : cityDetails.Country.EnglishName;

      details.innerHTML = `
				<h3 class="fourth-level-heading">${cityDetails.EnglishName}, ${state}</h3>
				<h4 class="body-copy">${weather.WeatherText}</h4>
				<div class="temp-container fourth-level-heading">
				    <span class="body-copy">${weather.Temperature.Imperial.Value}</span>
				    <span class="body-copy">&deg;${weather.Temperature.Imperial.Unit}</span>
				</div>

	`;

	let timeSrc = `images/icons/${weather.WeatherIcon}.svg`;

	let bodyImg = null;

	if(weather.IsDayTime) {
		// timeSrc = 'images/icons/day-time-mobile.svg';
		console.log('daytime');
		bodyImg = 'images/day-time-mobile.svg';
	} else {
		// timeSrc = 'images/icons/night-time-mobile.svg';
		bodyImg = 'images/night-time-mobile.svg';
		console.log('nighttime');
	};

	// let bodyImg = weather.IsDayTime ? 'images/day-time-mobile.svg' : 'images/night-time-mobile.svg';
	// console.log(bodyImg);
	// console.log(typeof bodyImg);



	// body.style.backgroundImage = "url('../images/icons/day-time-mobile.svg')";
 	body.style.backgroundImage = `url('${bodyImg}')`;

	time.setAttribute('src', timeSrc);

	
	// const iconSrc = `images/icons/${weather.WeatherIcon}.svg`;

	// icon.setAttribute('src', iconSrc);
	
    errorMsg.style.display = 'none';
    card.style.display = 'flex';


}



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
















