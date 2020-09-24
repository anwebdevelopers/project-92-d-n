(function ($) {

    'use strict';

    document.addEventListener('DOMContentLoaded', function () {

        /*******************************************************/
        //MENU
        /*******************************************************/
        (function () {

            const elemNav = document.querySelector('.header__menu-nav'),
                buttonNav = document.querySelector('.header__menu-button');

            buttonNav.addEventListener('click', function (event) {
                event.stopPropagation();

                buttonNav.toggleAttribute('active');
                elemNav.toggleAttribute('active');
            });

        }());
    })
}(jQuery));