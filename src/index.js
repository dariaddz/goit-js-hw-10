import './css/styles.css';
import debounce from 'lodash.debounce';
import countryCardTmplt from './templates/country-cards.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// ------refs------------------
const refs = {
  countryCardContainer: document.querySelector('.country-info'),
};

// -------------------------------
let countryName = 'tu';

fetch(
  `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`,
)
  .then(response => {
    return response.json();
  })
  .then(renderCountryCard)

  .catch(error => {
    console.log(error);
  });

function renderCountryCard(country) {
  console.log(country);
  const markup = countryCardTmplt(country);
  refs.countryCardContainer.innerHTML = markup;

  console.log(markup);
}

// function resultCheck(country) {
//   if (this.length > 10) {
//     Notify.info('list is tooo long');
//   } else if ((country.length = 1)) {
//     Notify.info('will create big card');
//   } else {
//     Notify.info('will create list ');
//   }
// }

// function oneCountry() {
//   console.log();
// }

// function listOfCountries() {
//   console.log();
// }
