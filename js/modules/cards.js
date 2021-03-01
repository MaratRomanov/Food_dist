import {getResource} from '../services/services';

function cards() {

    class Menu {
        constructor(src, alt, title, text, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.text = text;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;                                         //курс валюты типо
            this.changeToUAH();
        }

        changeToUAH() {                                                  //конвертация валюты
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                element.classList.add("menu__item")
            }
            else {
                this.classes.forEach(item => element.classList.add(item));
            }

            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.text}</div>
                    <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>  
                </div>          
            `;
            this.parent.append(element);
        }
    }    

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new Menu(img, altimg, title, descr, price, '.menu .container').render();
            })
        });       

}

export default cards;