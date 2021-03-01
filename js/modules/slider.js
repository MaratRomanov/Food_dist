function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

    let startNumber = 1;
    let offset = 0;

    const offerSlides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        btnPrev = document.querySelector(prevArrow),
        btnNext = document.querySelector(nextArrow),
        current = document.querySelector(currentCounter),
        total = document.querySelector(totalCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;    

    if (offerSlides.length < 10) {
        total.innerHTML = `0${offerSlides.length}`;
        current.textContent = `0${startNumber}`;
    }
    else {
        total.innerHTML = offerSlides.length;
        current.textContent = startNumber;
    }

    slidesField.style.width = 100 * offerSlides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s';

    slidesWrapper.style.overflow = 'hidden';

    offerSlides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
        `;
    slider.append(indicators);

    for (let i = 0; i < offerSlides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
  `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function dotsOpacity() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[startNumber - 1].style.opacity = 1;
    };

    function addZero() {
        if (offerSlides.length < 10) {
            current.textContent = `0${startNumber}`;
        }
        else {
            current.textContent = startNumber;
        }
    };

    function replaceString(expr){
        return +expr.replace(/[^.\d]+/g, "");
    };

    btnNext.addEventListener('click', () => {
        if (offset == replaceString(width) * (offerSlides.length - 1)) {
            offset = 0;
        }
        else {
            offset += replaceString(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (startNumber == offerSlides.length) {
            startNumber = 1;
        }
        else {
            startNumber++;
        }

        addZero();
        dotsOpacity();
    });

    btnPrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = replaceString(width) * (offerSlides.length - 1);
        }
        else {
            offset -= replaceString(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (startNumber == 1) {
            startNumber = offerSlides.length;
        }
        else {
            startNumber--;
        }

        addZero();
        dotsOpacity();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            startNumber = slideTo;
            offset = replaceString(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            addZero();
            dotsOpacity();
        })
    });

}

export default slider;