const PK_TRANSLATE_APP_NAME = "PKTranslate.background";

function logDebug(text) {
    serviceFunctions.logDebugApplication(PK_TRANSLATE_APP_NAME, text);
}

function logError(text) {
    serviceFunctions.logErrorApplication(PK_TRANSLATE_APP_NAME, text);
}

logDebug("loaded");

/**
 * Click button "Translate"
 */
function askForSelectedText() {
    chrome.tabs.query({currentWindow: true, active: true}, function(result) {
        logDebug("message send to content_script script");
        chrome.tabs.sendMessage(result[0].id, {
            command: COMMANDS.BG_TAKE_SELECTED_TEXT
        });
    });
}

/*
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
function reportExecuteScriptError(error) {
    // document.querySelector("#popup-content").classList.add("hidden");
    // document.querySelector("#error-content").classList.remove("hidden");
    logError("Failed to execute PKTranslate content script: ${error.message}");
}*/

//******************************************************************************
/**
 * Listen for messages from the content_script.
 */
chrome.runtime.onMessage.addListener((message) => {
    logDebug("message received with command:" + message.command);
    if (message.command === COMMANDS.PANEL_SCRIPT_LOADED) {
        logDebug("message "+ COMMANDS.PANEL_SCRIPT_LOADED +" received from panel_script script");
        askForSelectedText();
    } else
    if (message.command === COMMANDS.CS_RETURN_SELECTED_TEXT) {
        logDebug("message "+ COMMANDS.PANEL_SCRIPT_LOADED +" received from content_script script");
        const selected = message.selected;
        logDebug("Selected text:" + selected);

        getOptions(function(apiKey){
            if (!serviceFunctions.isDefined(apiKey) || apiKey === null || apiKey.length === 0) {
                logError("Yandex API key value not defined");
                chrome.runtime.sendMessage(null, {
                    command: COMMANDS.PANEL_TRANSLATED_TEXT,
                    text: "Не указан Yandex API key"
                });
            } else {
                translatorByYandex.doTranslate(selected, apiKey, function (text) {
                    logDebug("Get translated text: " + text);

                    chrome.runtime.sendMessage(null, {
                        command: COMMANDS.PANEL_TRANSLATED_TEXT,
                        text: text
                    });
                });
            }
        });
    }
});

function getOptions(doAfterRestoreFunction) {
    let apiKey = localStorage[PK_TRANSLATE_OPTIONS_KEY_YANDEX_API_KEY];
    logDebug("Restored options: key=" + apiKey);
    doAfterRestoreFunction(apiKey);
}

/*
chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function(resultTabOfQuery) {
        chrome.tabs.create({
            "url": "http://dev.opera.com"
        });
    });
});*/
