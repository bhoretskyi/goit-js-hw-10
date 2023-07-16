export { selectors };
import axios from 'axios';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
const AUTH_TOKEN =
  'live_HOlAJq960GSjR7q23CQ8vgbJTnpOghPZvhNu5ItrydST1Pbap95qIDCIfD8ifAuA';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';
axios.defaults.headers.common['x-api-key'] = AUTH_TOKEN;
const selectors = {
  select: document.querySelector('.breed-select'),
  info: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};
selectors.select.hidden = true
selectors.error.hidden = true;
fetchBreeds()
  .then(data => {
selectors.select.hidden = false

    data.map(breed =>
      selectors.select.insertAdjacentHTML(
        'beforeend',
        `<option value="${breed.id}">${breed.name}</option>`
      )
    );
  })
  .catch(error => {
    selectors.error.hidden = false;
    console.log(error);
  })
  .finally(() => {
    selectors.loader.hidden = true;
  });

selectors.select.addEventListener('change', onChangeClick);

function onChangeClick() {
  const selected = selectors.select.value;
  fetchCatByBreed(selected)
    .then(data => {
      selectors.error.hidden = true;
      selectors.loader.hidden = false;
      selectors.info.hidden = true;
      selectors.info.innerHTML = `<img src=${data[0].url}
      alt=${data[0].breeds[0].name}
      width="400" >
    <h1>${data[0].breeds[0].name}</h1>
    <p>${data[0].breeds[0].temperament}</p>
    <p>${data[0].breeds[0].description}</p>
    `;
    })
    .catch(err => {
      selectors.error.hidden = false;
      selectors.info.innerHTML = ''
      console.log(err);
    })
    .finally(() => {
      selectors.loader.hidden = true;
      selectors.info.hidden = false;
    });
}
