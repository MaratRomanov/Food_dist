require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import modal, { openModal } from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import slider from './modules/slider';
import calculator from './modules/calculator';
import forms from './modules/forms';

window.addEventListener('DOMContentLoaded', () => {                     //ожидание загрузки DOM-дерева, выполнит остальной код только после того как DOM-дерево сформируется. можно писать windows или document

    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);                  //таймер на вызов модального окна

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2021-01-31');
    cards();
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        field: '.offer__slider-inner',
        slide: '.offer__slide',
        wrapper: '.offer__slider-wrapper',
        totalCounter: '#total',
        currentCounter: '#current'
    });
    calculator();
    forms('form', modalTimerId);    

});