import './styles/style.less';
import '@fortawesome/fontawesome-free/js/all.js'
import {changeHeaderBackground} from './scripts/header.js'

window.addEventListener('scroll', changeHeaderBackground)