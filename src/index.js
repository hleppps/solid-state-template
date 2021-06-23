import './styles/style.less';
import '@fortawesome/fontawesome-free/js/all.js'
import {changeHeaderBackground} from './scripts/header.js'
import './scripts/pop-up_elements.js'

window.addEventListener('scroll', changeHeaderBackground)