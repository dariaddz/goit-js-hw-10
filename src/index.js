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
export { refs };
const DEBOUNCE_DELAY = 300;

refs.searchBox.addEventListener('input', debounce(onSearchBoxInput, DEBOUNCE_DELAY));

// ----------- события по инпуту-----
function onSearchBoxInput(e) {
  // ----------------------принимаем массив стран и строим разметку----------
  const countryName = e.target.value.trim();
  fetchCountries(countryName).then(renderCountryCard);
}

//-----СТРОИМ РАЗМЕТКУ---------
function renderCountryCard(country) {
  console.log(country.length);
  const markup = countryCardTmplt(country);
  if (country.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name');
    refs.countryCardContainer.innerHTML = '';
    return;
  }

  if (country.length > 1 && country.length <= 10) {
    refs.countryCardContainer.innerHTML = markup;
    listMarkupStyle();
    return;
  }

  refs.countryCardContainer.innerHTML = markup;
  cardMarkupStyle();
}

function listMarkupStyle() {
  const details = document.querySelectorAll('.country-detailed-info');
  details.forEach(element => element.classList.toggle('is-hidden'));
}

function cardMarkupStyle() {
  const officialCountryName = document.querySelectorAll('.country-name');
  officialCountryName.forEach(element =>
    element.classList.replace('country-name', 'country-title-card'),
  );
}
