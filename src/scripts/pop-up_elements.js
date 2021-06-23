window.addEventListener('load', () => {
  document.querySelector('.header__button_menu')
    .addEventListener('click', () => {popupElementManager('nav')})
  document.querySelector('.nav__close-btn')
    .addEventListener('click', () => {underlayManager(undefined, 'hide', 'nav')})
})

function displayElement(elementId, state = 'show') {
  let element = document.getElementById(elementId)
  element.classList[state === 'show' ? 'add' : 'remove'](`${elementId}_show`)
}

function popupElementManager(elementId, state = 'show') {
  displayElement(elementId, state)
  underlayManager(undefined, state, elementId)
}

function underlayManager(underlayId = 'underlay', state = 'show', elementId) {
  let underlay = document.getElementById(underlayId)
  
  if (state === 'show') {
    displayElement(underlayId, state)
    document.body.classList.add('body_fixed')
    underlay.addEventListener('click', function hideUnderlay() {
      underlay.removeEventListener('click', hideUnderlay)
      underlayManager(underlayId, 'hide', elementId)
    })

  } else {
    displayElement(elementId, 'hide')
    displayElement(underlayId, 'hide')
    document.body.classList.remove('body_fixed')
  }
}
    