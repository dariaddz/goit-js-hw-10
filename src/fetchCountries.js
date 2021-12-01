import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './index';

export function fetchCountries(countryName) {
  const url = `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`;
  // const url = `https://restcountries.com/v3.1/name/all`;
  return fetch(url).then(response => {
    if (!response.ok) {
      Notify.failure('Sorry, we could not find country for you');
      refs.countryCardContainer.innerHTML = '';
      // refs.countryList.innerHTML = '';
      throw new Error(response.status);
    }
    return response.json();
  });
}

//------получаем страны ---------
