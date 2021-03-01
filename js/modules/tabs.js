function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

    const tabs = document.querySelectorAll(tabsSelector),         //собираем в переменные псевдомассивы с нужными нам элементами, tabs это кликабельные элементы "Стили питания"
          tabsContent = document.querySelectorAll(tabsContentSelector),       //контент страницы, длинный текст который выводится
          tabsParent = document.querySelector(tabsParentSelector);     //родитель tabs, на него будем вешать обработчик с делегированием событий (для управления потомками)

    //без скриптов верстка на странице поедет, они просто все скопом будут загружены, с помощью скрипта будем регулировать отображение элементов на странице

    function hideTabContent() {                                          //первая задача - скрываем ненужные нам табы. 
        tabsContent.forEach(item => {                                   //берем переменную, содержащую табы - tabsContent, перебираем элементы в нем (называем их сами item) методом forEach
            item.classList.add('hide');                                 //каждому отдельному item с помощью инлайн-стилей устанавливаем параметр display равным 'hide', то есть скрываем его; классы находятся в css
            item.classList.remove('show', 'fade');                      //удаляем у элемента параметры 'show', 'fade'
        });

        tabs.forEach(item => {                                          //так же в нашей функции удаляем класс активности у скрытых элементов
            item.classList.remove(activeClass);            //'tabheader__item_active' берем из верстки, ставим в код без точки.
        });
    }

    function showTabContent(i = 0) {                                    //создаем функцию, которая будет показывать табы, в аргументы передаем номер нужного нам элемента; выражение i = 0 означает параметр i по умолчанию
        tabsContent[i].classList.add('show', 'fade');                   //дадим кликнутому элементу контента параметры 'show', 'fade'
        tabsContent[i].classList.remove('hide');                        //удалим у этого элемента параметр 'hide'
        tabs[i].classList.add(activeClass);                //делаем этот элемент 'tabheader__item_active'
    }

    hideTabContent();                                                   //вызываем функции hideTabContent и ниже showTabContent
    showTabContent();

    tabsParent.addEventListener('click', (e) => {                       //назначим обработчик события 'click', создаем коллбэк-функцию и передаем в неё объект события event, который просто укажем как e
        const target = e.target;                                        //создадим переменную target; это делается как облегчение дальнейшего написания кода и избежания постоянного прописывания e.target

        if (target && target.classList.contains(tabsSelector.slice(1))) {    //проверяем на просто target, и на 'tabheader__item' в классе, чтоб клик был именно по элементу а не по пространству вокруг него
            tabs.forEach((item, i) => {                                 //перебераем псевдомассив tabs, передавая методу forEach аргументы 1) item - так мы назвали каждый элемент псевдомассива и 2) i - по синтаксису forEach второй элемент аргумента это порядковый номер элемента
                if (target == item) {                                     //если кликнутый элемент target равен элементу в цикле forEach то
                    hideTabContent();                                   //вызываем функции скрытия других элементов и
                    showTabContent(i);                                  //функцию отрисовки нужного нам элемента, с передачей порядкового номера элемента i
                }
            });
        }
    });

}

export default tabs;