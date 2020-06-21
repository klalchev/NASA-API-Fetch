
/* CHAINED PROMISES TO GET AND POST DATA */

document.getElementById('generate').addEventListener('click', performAction)

function performAction(e){
    // Select the actual value of an HTML input to include in POST
    const fav = document.getElementById('fav').value;

// Faking an API call
getAnimal('/fakeAnimalData')
// New Syntax!
.then(function(data){
    // Add data
    console.log(data);
    postData('/addAnimal', {animal:data.animal, fact: data.fact, fav:fav} )

    // We can do this because of Async!
    updateUI()
})


}

/* POST Example */
const postData = async ( url = '', data = {})=>{
    //console.log(data);
    const response = await fetch(url, {
    method: 'POST', //*GET, POST, PUT, DELETE
    credentials: 'same-origin', //include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content- Type "
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
    console.log("error", error);
    //appropriately handle the error
    }
}


const getAnimal = async (url) =>{
    const res = await fetch(url)
    try {
        const data = await res.json();
        console.log(data);
        return data;
    }    catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }

}

/* Update UI Demo */
const updateUI = async () => {
    const request = await fetch('/all')
    try{
        const allData = await request.json()
        console.log(allData);
        document.getElementById('animalName').innerHTML = allData[0].animal;
        document.getElementById('animalFact').innerHTML = allData[0].facts;
        document.getElementById('animalFav').innerHTML = allData[allData.length-1].fav; // allData[0] will show first fav entry. allData[allData.length-1] will show last fav entry

    }catch(error){
        console.log("error", error)
    }
}