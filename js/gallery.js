/*=============== GALLERY IMAGE LARGE VIEW ===============*/

document.querySelectorAll('.image__container img').forEach(image => {
    image.onclick = () => {
        document.querySelector('.popup__image').style.display = 'block';
        document.querySelector('.popup__image img').src = image.getAttribute('src');
    }
});
//when clicks the cross image view close
document.querySelector('.popup__image span').onclick = () => {
    document.querySelector('.popup__image').style.display = 'none';
};
