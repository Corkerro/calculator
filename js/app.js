let script_bodyLockStatus = true;
let script_bodyLockToggle = (delay = 500) => {
    if (document.documentElement.classList.contains('lock')) script_bodyUnlock(delay);
    else script_bodyLock(delay);
};
let script_bodyUnlock = (delay = 500) => {
    let body = document.querySelector('body');
    if (script_bodyLockStatus) {
        let lock_padding = document.querySelectorAll('[data-lp]');
        setTimeout(() => {
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = '0px';
            }
            body.style.paddingRight = '0px';
            document.documentElement.classList.remove('lock');
        }, delay);
        script_bodyLockStatus = false;
        setTimeout(function () {
            script_bodyLockStatus = true;
        }, delay);
    }
};
let script_bodyLock = (delay = 500) => {
    let body = document.querySelector('body');
    if (script_bodyLockStatus) {
        let lock_padding = document.querySelectorAll('[data-lp]');
        for (let index = 0; index < lock_padding.length; index++) {
            const el = lock_padding[index];
            el.style.paddingRight =
                window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        }
        body.style.paddingRight =
            window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        document.documentElement.classList.add('lock');
        script_bodyLockStatus = false;
        setTimeout(function () {
            script_bodyLockStatus = true;
        }, delay);
    }
};
function script_menuInit() {
    if (document.querySelector('.icon-menu'))
        document.addEventListener('click', function (e) {
            if (script_bodyLockStatus && e.target.closest('.icon-menu')) {
                script_bodyLockToggle();
                document.documentElement.classList.toggle('menu-open');
            }
        });
}
function script_menuClose() {
    script_bodyUnlock();
    document.documentElement.classList.remove('menu-open');
}
function historyInit() {
    if (document.querySelector('.history-button'))
        document.addEventListener('click', function (e) {
            if (script_bodyLockStatus && e.target.closest('.history-button')) {
                script_bodyLockToggle();
                document.documentElement.classList.toggle('history-open');
            }
        });
}
function historyClose() {
    script_bodyUnlock();
    document.documentElement.classList.remove('history-open');
}
script_menuInit();
historyInit();
document.querySelector('.menu__body').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) script_menuClose();
});
document.querySelector('.history__body').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) historyClose();
});
const changeCalculatorTypeButton = document.querySelectorAll('[data-calculator-type]');
const changeSystemTypeButton = document.querySelectorAll('[data-calculator-system]');
function actionAfterMenuButtonClick() {
    script_menuClose();
}
const html = document.querySelector('html');
changeCalculatorTypeButton.forEach((button) => {
    button.addEventListener('click', (e) => {
        const clickedButton = e.currentTarget;
        const gridDisplay = document.querySelector('.controls__grid.decemal');
        const newType = clickedButton.dataset.calculatorType;
        changeCalculatorTypeButton.forEach((btn) => {
            const type = btn.dataset.calculatorType;
            btn.classList.remove('_active');
            html.classList.remove(type);
            gridDisplay.classList.remove(type);
        });
        clickedButton.classList.add('_active');
        html.classList.add(newType);
        gridDisplay.classList.add(newType);
        actionAfterMenuButtonClick();
    });
});
changeSystemTypeButton.forEach((button) => {
    button.addEventListener('click', (e) => {
        const clickedButton = e.currentTarget;
        const newType = clickedButton.dataset.calculatorSystem;
        changeSystemTypeButton.forEach((btn) => {
            const type = btn.dataset.calculatorSystem;
            btn.classList.remove('_active');
            html.classList.remove(type);
        });
        if (newType != 'decemal')
            changeCalculatorTypeButton.forEach((btn) => {
                btn.classList.add('disabled');
                console.log(btn);
            });
        else
            changeCalculatorTypeButton.forEach((btn) => {
                btn.classList.remove('disabled');
            });
        clickedButton.classList.add('_active');
        html.classList.add(newType);
        actionAfterMenuButtonClick();
    });
});
const popupButtons = document.querySelectorAll('[data-popup]');
popupButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => openPopup(e));
});
function openPopup(e) {
    const clickedButton = e.currentTarget;
    const popupBody = document.querySelector(clickedButton.dataset.popup);
    const popupContent = popupBody.querySelector('.popup__content');
    html.classList.add('popup-show');
    popupBody.classList.add('popup_show');
    const closeButton = popupBody.querySelector('.popup__close');
    closeButton.addEventListener('click', () => closePopup(popupBody));
    popupBody.addEventListener('click', (event) => {
        if (!popupContent.contains(event.target)) closePopup(popupBody);
    });
}
function closePopup(popupBody) {
    html.classList.remove('popup-show');
    popupBody.classList.remove('popup_show');
}
