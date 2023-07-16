import axios from 'axios';
import { selectors } from '.';
export { fetchBreeds };
export { fetchCatByBreed };

function fetchBreeds() {
  return axios
    .get('/breeds/')
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }

      return response.data;
    })
    .then(data => {
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
}

function fetchCatByBreed(breedId) {
  selectors.loader.hidden = false;
  selectors.info.hidden = true;
  selectors.error.hidden = true;

  return axios
    .get(`/images/search?breed_ids=${breedId}`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.data;
    })
    .then(data => {
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
      console.log(err);
    })
    .finally(() => {
      selectors.loader.hidden = true;
      selectors.info.hidden = false;
    });
}
