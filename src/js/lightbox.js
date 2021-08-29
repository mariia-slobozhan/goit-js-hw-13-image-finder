import * as basicLightbox from 'basiclightbox'
import lightboxMarkup from '../templates/picture.hbs'

export default function fullSizePictureOpen(picture){
    const fullPicture = basicLightbox.create(`
    <img src="${picture}" width="800" height="600">
    `)
    console.log('picture');
    fullPicture.show()
}

