

const key ='4ggZ99YfR7Lb0t4Sbx2KlwXAo4n4cGVC';

//get weather information

const getWeather = async (id) => {

	const base = 'https://dataservice.accuweather.com/currentconditions/v1/';
	// const base = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
	const query = `${id}?apikey=${key}`;

	const response = await fetch(base + query);


	const data = await response.json();

	// console.log(data[0].WeatherText);

	return data[0];


};

const getForeCast = async (id) => {

	// const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
	const base = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/';
	const query = `${id}?apikey=${key}`;

	const response = await fetch(base + query);


	const data = await response.json();



	return data;


};



// get city information
const getCity = async (city) => {

	const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
	//when adding query parameters we need to start with ? and use & when we query another one on it
	const query = `?apikey=${key}&q=${city}`;
	const response = await fetch(base + query);
	const data = await response.json();
	return data[0];

};

// getCity('houston')
// 	.then(data => {
// 		return getWeather(data.Key);
// 	}).then(data => {
// 		console.log(data);
// 	}).catch (error => console.log(error));









