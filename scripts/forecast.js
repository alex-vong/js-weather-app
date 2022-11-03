

const key ='S3GDCvBxA9xl4gX3UU0GxvEl2eablGC7';

//get weather information

const getWeather = async (id) => {
	const base = 'https://dataservice.accuweather.com/currentconditions/v1/';
	const query = `${id}?apikey=${key}`;
	const response = await fetch(base + query);
	const data = await response.json();

	return data[0];

};

const getForeCast = async (id) => {
	const base = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/';
	const query = `${id}?apikey=${key}`;
	const response = await fetch(base + query);
	const data = await response.json();
	return data;
};



// get city information

//getCity function gets called on line 44 and takes in 'houston' as parameter
const getCity = async (city) => { //callback asynchronous function taking in 'houston' as 'city' parameter
	const base = 'https://dataservice.accuweather.com/locations/v1/cities/search'; //saving request url in a variable
	//when adding query parameters we need to start with ? and use & when we query another one on it
	const query = `?apikey=${key}&q=${city}`; //assigning api key and city into a query variable
	const response = await fetch(base + query); //callback function using await operator to get back a promise
	const data = await response.json(); //convert the promise into json and assign it to a variable 'data';

	return data[0]; //return data

};


// getCity('houston, bc') //call getCity function and pass in 'houston'
// 	.then(data => { //data gets returned from getCity function
// 		return getWeather(data.Key);
// 	}).then(data => {
// 		console.log(data);
// 	}).catch (error => console.log(error));





