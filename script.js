'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg){
  countriesContainer.insertAdjacentText('beforeend',msg)
//   countriesContainer.style.opacity = 1
}
///////////////////////////////////////

//Ajax calls
/*
function getCountry(name){
const request = new XMLHttpRequest()

request.open('GET',https://restcountries.com/v3.1/name/${name})

request.send()

request.addEventListener('load',()=>{
  let [data] = JSON.parse(request.responseText)
  console.log(data)
  //console.log(data.name)
  let html = 
<article class="country">
   <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.capital}</h4>
            <p class="country__row"><span>👫${data.population}</span>POP people</p>
            <p class="country__row">
            📢 <span>${Object.values(data.languages)[0]}</span></p>
            <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
          </div>
        </article>
        
        
  countriesContainer.insertAdjacentHTML("beforeend",html)
  countriesContainer.style.opacity = 1
  })
}

getCountry("usa")
getCountry("bharat")
  
*/

function renderCountry(data, className='') {
  console.log(data);
  let html = `<article class="country ${className}">
   <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.capital}</h4>
            <p class="country__row"><span>👫</span>${data.population}</p>
            <p class="country__row">
            📢 <span>${Object.values(data.languages)[0]}</span></p>
            <p class="country__row"><span>💰</span>${
              Object.values(data.currencies)[0].name
            }</p>
          </div>
        </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
}

function getCountry(name) {
  const req = fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then((response) => response.json())
    .then(([data]) => {
      renderCountry(data)

      let neighbour = data.borders[0]
      
      if(!neighbour) return

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)

    }).
    then(res => res.json()).
    then(([data]) => {
      renderCountry(data)
      console.log(data);
    }).
    catch(err => {
      console.error(`${err} boom`)
      renderError(`Something went wrong BOOOM ${err.message} Try Again`)
    }).
    finally(()=>{
      countriesContainer.style.opacity = 1
    })
    
}

btn.addEventListener('click',()=>{
  getCountry('bharat');
})