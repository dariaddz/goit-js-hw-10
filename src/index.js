import './css/styles.css';
import debounce from 'lodash.debounce';
import countryCardTmplt from './templates/country-cards.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

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
