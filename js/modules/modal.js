function openModal(modalSelector, modalTimerId) {                                          //создаем функцию открытия модального окна, так как она будет повторяться далее в коде, а повторяться в коде прописывая один и тот же функционал - это плохо
    const modal = document.querySelector(modalSelector);
    
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';                    //отмена скролла страницы при открытом модальном окне
    
    if(modalTimerId){
        clearInterval(modalTimerId);                                //отмена таймера на автоматическое открытие модального окна, если пользователь сам его открыл
    }
}

function closeModal(modalSelector) {                                             //создаем функцию закрытия модального окна, так как она будет повторяться далее в коде, а повторяться в коде прописывая один и тот же функционал - это плохо
    const modal = document.querySelector(modalSelector);
    
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';                              //возобнавление работы скролла после закрытия модального окна
}

function modal(triggerSelector, modalSelector, modalTimerId) {

    const modalOpen = document.querySelectorAll(triggerSelector),
          modalWindow = document.querySelector(modalSelector);    

    modalOpen.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });    

    modalWindow.addEventListener('click', (e) => {                      //закрытие модального окна кликом по любой части экрана за пределами модального окна
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {                           //функция, закрывающая модальное окно при нажатии клавиши Escape
        if (e.code === "Escape" && modalWindow.classList.contains('show')) {  //проверка на то, нажата ли клавиша Escape и открыто ли в момент нажатия клавиши модальное окно. узнать, какой код у какой клавиши можно в инете например на сайте keycode.info
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {                                      //сделаем функцию открытия модального окна в случае, когда пользователь долистал стриницу до окнца (можно сделать так для любого момента страницы)
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {        //если прокрученная часть (window.pageYOffset) вместе с видимой частью, которую мы сейчас видим на сайте (document.documentElement.clientHeight) больше либо равна всей длине сайта (document.documentElement.scrollHeight), значит пользователь долистал до конца страницы
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);    //после того, как пользователь первый раз долистал до конца страницы и вызвал тем самым модальное окно, больше оно таким способом вызываться не будет
        }
    }

    window.addEventListener('scroll', showModalByScroll);               //активируем функцию showModalByScroll

}

export default modal;
export {closeModal};
export {openModal};