import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const adventureParams = new URLSearchParams(search);
  const adventureID = adventureParams.get("adventure");
  console.log(adventureID)
  return adventureID;


  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID

async function fetchAdventureDetails(adventureId) {
  try {
    // 1. Fetch the details of the adventure by making an API call
    const response = await fetch(`${config.backendEndpoint}/adventures/detail/?adventure=${adventureId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch adventure details. Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching adventure details:', error);
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let adventureName = document.querySelector("#adventure-name")
  let adventureSubtitle = document.querySelector("#adventure-subtitle")
  let photoGallery = document.querySelector("#photo-gallery")
  // console.log(photoGallery)
  let adventureContent = document.querySelector("#adventure-content")


  adventureName.textContent = `${adventure.name}`
  adventureSubtitle.textContent = `${adventure.subtitle}`
  adventure.images.forEach((image)=>{
    let imgDiv = document.createElement("div")
    let img = document.createElement("img")
    img.classList = "activity-card-image"
    img.src = image
    imgDiv.append(img)
    photoGallery.append(imgDiv)
  })

  adventureContent.textContent = `${adventure.content}`
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGallery = document.querySelector("#photo-gallery")
  // innerImages.textContent = ""
  photoGallery.innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="inner-images">
   
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`
let innerImage = document.querySelector("#inner-images")
  images.forEach((image,index) => {
    let div = document.createElement("div")
    div.classList = "carousel-item"
    if(index === 0) {
      div.classList.add("active")
    }
    div.innerHTML = `<img src="${image}" class="d-block w-100 activity-card-image" alt="...">`
    innerImage.append(div)
  })

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let soldOut = document.querySelector("#reservation-panel-sold-out");
  let reservationAvailable = document.querySelector("#reservation-panel-available");
  let cost = document.querySelector("#reservation-person-cost");
  
  if (adventure.available) {
    reservationAvailable.style.display = "block"
    soldOut.style.display = "none"
    cost.textContent = adventure.costPerHead;
  } 
   else {
    soldOut.style.display = "block"
    reservationAvailable.style.display = "none"

  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let reservationCost = document.querySelector("#reservation-cost")
  let cost = adventure.costPerHead
  reservationCost.textContent = cost*persons
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let form = document.querySelector("#myForm")
form.addEventListener("submit",async(e) => {
  e.preventDefault()
  // console.log(form.elements)
  let {name, date, person} = form.elements
  let formData = {
    name : name.value,
    date : date.value,
    person : person.value,
    adventure : adventure.id
  }
  // console.log(formData)
  try {
    let response = await fetch(config.backendEndpoint + `/reservations/new`,{
      method : "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type" : "application/json"
      }
    })
    if(response.ok){
      alert("Success")
      location.reload()
    }
    else{
      alert("Failed!")
    }
  }catch(error){
    console.error("Error:", error);
    alert("An error occurred.");
  }
//   let json = await response.json()
// console.log(json)
})
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let reservationBanner = document.querySelector("#reserved-banner");
  
    if (adventure.reserved) {
      // Show the reserved-banner if the adventure is already reserved
      reservationBanner.style.display = "block";
    } else {
      // Hide the reserved-banner if the adventure is not reserved
      reservationBanner.style.display = "none";
    }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
