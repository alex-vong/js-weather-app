const cityForm = document.querySelector('form');




const updateCity = async (city) => {

    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return {
        cityDetails: cityDetails,
        weather: weather
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
        })
        .catch(error => console.log(error));
})