export{selectors}
import axios from 'axios';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
AUTH_TOKEN =
  'live_HOlAJq960GSjR7q23CQ8vgbJTnpOghPZvhNu5ItrydST1Pbap95qIDCIfD8ifAuA';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';
axios.defaults.headers.common['x-api-key'] = AUTH_TOKEN;
const selectors ={
    select: document.querySelector('.breed-select'),
    info: document.querySelector(".cat-info")

}

fetchBreeds()

selectors.select.addEventListener('change', onChangeClick)


function onChangeClick() {
    const selected = selectors.select.value
    fetchCatByBreed(selected)

}

