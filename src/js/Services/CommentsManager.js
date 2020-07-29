import {copyToClipboardText} from "../Utils/utils.js";

export default class CommentsManager {

    /**
     * @param {FileBrowser} fileBrowser
     */
    constructor(fileBrowser) {
        this._fileBrowser = fileBrowser;
    }

    insertPositionedCommentsFromResult(result) {
        console.log('From comments manager', result);

        // noinspection JSUnresolvedVariable
        const errors = result.extra.errors;

        errors.forEach(error => this._processError(error));
    }

    /**
     * @param {ErrorInfo} error
     * @param {Message} message
     * @param {Rule} rule
     * @return {HTMLElement}
     */
    gotoToErrorLine(error, message, rule) {
        copyToClipboardText("* [`не сделано`] " + rule.description + " (" + message.message + ")");

        const filename = error.filePath;
        const block = this._getFileBlock(filename);

        if (!block) {
            throw "Could not get file block";
        }

        if (!this._isFileCodeOpened(block)) {
            this._openFileCode(filename, block);
        }

        const lineElem = this._highlightLine(message, block);

        lineElem.scrollIntoView();

        return lineElem;
    }

    /**
     * @param {ErrorInfo} error
     * @param {Message} message
     * @param {Rule} rule
     */
    showErrorMessage(error, message, rule) {
        const lineElem = this.gotoToErrorLine(error, message, rule);

        setTimeout(() => {
            this._postComment(lineElem, rule, message);
        }, 1000);
    }

    /**
     * @param {HTMLElement} lineElem
     * @param {Rule} rule
     * @param {Message} message
     * @private
     */
    _postComment(lineElem, rule, message) {
        this._openCommentDialog(lineElem);
        setTimeout(() => {
            this._setCommentType(lineElem, rule);
            setTimeout(() => {
                this._setComment(lineElem, message, rule);
                setTimeout(() => {
                    this._sendComment(lineElem);
                }, 500);
            }, 500);

        }, 1000);
    }

    _processError(error) {
        const filename = this._getFileNameFromError(error);
        const block = this._getFileBlock(filename);

        if (!this._isFileCodeOpened(block)) {
            this._openFileCode(filename, block);
        }
    }

    _getFileNameFromError(error) {
        return error.filePath.match(/[^/]+$/);
    }

    /**
     * @param {String} pathname
     * @return {HTMLElement}
     */
    _getFileBlock(pathname) {
        const filename = pathname.split('/').reverse().shift();

        this._fileBrowser.openPath(pathname);

        // noinspection JSValidateTypes
        return document.evaluate(
            "//div[contains(text(), '" + filename + "')]/ancestor::button",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue.parentNode;
    }

    /**
     * @param {String} pathname
     * @param {HTMLElement} block
     * @private
     */
    _openFileCode(pathname, block) {
        const filename = pathname.split('/').reverse().shift();
        // noinspection JSUnresolvedFunction
        document.evaluate(
            "//div[contains(text(), '" + filename + "')]/ancestor::button",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue.click();
    }

    /**
     * @param {HTMLElement} block
     * @return {boolean}
     * @private
     */
    _isFileCodeOpened(block) {
        const result = document.evaluate(
            "self::node()/child::button/following-sibling::div/descendant::div[text()  = '1']",
            block,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE
        ).singleNodeValue;
        return null !== result;
    }

    /**
     * @param message
     * @param block
     * @return {HTMLElement}
     * @private
     */
    _highlightLine(message, block) {
        const line = message.line;
        const lineElem = document.evaluate(
            "self::node()/descendant::div[text()  = '" + line + "']",
            block,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE
        ).singleNodeValue;
        lineElem.style.backgroundColor = "#f86c6b";
        // noinspection JSUnresolvedVariable
        lineElem.parentNode.classList.add('yap-tooltip');
        lineElem.title = message.message;

        // noinspection JSValidateTypes
        return lineElem;
    }

    /**
     * @param {HTMLElement} lineElem
     * @private
     */
    _openCommentDialog(lineElem) {
        // noinspection JSUnresolvedFunction
        document.evaluate(
            "self::node()/following-sibling::code",
            lineElem,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE
        ).singleNodeValue.click();
    }

    /**
     * @param {HTMLElement} lineElem
     * @param message
     * @param rule
     * @private
     */
    _setComment(lineElem, message, rule) {
        const comment = "[`не сделано`] " + rule.description + "\n - " + message.message + "\n";
        const textAreaElement = document.evaluate(
            "self::node()/parent::div/descendant::textarea",
            lineElem,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE
        ).singleNodeValue;

        textAreaElement.value = comment;
        textAreaElement.dispatchEvent(new Event('input', {
            view: window,
            bubbles: true,
            cancelable: true
        }))
    }

    _setCommentType(lineElem, rule) {

        const label = rule.type === 'fix' ? "Надо исправить" : "Можно лучше";
        // noinspection JSUnresolvedFunction
        document.evaluate(
            "self::node()/parent::div/descendant::span[contains(text(), '" + label + "')]",
            lineElem,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE
        ).singleNodeValue.click()
    }

    _sendComment(lineElem) {
        const submitButton = document.evaluate(
            "self::node()/parent::div/descendant::span[contains(text(), 'Комментировать')]/ancestor::button",
            lineElem,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE
        ).singleNodeValue;
        console.log(submitButton);
        submitButton.click();
    }
}