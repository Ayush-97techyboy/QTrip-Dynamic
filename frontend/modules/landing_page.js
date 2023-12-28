import config from "../conf/index.js";

async function init() {

  // console.log('From init()')
  // console.log('hello')
  console.log(config.backendEndpoint + '/cities')
  
 
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  // console.log('Cities Variable:', cities);
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }

}

//Implementation of fetch call
async function fetchCities() {
  // debugger;
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  return  fetch(`${config.backendEndpoint}/cities`)
  .then(response => response.json())
  .catch(error => {
    console.log('Error fetching cities:', error);
    return null;
  });
}

// fetchCities()


//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  console.log(id, city, description, image)
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const container = document.getElementById('data')
  let cityEl = document.createElement('div')
  cityEl.className = 'col-6 col-lg-3 mb-4 col-md-4'
  cityEl.innerHTML = `
                <a href="pages/adventures/?city=${id}" id="${id}">
                  <div class="tile">
                    <div class="tile-text text-center">
                      <h5>${city}</h5>
                      <p>${description}</p> 
                    </div>
                      <img class="img-responsive" src="${image}"/>
                  </div>
                </a>                           
  `
  container.append(cityEl)
} 

export { init, fetchCities, addCityToDOM }
