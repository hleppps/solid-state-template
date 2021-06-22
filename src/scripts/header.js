function changeHeaderBackground() {
  let scrollTrigger = 300;
  let header = document.querySelector('.header')
  header.classList[window.pageYOffset >= scrollTrigger ? 'add' : 'remove']('header_show')
}

export {changeHeaderBackground}