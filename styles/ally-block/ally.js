const settingsBlock = document.querySelector("#ally-settings");
const triggerAnchors = document.querySelectorAll(".ally a");

const root = document.querySelector('html');

const toggleAllyBlockVisibility = () => {
    if (settingsBlock.classList.contains("is-hidden")) {
        settingsBlock.classList.remove("is-hidden");
        settingsBlock.classList.add("is-visible");
        settingsBlock.focus();
        triggerAnchors.forEach(anchor => {
            anchor["ariaLabel"] = "Закрыть меню настроек доступности";
            anchor["aria-expanded"] = "true";
        });

    } else {
        settingsBlock.classList.add("is-hidden");
        settingsBlock.classList.remove("is-visible");
        triggerAnchors.forEach(anchor => {
            anchor["ariaLabel"] = "Открыть меню настроек доступности";
            anchor["aria-expanded"] = "false";
        });

    }
};

const clearBodyClasses = (classes) => {
    root.classList.remove(...classes);
};

const clearTheme = () => {
    const buttons = document.querySelectorAll("#ally-colors+ul button");
    clearBodyClasses(Array.from(buttons).map(btn => btn.id));
};

const clearFontSizes = () => {
    const buttons = document.querySelectorAll("#ally-fz+ul button");
    clearBodyClasses(Array.from(buttons).map(btn => btn.id));
};

const clearLetterSpaces = () => {
    const buttons = document.querySelectorAll("#ally-ls+ul button");
    clearBodyClasses(Array.from(buttons).map(btn => btn.id));
};

const clearLineHeight = () => {
    const buttons = document.querySelectorAll("#ally-lh+ul button");
    clearBodyClasses(Array.from(buttons).map(btn => btn.id));
};

const clearFontFamily = () => {
    const buttons = document.querySelectorAll("#ally-ff+ul button");
    clearBodyClasses(Array.from(buttons).map(btn => btn.id));
};

const clearImages = () => {
    const buttons = document.querySelectorAll("#ally-img+ul button");
    clearBodyClasses(Array.from(buttons).map(btn => btn.id));
};

const clearSpeech = () => {
    const buttons = document.querySelectorAll("#ally-speech+ul button");
    clearBodyClasses(Array.from(buttons).map(btn => btn.id));
};

const resetBodyClasses = () => {
    clearTheme();
    clearFontSizes();
    clearLetterSpaces();
    clearLineHeight();
    clearFontFamily();
    clearImages();
    clearSpeech();
};

const resetDocumentCookies = () => {
    ["ally-theme", "ally-ff", "ally-ls", "ally-fz", "ally-lh", "ally-reset", "ally-speech", "ally-img"].forEach(cookieName => deleteCookie(cookieName));
};

const handleResetButton = () => {
    resetBodyClasses();
    resetDocumentCookies();
    removeSpeechListeners();
};


const customClearBodyClasses = (targetType) => {

    switch (targetType) {
        case "ally-theme":
            clearTheme();
            return;
        case "ally-fz":
            clearFontSizes();
            return;
        case "ally-ls":
            clearLetterSpaces();
            return;
        case "ally-lh":
            clearLineHeight();
            return;
        case "ally-ff":
            clearFontFamily();
            return;
        case "ally-img":
            clearImages();
            return;
        case "ally-speech":
            clearSpeech();
            return;
        default:
            resetBodyClasses();
    }
};

const handleAllyButtonClick = (e) => {
    const triggerButton = e.target.closest("button");
    if (!triggerButton || triggerButton.disabled) {
        return;
    }

    if (!triggerButton.dataset["ally"]) {
        return;
    }

    const cookieName = triggerButton.dataset["ally"];
    const cookieValue = triggerButton.dataset["allyValue"];

    if (cookieName === "ally-reset") {
        handleResetButton();
        return;
    }

    if (cookieName === "ally-img" && cookieValue === "show") {
        clearImages();
        deleteCookie(cookieName);
        return;
    }

    if (cookieName === "ally-speech") {
        if (cookieValue === "hide") {
            clearSpeech();
            deleteCookie(cookieName);
            removeSpeechListeners();
            return;
        } else {
            addSpeechListeners();
        }
    }

    const classToBody = `${cookieName}-${cookieValue}`;

    if (root.classList.contains(classToBody)) {
        root.classList.remove(classToBody);
    } else {
        customClearBodyClasses(cookieName);
        root.classList.add(classToBody);
    }

    if (getCookie(cookieName) === cookieValue) {
        deleteCookie(cookieName);
    } else {
        setCookie(cookieName, cookieValue);
    }

};

settingsBlock.addEventListener("click", handleAllyButtonClick);

document.querySelector("#close-ally").addEventListener("click", toggleAllyBlockVisibility);


