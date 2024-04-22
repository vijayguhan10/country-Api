let insertCountries = document.querySelector(".countries");
let countrybtn = document.querySelector(".btn-country");
// function getCountryDetail(country) {
//   var count = country;
//   let request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v2/name/${country}`);
//   request.send();
//   request.addEventListener("load", function () {
//     console.log("Data loaded successfully!");
//     let data = JSON.parse(request.responseText);
//     console.log(data);
//     if (data && data.length > 0 && data[0].languages && data[0].currencies) {
//       console.log(data[0].languages);
//       console.log(data[0].capital);
//       codeCountry(data);
//     } else {
//       console.log("No valid data found or data structure is incorrect.");
//     }
//     let request1 = new XMLHttpRequest();
//     let dataBorder = data[0].borders[0] ||data[0].name;
//     request1.open("GET", `https://restcountries.com/v2/alpha/${dataBorder}`);
//     request1.send();
//     request1.addEventListener("load", function () {
//       let BorderDetails = [JSON.parse(request1.responseText)];
//       if (
//         BorderDetails &&
//         BorderDetails.length > 0 &&
//         BorderDetails[0].languages &&
//         BorderDetails[0].currencies
//       ) {
//         console.log(BorderDetails[0].languages);
//         console.log(BorderDetails[0].capital);
//         codeCountry(BorderDetails);
//       } else {
//         console.log("No valid data found or data structure is incorrect.");
//       }
//       console.log(BorderDetails);
//     });
//   });
// }
let renderfunction = (Message) => {
  insertCountries.insertAdjacentText("beforeend", Message);
  insertCountries.style.opacity = 1;
};

function codeCountry(data) {
  let html;

  html = `
      <article class="country">
        <img class="country__img" src="${data[0].flag}" />
        <div class="country__data">
          <h3 class="country__name">${data[0].name}</h3>
          <h4 class="country__region">${data[0].capital}</h4>
          <p class="country__row"><span>👫</span>${(
            +data[0].population / 1000000
          ).toFixed(2)} million people</p>
          <p class="country__row"><span>🗣️</span>${
            data[0].languages[0].nativeName
          }</p>
          <p class="country__row"><span>💰</span>${
            data[0].currencies[0].symbol
          }</p>
        </div>
      </article>
    `;
  insertCountries.style.opacity = 1;
  insertCountries.insertAdjacentHTML("beforeend", html);
}

// Corrected calls
function getCountryDetail(country) {
  return fetch(`https://restcountries.com/v2/name/${country}`)
    .then(function (response) {
      console.log(response);
      if (!response.ok) {
        console.log(response.status);
        throw new Error(`Country not found ${response.status}`);
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      codeCountry(data);
      if (
        data &&
        data.length > 0 &&
        data[0].borders &&
        data[0].borders.length > 0
      ) {
        let dataBorder = data[0].borders[0];
        return fetch(`https://restcountries.com/v2/alpha/${dataBorder}`)
          .then(function (response) {
            return response.json();
          })
          .then(function (dataBorders) {
            console.log([dataBorders]);
            codeCountry([dataBorders]);
          });
      } else {
        throw new Error(`No neighboring country found!`);
      }
    })
    .catch(function (err) {
      console.log(err);
      renderfunction(`${err.message}`);
    });
}
navigator.geolocation.getCurrentPosition(function (position) {
  console.log(position.coords.altitudeAccuracy);
});
countrybtn.addEventListener("click", function () {
  let country1 = prompt("Enter a country:");
  getCountryDetail(country1);
});
let PromisCreating = new Promise(function (pass, fail) {
  let x = Math.random();
  if (x >= 0.5) {
    console.log(x);
    pass("\nYou are passed");
  } else {
    fail("you are failed");
  }
});

PromisCreating.then((result) => console.log(result)).catch((result1) =>
  console.log(result1)
);
navigator.geolocation.getCurrentPosition(function (position) {
  return new Promise(function (resolve, reject) {
    if (position) {
      resolve(position);
    } else {
      reject(new Error("Position unavailable"));
    }
  })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
});
let Await = async function () {
  try {
    let DET = await fetch(`https://dog.ceo/api/breeds/list/all`);
    if (!DET.ok) {
      throw new Error(DET.statusText, DET.status);
    }
    let datastored = [await DET.json()];
    console.log(console.log(datastored[0].message.australian[0]    ));
  } catch (err) {
    alert(err.message);
  }
};

Await();
