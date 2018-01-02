const PK_TRANSLATE_APP_NAME = "PKTranslate.options";
const PK_TRANSLATE_OPTIONS_INPUT_ID_YANDEX_API_KEY = "#yandexApiKey";

function logDebug(text) {
    serviceFunctions.logDebugApplication(PK_TRANSLATE_APP_NAME, text);
}

function logError(text) {
    serviceFunctions.logErrorApplication(PK_TRANSLATE_APP_NAME, text);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
//////////////////////////////////////////////////////////////////////

function saveOptions() {
    let apiKey = document.querySelector(PK_TRANSLATE_OPTIONS_INPUT_ID_YANDEX_API_KEY).value;
    logDebug("Saving options: key=" + apiKey);
    localStorage[PK_TRANSLATE_OPTIONS_KEY_YANDEX_API_KEY] = apiKey;
}

function restoreOptions() {
    let apiKey = localStorage[PK_TRANSLATE_OPTIONS_KEY_YANDEX_API_KEY];
    logDebug("Restored options: key=" + apiKey);
    document.querySelector(PK_TRANSLATE_OPTIONS_INPUT_ID_YANDEX_API_KEY).value = apiKey;
}

function saveOnSubmit(e) {
    saveOptions();
    e.preventDefault();
}

// document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOnSubmit);
