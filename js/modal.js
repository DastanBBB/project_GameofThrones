// const modal = document.querySelector('.modal')
// const triggerButton = document.querySelector('#btn-get')
// const closeButton = document.querySelector('.modal_close')
//
// const openModal = () => {
//     modal.style.display = 'block'
//     document.body.style.overflow = 'hidden'
// }
// const closeModal = () => {
//     modal.style.display = 'none'
//     document.body.style.overflow = ''
// }
//
// triggerButton.onclick = () => openModal();
// closeButton.onclick = () => closeModal();
// modal.onclick = (event) => {
//     if (event.target === modal) {
//         closeModal()
//     }
// };
//
// const showModalOnScroll = () => {
//     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//         openModal();
//         window.removeEventListener('scroll', showModalOnScroll);
//     }
// };
//
// window.addEventListener('scroll', showModalOnScroll);
//
// const showModalAfterDelay = () => {
//     setTimeout(openModal, 10000);
// };
//
// window.addEventListener('load', showModalAfterDelay);