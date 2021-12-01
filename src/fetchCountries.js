import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './index';

export function fetchCountries(countryName) {
  const url = `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`;

  if (countryName === '') {
    Notify.info('Please type country name');
    refs.countryCardContainer.innerHTML = '';
    return;
  }
  return fetch(url).then(response => {
    if (!response.ok) {
      Notify.failure('Sorry, we could not find country for you');
      refs.countryCardContainer.innerHTML = '';

      throw new Error(response.status);
    }

    return response.json();
  });
}

//------получаем страны ---------
