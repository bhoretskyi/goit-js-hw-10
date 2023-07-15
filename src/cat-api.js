import axios from 'axios';
import { selectors } from '.';
export { fetchBreeds };
export { fetchCatByBreed };

function fetchBreeds() {
  axios
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
      console.log(error);
    });
}

function fetchCatByBreed(breedId) {
  axios
    .get(`/images/search?breed_ids=${breedId}`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.data;
    })
    .then(data => {
     
      console.log(data);
      selectors.info.innerHTML = `<img src=${data[0].url}
        alt=${data[0].breeds[0].name}
        width="400" >
      <h1>${data[0].breeds[0].name}</h1>
      <p>${data[0].breeds[0].temperament
      }</p>
      <p>${data[0].breeds[0].description
      }</p>
      `;
    })
    .catch(err => console.log(err));
}
