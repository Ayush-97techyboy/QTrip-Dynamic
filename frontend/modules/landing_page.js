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
  return fetch(`${config.backendEndpoint}/cities`)
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
  const imgDiv = document.createElement('div')
  const textDiv = document.createElement('tile-text')
  // const list = document.getElementById("div").classList;
  // list.add("tile-text");
  imgDiv.setAttribute('style',`background-image: url(${image}); width: 22%; height: 375px; background-size: cover; background-position: center center; margin: 10px; padding: 2px; color: white; border-radius: 8px;`)
  imgDiv.classList.add('col-lg-6');
  textDiv.setAttribute('style', `margin-top: 16rem; align-items: center`)
  const infoDiv = document.createElement('div')
  infoDiv.innerHTML = `<h1>${description}</h1>`
  imgDiv.append(infoDiv)
  container.append(imgDiv)
} 

export { init, fetchCities, addCityToDOM }
