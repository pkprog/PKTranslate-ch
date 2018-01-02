const PK_TRANSLATE_APP_NAME = "PKTranslate.options";
const PK_TRANSLATE_OPTIONS_INPUT_ID_YANDEX_API_KEY = "#yandexApiKey";
const PK_TRANSLATE_OPTIONS_SAVE_BADGE_ID = "#yandexApiKeySavedBadge";
const PK_TRANSLATE_OPTIONS_SAVE_BUTTON_ID = "#yandexApiKeySaveButton";

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
    if (!!apiKey) {} else apiKey = "";
    document.querySelector(PK_TRANSLATE_OPTIONS_INPUT_ID_YANDEX_API_KEY).value = apiKey;
    document.querySelector(PK_TRANSLATE_OPTIONS_SAVE_BADGE_ID).style.display = "none";
}

function saveOnSubmit(e) {
    saveOptions();
    e.preventDefault();
    document.querySelector(PK_TRANSLATE_OPTIONS_SAVE_BADGE_ID).style.display = "inline";
}

function changedInputYandexApiKey(e) {
    document.querySelector(PK_TRANSLATE_OPTIONS_SAVE_BADGE_ID).style.display = "none";
}

// document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector(PK_TRANSLATE_OPTIONS_SAVE_BUTTON_ID).addEventListener("click", saveOnSubmit);
document.querySelector(PK_TRANSLATE_OPTIONS_INPUT_ID_YANDEX_API_KEY).addEventListener("change", changedInputYandexApiKey);
document.querySelector(PK_TRANSLATE_OPTIONS_INPUT_ID_YANDEX_API_KEY).addEventListener("keypress", changedInputYandexApiKey);
