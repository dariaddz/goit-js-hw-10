import './css/styles.css';
import debounce from 'lodash.debounce';
import countryCardTmplt from './templates/country-cards.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// ------refs------------------
const refs = {
  countryCardContainer: document.querySelector('.country-info'),
  searchBox: document.getElementById('search-box'),
};
const DEBOUNCE_DELAY = 300;

refs.searchBox.addEventListener('input', debounce(onSearchBoxInput, DEBOUNCE_DELAY));

// -------------------------------
// let countryName = 'tu';

// ----------- события по инпуту-----
function onSearchBoxInput(e) {
  // ----------------------принимаем массив стран и строим разметку----------
  let countryName = e.target.value;
  fetchCountries(countryName).then(renderCountryCard).catch(onSearchError);

  console.log(countryName);
}

//------получаем страны ----------
function fetchCountries(countryName) {
  const url = `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`;
  return fetch(url).then(response => {
    return response.json();
  });
}
//-----СТРОИМ РАЗМЕТКУ---------
function renderCountryCard(country) {
  // console.log(country);
  const markup = countryCardTmplt(country);
  refs.countryCardContainer.innerHTML = markup;
}

function onSearchError(error) {
  Notify.failure('No countries found');
}