document.querySelector(".knd-header").addEventListener("click", (e) => {
    if (e.target.closest(".ally a") || e.target.closest("#close-ally")) {
        toggleAllyBlockVisibility();
    }
});

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(name, value, options = {}) {

    options = {
        path: "/",
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

function deleteCookie(name) {
    setCookie(name, "", {
        "max-age": -1
    });
}

// -----------------------------------

const enableSpeechBtn = document.querySelector("#ally-speech-show");
const disableSpeechBtn = document.querySelector("#ally-speech-hide");

const ref = {
    current: null,
};

if ("speechSynthesis" in window) {
    enableSpeechBtn.disabled = false;
    enableSpeechBtn.ariaLabel = enableSpeechBtn.dataset.speechExists;
    disableSpeechBtn.disabled = false;
    disableSpeechBtn.ariaLabel = disableSpeechBtn.dataset.speechExists;

    if (root.classList.contains('ally-speech-show')) {
        addSpeechListeners();
    }
} else {
    enableSpeechBtn.disabled = true;
    enableSpeechBtn.ariaLabel = enableSpeechBtn.dataset.speechError;
    disableSpeechBtn.disabled = true;
    disableSpeechBtn.ariaLabel = disableSpeechBtn.dataset.speechError;
}

function addSpeechListeners() {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener('keyup', handleKeyboardNavigation);
    chooseVariantOfSpeech(enableSpeechBtn);
}

function removeSpeechListeners() {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener('keyup', handleKeyboardNavigation);
}

function textToSpeech() {
    if (!ref.current) return;
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(ref.current);

    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[0];

    speechSynthesis.speak(utterance);
}

function chooseVariantOfSpeech(tag) {
    if (tag.closest('p')) {
        if (tag.closest('p').textContent === ref.current) {
            return;
        }
        ref.current = tag.closest('p').textContent;
        textToSpeech(ref.current);
    }
    else if (tag.closest('a')) {
        const anchor = tag.closest('a');
        if (anchor.ariaLabel) {
            const str = `Ссылка ${anchor.ariaLabel}`
            if (str !== ref.current) {
                ref.current = str;
                textToSpeech(ref.current);
            }
            return;
        }
        if (anchor.textContent) {
            const str = `Ссылка ${anchor.textContent}`
            if (str !== ref.current) {
                ref.current = str;
                textToSpeech(ref.current);
            }
            return;
        }
        if (anchor.href !== ref.current) {
            ref.current = `Ссылка ${anchor.href}`;
            textToSpeech(ref.current);
        }
    }
    else if (tag.closest('button')) {
        const btn = tag.closest('button');
        if (btn.ariaLabel) {
            const str = `Кнопка ${btn.ariaLabel}`
            if (str !== ref.current) {
                ref.current = str;
                textToSpeech(ref.current);

            }
            return;
        }
        if (btn.textContent) {
            const str = `Кнопка ${btn.textContent}`
            if (str !== ref.current) {
                ref.current = str;
                textToSpeech(ref.current);
            }
            return;
        }
        if (btn.href !== ref.current) {
            ref.current = `Кнопка ${btn.href}`;
            textToSpeech(ref.current);
        }
    }
    else if (tag.closest('h1')) {
        const str = `Заголовок первого уровня ${tag.closest('h1').textContent}`;
        if (str !== ref.current) {
            ref.current = str;
            textToSpeech(ref.current);
        }
    }
    else if (tag.closest('h2')) {
        const str = `Заголовок второго уровня ${tag.closest('h2').textContent}`;
        if (str !== ref.current) {
            ref.current = str;
            textToSpeech(ref.current);
        }
    }
    else if (tag.closest('h3')) {
        const str = `Заголовок третьего уровня ${tag.closest('h3').textContent}`;
        if (str !== ref.current) {
            ref.current = str;
            textToSpeech(ref.current);
        }
    }
    else if (tag.closest('h4')) {
        const str = `Заголовок четвертого уровня ${tag.closest('h4').textContent}`;
        if (str !== ref.current) {
            ref.current = str;
            textToSpeech(ref.current);
        }
    }
    else if (tag.closest('h5')) {
        const str = `Заголовок пятого уровня ${tag.closest('h5').textContent}`;
        if (str !== ref.current) {
            ref.current = str;
            textToSpeech(ref.current);
        }
    }
    else if (tag.closest('h6')) {
        const str = `Заголовок шестого уровня ${tag.closest('h6').textContent}`;
        if (str !== ref.current) {
            ref.current = str;
            textToSpeech(ref.current);
        }
    }
    else if (tag.closest("[aria-label]")) {
        const current = tag.closest("[aria-label]").ariaLabel;
        if (current === ref.current) {
            return;
        }
        ref.current = current;
        textToSpeech(ref.current);
    }
    else if (tag.closest("[aria-describedby]")) {
        const current = document.querySelector(`#${tag.closest("[aria-describedby]")
            .outerHTML
            .toString()
            .match(/aria-describedby="(?<tagId>[^"]+)"/i)
            .groups.tagId}`
        ).textContent;
        if (current === ref.current) return;
        ref.current = current;
        textToSpeech(ref.current);
    }
    else if (tag.closest("[aria-labelledby]")) {
        const current = document.querySelector(`#${tag.closest("[aria-labelledby]")
            .outerHTML
            .toString()
            .match(/aria-labelledby="(?<tagId>[^"]+)"/i)
            .groups.tagId}`
        ).textContent;
        if (current === ref.current) return;
        ref.current = current;
        textToSpeech(ref.current);
    }
    else {
        if (tag.textContent) {
            if (tag.textContent !== ref.current) {
                ref.current = tag.textContent;
                textToSpeech(ref.current);
            }
        }
        else {
            ref.current = null;
        }
    }
}

function handleMouseMove(e) {
    chooseVariantOfSpeech(e.target);
}

function handleKeyboardNavigation(e) {
    if (e.code === 'Tab' || e.code === 'ArrowUp' || e.code === 'ArrowDown') {
        chooseVariantOfSpeech(document.querySelector(':focus'))
    }
}