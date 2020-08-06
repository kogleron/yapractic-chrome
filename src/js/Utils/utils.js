export function injectCss(file) {
    var link = document.createElement("link");
    link.href = file;
    link.type = "text/css";
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link);
}

export function copyToClipboardElementText(elem) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(elem);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("Copy");
}

export function copyToClipboardText(text) {
    const dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    dummy.style.position = 'absolute';
    dummy.style.left = '-1000px';
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

/**
 * Copies to clipboard given text and prepares it for insertion:
 *  - replaces `- ` with `* `
 *
 * @param {String} text
 */
export function copyToClipboardComment(text) {

    text = text.replace('- ', '* ');

    copyToClipboardText(text);
}