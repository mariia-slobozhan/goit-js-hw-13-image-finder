import './sass/main.scss';
import apiService from './js/apiService';
import '../node_modules/material-design-icons/iconfont/material-icons.css'
import pictureMarkup from './templates/picture.hbs'
import fullSizePictureOpen from './js/lightbox.js'

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input[name="query"]'),
  gallery: document.querySelector('.gallery'),
  loadMorebtn: document.querySelector('[data-action="load-more"]'),
  upBtn: document.querySelector('.up-btn'),
  photoCard: document.querySelector('.photo-card'),
};

refs.form.addEventListener('submit', querySearch);
refs.loadMorebtn.addEventListener('click', loadMore);
refs.upBtn.addEventListener('click', onTop )
window.addEventListener("scroll", scrollFunction)
refs.loadMorebtn.classList.add("is-hidden")


function querySearch(e) {
  e.preventDefault();
  
  apiService.searchQuery = e.currentTarget.elements.query.value;
  apiService.resetPage()
 
  apiService.fetchPictures().then(result => {
    clearMarkup();
      createMarkup(result)})
      refs.loadMorebtn.classList.remove("is-hidden")
}

function loadMore(e) {
  apiService.fetchPictures().then(result => {
      createMarkup(result)})

}

function createMarkup(pictures){
    const markUp = pictureMarkup(pictures);
    refs.gallery.insertAdjacentHTML("beforeend", markUp)
    refs.gallery.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });

    //   refs.photoCard.addEventListener('click', fullSizePictureOpen)
}

function clearMarkup() {
    refs.gallery.innerHTML = ''

}

function onTop(e){
    document.documentElement.scrollTo ({
        top: 0,
        behavior: 'smooth',
      })
}


function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
   refs.upBtn.style.display = "block";
  } else {
    refs.upBtn.style.display = "none";
  }
}

refs.photoCard.addEventListener('click', fullSizePictureOpen)