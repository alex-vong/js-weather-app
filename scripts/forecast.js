

const key ='TeuDOLkbymophzzLh4h82qKtwXGHLGKA';

//get weather information

const getWeather = async (id) => {

	const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
	const query = `${id}?apikey=${key}`;

	const response = await fetch(base + query);

	const data = await response.json();

	// console.log(data);
	// console.log(data[0].WeatherText);

	return data[0];

};








// get city information
const getCity = async (city) => {

	const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
	//when adding query parameters we need to start with ? and use & when we query another one on it
	const query = `?apikey=${key}&q=${city}`;

	const response = await fetch(base + query);

	const data = await response.json();

	// console.log(data[0]);
	return data[0];

};

// getCity('cypress')
// 	.then(data => {
// 		return getWeather(data.Key);
// 	}).then(data => {
// 		console.log(data);
// 	}).catch (error => console.log(error));









