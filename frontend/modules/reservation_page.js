import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let fetching = await fetch (config.backendEndpoint + `/reservations/`)
    let reservations = await fetching.json()
    // console.log(reservations)
    return reservations
  }catch(error){
    console.log("Hey! Error caused while fetching data from the reservations")
  // Place holder for functionality to work in the Stubs
  return null;
    }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  let reservationTable = document.querySelector("#reservation-table")
console.log(reservations)
  //Conditionally render the no-reservation-banner and reservation-table-parent
  if (reservations.length === 0) {
    document.querySelector("#no-reservation-banner").style.display = "block";
    document.querySelector("#reservation-table-parent").style.display = "none";
} else if (reservations.length > 0) {
    document.querySelector("#no-reservation-banner").style.display = "none";
    document.querySelector("#reservation-table-parent").style.display = "block";
}

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */  

    reservations.forEach((reserve)=> {
    let dateComponents = reserve.date.split("-");
    let year = dateComponents[0];
    let month = parseInt(dateComponents[1], 10);
    let day = parseInt(dateComponents[2], 10);
    let givenDate = `${day}/${month}/${year}`;
    
    
    let giventime = new Date(reserve.time);
    
    let option = {
        day: 'numeric', 
        month: 'long',
        year: 'numeric',
        hour: 'numeric',  
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    };
    
    let formatTime = giventime.toLocaleString('en-IN', option);
    formatTime = formatTime.replace(' at', ',');
        let tr = document.createElement("tr")
        console.log(formatTime)
        tr.innerHTML = ` <td>${reserve.id}</td>
                         <td>${reserve.name}</td>
                         <td>${reserve.adventureName}</td>
                         <td>${reserve.person}</td>
                         <td>${givenDate}</td>
                         <td>${reserve.price}</td>
                         <td>${formatTime}</td>
                         <td><div class="reservation-visit-button" id="${reserve.id}">
                         <a href="../detail/?adventure=${reserve.adventure}">Visit Adventure</a></div></td>`
        reservationTable.append(tr)
      }
    )
  }

export { fetchReservations, addReservationToTable };
