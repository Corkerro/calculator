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
const menuButtons = document.querySelectorAll('.menu__link');
menuButtons.forEach((button) => {
    button.addEventListener('click', () => {
        script_menuClose();
    });
});
