let baseURL = 'https://api.nasa.gov/planetary/apod?api_key='
let apiKey = '61eQdUXEEdc4arFqiXMm0sevH7VNacxZkH1o2D7N';
const newPicture = document.getElementById('picture').value;  //enter date, explanation, title. I am not sure about this part- should this be in the code? Is it needed to fetch the NASA API?

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    // Select the actual value of an HTML input to include in POST
    const fav = document.getElementById('fav').value;

    getPictureDemo(baseURL, newPicture, apiKey)
    .then(function(data){   // the variable data declared in getAnimalDemo function

        console.log(data);
        postData('/addPicture', {date:data.date, title: data.title, explanation: data.explanation, hdurl: data.hdurl, fav:fav} ) //I want to get the NASA APOD API: https://api.nasa.gov/- what should I put in the {}?

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

const getPictureDemo = async (baseURL, picture, key)=>{
    //1.
    const res = await fetch(baseURL+picture+key)
    //2. Call Fake API
    //const res = await fetch('/fakePictureData')
    try {

        const data = await res.json();
        console.log(data)
        return data;
        // 1. We can do sth with our returned data here-- like chain promises

        // 2.
        // postData('/addAnimal', data)
    }   catch(error) {
        // appropriately handle the error
        console.log("error", error);
    }
}

/* Update UI Demo */
const updateUI = async () => {
    const request = await fetch('/all')
    try{
        const allData = await request.json()
        console.log(allData);
        document.getElementById('pictureDate').innerHTML = allData[0].date;
        document.getElementById('pictureFact').innerHTML = allData[0].explanation;
        document.getElementById('pictureTitle').innerHTML = allData[0].title;
        document.getElementById('pictureIMG').innerHTML = `<img src=${allData[0].hdurl} alt="NASA picture of the day" width="500" height="600"></img>`;
        document.getElementById('pictureFav').innerHTML = allData[allData.length-1].fav; // allData[0] will show first fav entry. allData[allData.length-1] will show last fav entry

    }catch(error){
        console.log("error", error)
    }
}