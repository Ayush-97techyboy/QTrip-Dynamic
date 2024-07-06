import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const cityParams = new URLSearchParams(search);
  const cityID = cityParams.get("city");
  return cityID;
  // console.log(cityID)
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  console.log(city)
  // 1. Fetch adventures using the Backend API and return the data
  return fetch(`${config.backendEndpoint}/adventures/?city=${city}`)
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error fetching cities:", error);
      return null;
    });

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  // console.log(adventures)
   const container = document.querySelector("#data");

  // let divtag2 = document.createElement("div");

  adventures.forEach((ele) => {
    let divtag = document.createElement("div");

    divtag.classList = "col-6 col-lg-3 my-3";

    divtag.innerHTML = `
    <a href="detail/?adventure=${ele.id}" id = "${ele.id}">
  
        <div class="activity-card">
  
          <img src="${ele.image}" class ="activity-card img" alt="..." />
  
          <div class ="category-banner">${ele.category}</div>
          
          <div clas='adventure-text'>
  
          <ul class="d-flex justify-content-between align-items-center flex-md-row flex-sm-column flex-column list-unstyled w-100 ">
  
            <li class = 'mt-3 px-2'>${ele.name}</li>
  
            <li clas = 'mt-3 px-2'>${ele.currency} ${ele.costPerHead}</li>

            </ul>
  
          <ul class="d-flex justify-content-between align-items-center flex-md-row flex-sm-column flex-column list-unstyled w-100 p-2">
  
            <li class = 'mt-3 px-2'>Duration</li>
  
            <li class = 'mt-3 px-2'>${ele.duration} Hours</li>
          </ul>
  
        </div>
      </div>  
  
      </a>`;

    container.appendChild(divtag);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredForDur = list.filter((adventures) => {
    return (adventures.duration >= low) && (adventures.duration <=high)
  });
  console.log(filteredForDur)
  return filteredForDur;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered lisst
  let filterCat = list.filter((adventures) => {
    return categoryList.includes(adventures.category);
  });
  console.log(filterCat)
  return filterCat;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
    if(filters.duration.length && filters.category.length > 0){
      let filteredByArr = filterByCategory(list, filters.category)
      let spt = filters.duration.split('-');
      filteredByArr = filterByDuration(filteredByArr, parseInt(spt[0]), parseInt(spt[1]));
      return filteredByArr;
    } else if(filters.duration.length > 0){
      let spt = filters.duration.split('-');
      console.log(spt) 
      return filterByDuration(list, parseInt(spt[0]), parseInt(spt[1]));
    } else if(filters.category.length > 0) {
      return filterByCategory(list, filters.category)
    } 
  // Place holder for functionality to work in the Stubs
  return list;
}  

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  let filterDetailsInLocalStrg = JSON.stringify(filters)
  localStorage.setItem('filters',filterDetailsInLocalStrg)
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filtersFromStorage = localStorage.getItem('filters');
  if(filtersFromStorage) {
    return JSON.parse(filtersFromStorage)
  }
  
  // Place holder for functionality to work in the Stubs
  // console.log(getFiltersFromLocalStorage)
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let durationFilter = document.querySelector('#duration-select');
  durationFilter.value = filters.duration;

    let categoryPillsContainer = document.querySelector('#category-list')
    filters.category.forEach((catg) => {
        let div = document.createElement('div');
        div.classList = 'category-filter';
        div.textContent = catg;
        categoryPillsContainer.append(div);
      })
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
