$(function () {

    /**
     * Отслеживания скролла
     */
    let header = document.querySelector('.header')
    window.addEventListener('scroll', function (e) {
        if (this.oldScroll > this.scrollY) {
            header.classList.add('scroll-up')
        } else {
            header.classList.remove('scroll-up')
        }
        this.oldScroll = this.scrollY;
    }, false);

    /**
     * timer start
     */

    const deadline = new Date(2023, 8, 30); // конечная дата, например 1 декабря 2023
    // id таймера
    let timerId = null;
    // склонение числительных
    function declensionNum(num, words) {
        return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }
    // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
    function countdownTimer() {
        const diff = deadline - new Date();
        if (diff <= 0) {
            clearInterval(timerId);
        }
        const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
        const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
        const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;

        if (days > 10) {
            splitIntoPieces(days, $days);
        } else {
            $days.forEach((num) => {
                num.innerHTML = '<span>0</span>' + `<span>${days}</span>`;
            })

        }
        if (hours > 10) {
            splitIntoPieces(hours, $hours);
        } else {
            $hours.forEach((num) => {
                num.innerHTML = '<span>0</span>' + `<span>${hours}</span>`;
            })

        }
        if (minutes > 10) {
            splitIntoPieces(minutes, $minutes);
        } else {
            $minutes.forEach((num) => {
                num.innerHTML = '<span>0</span>' + `<span>${minutes}</span>`;
            })
        }

        // $seconds.innerHTML = seconds < 10 ? '0' + seconds : seconds;
        $days.forEach((num) => {
            num.dataset.title = declensionNum(days, ['день', 'дня', 'дней']);
        })

        $hours.forEach((num) => {
            num.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
        })
        $minutes.forEach((num) => {
            num.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
        })

    }

    function splitIntoPieces(number, content) {
        let numberToString = String(number)
        let arrayNumbers = numberToString.split('')
        content = content.innerHTML = `<span>${arrayNumbers[0]}</span><span>${arrayNumbers[1]}</span>`
        return content;
    }
    // получаем элементы, содержащие компоненты даты
    const $days = document.querySelectorAll('.timer__days');
    const $hours = document.querySelectorAll('.timer__hours');
    const $minutes = document.querySelectorAll('.timer__minutes');
    // const $seconds = document.querySelector('.timer__seconds');
    // вызываем функцию countdownTimer
    countdownTimer();
    // вызываем функцию countdownTimer каждую секунду
    timerId = setInterval(countdownTimer, 10000);

    /** 
     * меню мобилка
     */
    $('.btn-menu').on('click', function () {
        $(this).toggleClass('open')
        $('body').toggleClass('hidden')
        $('.header-menu-inner').fadeToggle()
    })
    $('.header-menu__link').on('click', function () {
        $('.btn-menu').removeClass('open')
        $('body').removeClass('hidden')
        $('.header-menu-inner').fadeOut()
    })

    /** 
     * Подцветка активных пунктов меню
     */
    let sections = $('section'),
        nav = $('.header-menu'),
        nav_height = nav.outerHeight();

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();

        sections.each(function () {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');

                $(this).addClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    });

    nav.find('a').on('click', function () {
        var $el = $(this),
            id = $el.attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top - nav_height
        }, 500);

        return false;
    });
})