import { Convertor } from './convertor.js';

let converType = null;

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
const convertButtons = document.querySelectorAll('[data-convert]');
const convertTypes = ['length', 'mass', 'volume'];
function actionAfterMenuButtonClick() {
    script_menuClose();
}
const html = document.querySelector('html');
changeCalculatorTypeButton.forEach((button) => {
    button.addEventListener('click', (e) => {
        const clickedButton = e.currentTarget;
        const gridDisplay = document.querySelector('.controls__grid.decemal');
        const newType = clickedButton.dataset.calculatorType;
        converType = null;
        changeCalculatorTypeButton.forEach((btn) => {
            const type = btn.dataset.calculatorType;
            btn.classList.remove('_active');
            html.classList.remove(type);
            gridDisplay.classList.remove(type);
        });
        clickedButton.classList.add('_active');
        html.classList.add(newType);
        gridDisplay.classList.add(newType);
        convertTypesClear();
        html.classList.remove('convert');
        convertButtons.forEach((convBtn) => {
            convBtn.classList.remove('_active');
        });
        actionAfterMenuButtonClick();
    });
});
function convertTypesClear() {
    convertTypes.forEach((type) => {
        html.classList.remove(type);
        html.classList.remove(`convert-${type}`);
    });
}
convertButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        clearConvert();
        changeCalculatorTypeButton.forEach((btn) => {
            btn.classList.remove('_active');
        });
        convertButtons.forEach((btn) => {
            btn.classList.remove('_active');
        });
        const newType = button.dataset.convert;
        converType = newType;
        convertTypesClear();
        html.classList.add(`convert-${newType}`);
        html.classList.add('convert');
        button.classList.add('_active');

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

const convertor = new Convertor();

const clearBtn = document.querySelectorAll('#clear');
const numbers = document.querySelectorAll('[id^="number-"]');
const decimal = document.querySelectorAll('#decimal');
const initScreen = document.querySelectorAll('.display .top .init-input');
const calculateScreen = document.querySelectorAll('.display .down .calculate-text');

const updateScreen = () => {
    convertValues();

    initScreen.forEach((screen) => {
        screen.textContent = convertor.currentValue;
    });
    calculateScreen.forEach((screen, i) => {
        screen.textContent = convertor.calculatedValue[i];
    });
};

decimal.forEach((el) => {
    el.addEventListener('click', () => {
        if (!convertor.currentValue.includes('.')) {
            convertor.setCurrentValue('.');
            updateScreen();
        }
    });
});

clearBtn.forEach((btn) => {
    btn.addEventListener('click', clearConvert);
});

function clearConvert() {
    convertor.currentValue = '0';
    convertor.calculatedValue = ['0', '0', '0'];
    updateScreen();
}

numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        convertor.setCurrentValue(number.textContent);
        updateScreen();
    });
});

const selects = document.querySelectorAll('.display._convertor select');

selects.forEach((sel) => {
    sel.addEventListener('change', (e) => {
        convertValues();
        updateScreen();
    });
});

const convertValues = () => {
    console.log('Convert');

    const convertLengthFrom = document.querySelector(
        '.display._convertor.convert-length .top select',
    ).value;
    const convertLengthTo = document.querySelector(
        '.display._convertor.convert-length .down select',
    ).value;

    const convertMassFrom = document.querySelector(
        '.display._convertor.convert-mass .top select',
    ).value;
    const convertMassTo = document.querySelector(
        '.display._convertor.convert-mass .down select',
    ).value;

    const convertVolumeFrom = document.querySelector(
        '.display._convertor.convert-volume .top select',
    ).value;
    const convertVolumeTo = document.querySelector(
        '.display._convertor.convert-volume .down select',
    ).value;
    convertor.convertLength(convertLengthFrom, convertLengthTo);
    convertor.convertWeight(convertMassFrom, convertMassTo);
    convertor.convertVolume(convertVolumeFrom, convertVolumeTo);
};

window.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        convertor.setCurrentValue(key);
        updateScreen();
    }

    if (key === '.') {
        convertor.setCurrentValue('.');
        updateScreen();
    }

    if (key === 'Escape') {
        clearConvert();
    }
});
