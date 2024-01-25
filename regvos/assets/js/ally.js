const settingsBlock = document.querySelector("#ally-settings");
const triggerAnchors = document.querySelectorAll(".ally a");

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
    document.body.classList.remove(...classes);
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
            document.addEventListener("mousemove", handleMouseMove);
        }
    }

    const classToBody = `${cookieName}-${cookieValue}`;

    if (document.body.classList.contains(classToBody)) {
        document.body.classList.remove(classToBody);
    } else {
        customClearBodyClasses(cookieName);
        document.body.classList.add(classToBody);
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
} else {
    enableSpeechBtn.disabled = true;
    enableSpeechBtn.ariaLabel = enableSpeechBtn.dataset.speechError;
    disableSpeechBtn.disabled = true;
    disableSpeechBtn.ariaLabel = disableSpeechBtn.dataset.speechError;
}

function removeSpeechListeners() {
    document.removeEventListener("mousemove", handleMouseMove);
}

function textToSpeech() {
    if (!ref.current) return;

    const utterance = new SpeechSynthesisUtterance(ref.current);

    // Select a voice
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[0]; // Choose a specific voice

    // Speak the text
    speechSynthesis.speak(utterance);
}

function handleMouseMove(e) {
    if (e.target.closest('p')) {
        if (e.target.closest('p').textContent === ref.current) {
            return;
        }
        ref.current = e.target.closest('p').textContent;
        // console.log('text content ---> ', ref.current);
        textToSpeech(ref.current);
    }
    else if (e.target.closest('a')) {
        const anchor = e.target.closest('a');
        if (anchor.ariaLabel) {
            const str = `Ссылка ${anchor.ariaLabel}`
            if (str !== ref.current) {
                ref.current = str;
                // console.log('anchor ariaLabel ---> ', ref.current);
                textToSpeech(ref.current);
            }
            return;
        }
        if (anchor.textContent) {
            const str = `Ссылка ${anchor.textContent}`
            if (str !== ref.current) {
                ref.current = str;
                // console.log('anchor textContent ---> ', ref.current);
                textToSpeech(ref.current);
            }
            return;
        }
        if (anchor.href !== ref.current) {
            ref.current = `Ссылка ${anchor.href}`;
            // console.log('anchor href ---> ', ref.current);
            textToSpeech(ref.current);
        }
    }
    else if (e.target.closest('button')) {
        const btn = e.target.closest('button');
        if (btn.ariaLabel) {
            const str = `Кнопка ${btn.ariaLabel}`
            if (str !== ref.current) {
                ref.current = str;
                // console.log('btn ariaLabel ---> ', ref.current);
                textToSpeech(ref.current);

            }
            return;
        }
        if (btn.textContent) {
            const str = `Кнопка ${btn.textContent}`
            if (str !== ref.current) {
                ref.current = str;
                // console.log('btn textContent ---> ', ref.current);
                textToSpeech(ref.current);
            }
            return;
        }
        if (btn.href !== ref.current) {
            ref.current = `Кнопка ${btn.href}`;
            // console.log('btn href ---> ', ref.current);
            textToSpeech(ref.current);
        }
    }
    else if (e.target.closest('h1')) {
        const str = `Заголовок первого уровня ${e.target.closest('h1').textContent}`;
        if (str !== ref.current) {
            ref.current = str;
            // console.log('header 1 ---> ', ref.current);
            textToSpeech(ref.current);
        }
    }
    else if (e.target.closest('h2')) {
        const str = `Заголовок второго уровня ${e.target.closest('h2').textContent}`;
        if (str !== ref.current) {
            ref.current = str;
            // console.log('header 2 ---> ', ref.current);
            textToSpeech(ref.current);
        }
    }
    else if (e.target.closest('h3')) {
        const str = `Заголовок третьего уровня ${e.target.closest('h3').textContent}`;
        if (str !== ref.current) {
            ref.current = str;
            // console.log('header 3 ---> ', ref.current);
            textToSpeech(ref.current);
        }
    }
    else if (e.target.closest('h4')) {
        const str = `Заголовок четвертого уровня ${e.target.closest('h4').textContent}`;
        if (str !== ref.current) {
            ref.current = str;
            // console.log('header 4 ---> ', ref.current);
            textToSpeech(ref.current);
        }
    }
    else if (e.target.closest('h5')) {
        const str = `Заголовок пятого уровня ${e.target.closest('h5').textContent}`;
        if (str !== ref.current) {
            ref.current = str;
            // console.log('header 5 ---> ', ref.current);
            textToSpeech(ref.current);
        }
    }
    else if (e.target.closest('h6')) {
        const str = `Заголовок шестого уровня ${e.target.closest('h6').textContent}`;
        if (str !== ref.current) {
            ref.current = str;
            // console.log('header 6 ---> ', ref.current);
            textToSpeech(ref.current);
        }
    }
    else if (e.target.closest("[aria-label]")) {
        const current = e.target.closest("[aria-label]").ariaLabel;
        if (current === ref.current) {
            return;
        }
        ref.current = current;
        // console.log("aria-label ---> ", ref.current);
        textToSpeech(ref.current);
    }
    else if (e.target.closest("[aria-describedby]")) {
        const current = document.querySelector(`#${e.target.closest("[aria-describedby]")
            .outerHTML
            .toString()
            .match(/aria-describedby="(?<tagId>[^"]+)"/i)
            .groups.tagId}`
        ).textContent;
        if (current === ref.current) return;
        ref.current = current;
        // console.log('aria-labelledby ---> ',ref.current)
        textToSpeech(ref.current);
    }
    else if (e.target.closest("[aria-labelledby]")) {
        const current = document.querySelector(`#${e.target.closest("[aria-labelledby]")
            .outerHTML
            .toString()
            .match(/aria-labelledby="(?<tagId>[^"]+)"/i)
            .groups.tagId}`
        ).textContent;
        if (current === ref.current) return;
        ref.current = current;
        // console.log('aria-labelledby ---> ',ref.current);
        textToSpeech(ref.current);
    }
    else {
        if (e.target.textContent) {
            if (e.target.textContent !== ref.current) {
                ref.current = e.target.textContent;
                // console.log('simple text ---> ', ref.current);
                textToSpeech(ref.current);
            }
        }
        else {
            ref.current = null;
        }
    }
}
