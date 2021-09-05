const inputField = document.getElementById('input-field')
const searchButton = document.getElementById('search-btn');
const countryContainer = document.getElementById('country-container')
const errorMsg = document.getElementById('error')
const countryDetails = document.getElementById('country-details')
const spinnerAdd = document.getElementById('spinner')

searchButton.addEventListener('click',function(){
    const search = inputField.value;
    countryContainer.innerHTML = "";
    
    if(search === ''){
        //clear the error msg
        errorMsg.innerHTML = `
        <h4 style="color: red; text-align: center;">Please Enter The Value Of Search Field</h4>
        `
        alert('Please Enter The Value Of Search Field')
        return;
    }

    // clear dom 
    countryContainer.innerHTML = "";
    // clear search field 
    inputField.value = "";
    //clear the details
    countryDetails.innerHTML = '';


    const url = `https://restcountries.eu/rest/v2/name/${search}`;
    spinnerAdd.classList.remove('d-none')
    fetch(url)    
    .then(res => res.json())
    .then(data => showData(data))           //data parameter is the RealValue       
});

   //Data Responce Array Type [ {}, {}, {}] --- map, forof, forEach

const showData = (countryArray) => {        //reseive the parameter damiValue
    
        //Error handling 
        if (countryArray.status === 404) {
            errorMsg.innerHTML = `
                <h2 style="color: red; text-align: center;">${countryArray.status}</h2>
                <h5 style="color: red; text-align: center;">${countryArray.message}</h5>
            `
        }
        else{
            errorMsg.innerText = '';
        }

      
        //index এর হিসাব নিজে নিজেই করে দেয়।
        //ফর লুপ যেহেতু, যত গুলা  এলিমেন্ট, ততবার রিপিট হবে। 

        countryArray.forEach(item => {  
        
            const div = document.createElement('div')
            div.classList.add('col-md-3', 'col-12')
            div.innerHTML = `
            
            <div class="rounded overflow-hidden border p-2">
                <img src="${item.flag}" class="w-100 shadow">
            </div>
            <div class="py-2 d-flex justify-content-between align-items-center d-md-block text-md-center ">
                  <h2 class="mb-3">${item.name}</h2>
                  <button class="btn btn-dark" onclick="showDetails('${item.alpha3Code}')">Learn More</button>
            </div>
        `
        countryContainer.appendChild(div)
        spinnerAdd.classList.add('d-none')

    })
};

const showDetails = (alpha3Code) => {
    fetch(`https://restcountries.eu/rest/v2/alpha/${alpha3Code}`)
    .then(res => res.json())
    .then(data =>{
        const currenciesDetailes = data.currencies[0];

        countryDetails.innerHTML = `
        
        <div class="col-md-12">
               <h1>${data.name}</h1>
               <p>Capital : ${data.capital}</p>
               <p>Currency Name : ${currenciesDetailes.name}</p>
               <p>Currency symbol : ${currenciesDetailes.symbol}</p>
        </div>
        
        `
    })
}

