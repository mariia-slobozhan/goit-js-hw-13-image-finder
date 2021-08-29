import './sass/main.scss';
import apiService from './js/apiService';
import { form, gallery, loadMorebtn, upBtn } from './js/refs';
import '../node_modules/material-design-icons/iconfont/material-icons.css';
import pictureMarkup from './templates/picture.hbs';

form.addEventListener('submit', querySearch);
loadMorebtn.addEventListener('click', loadMore);
upBtn.addEventListener('click', onTop);
window.addEventListener('scroll', scrollFunction);
loadMorebtn.classList.add('is-hidden');

function querySearch(e) {
  e.preventDefault();
  if (!e.currentTarget.elements.query.value) {
    return;
  }
  loadMorebtn.classList.add('is-hidden');
  apiService.searchQuery = e.currentTarget.elements.query.value.trim();
  apiService.resetPage();

  apiService
    .fetchPictures()
    .then(result => {
      clearMarkup();
      createMarkup(result);
      return result;
    })
    .then(data => {
      if (data.hits.length > 11) {
        loadMorebtn.classList.remove('is-hidden');
      }
    });
}

function loadMore(e) {
  apiService.fetchPictures().then(result => {
    createMarkup(result);
    gallery.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  });
}

function createMarkup(pictures) {
  const markUp = pictureMarkup(pictures);
  gallery.insertAdjacentHTML('beforeend', markUp);
}

function clearMarkup() {
  gallery.innerHTML = '';
}

function onTop(e) {
  document.documentElement.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    upBtn.style.display = 'block';
  } else {
    upBtn.style.display = 'none';
  }
}
