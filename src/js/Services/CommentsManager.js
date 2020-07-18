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

        // let tbutton = document.evaluate("//div[contains(text(), 'Card.js')]/ancestor::button", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        // // tbutton.click();
        //
        // let tnode;
        // let tresult = document.evaluate("self::node()/descendant::div[text() != '' and translate(text(), '0123456789', '') = '']", tbutton.parentNode, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
        // while (tnode = tresult.iterateNext()){
        //     console.log(tnode);
        // }
    }

    showErrorMessage(error, message, rule, scrollTo) {
        copyToClipboardText("[не сделано] " + rule.description + " (" + message.message + ")");

        const filename = error.filePath;
        const block = this._getFileBlock(filename);

        if (!block) {
            return;
        }
        this._openBlock(filename, block);

        // noinspection JSUnresolvedVariable
        const lineElem = this._showMessage(message, block);

        if (scrollTo) {
            lineElem.scrollIntoView();
        }
    }

    _processError(error) {
        const filename = this._getFileNameFromError(error);
        const block = this._getFileBlock(filename);

        this._openBlock(filename, block);

        // noinspection JSUnresolvedVariable
        // error.messages.forEach(message => this._showMessage(message, block));
    }

    _getFileNameFromError(error) {
        return error.filePath.match(/[^/]+$/);
    }

    /**
     * @param {String} pathname
     * @return {Node}
     */
    _getFileBlock(pathname) {
        const filename = pathname.split('/').reverse().shift();

        this._fileBrowser.openPath(pathname);

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
    _openBlock(pathname, block) {
        const result = document.evaluate(
            "self::node()/descendant::div[text()  = '1']",
            block,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE
        );

        if (result.singleNodeValue) return;

        const filename = pathname.split('/').reverse().shift();
        document.evaluate(
            "//div[contains(text(), '" + filename + "')]/ancestor::button",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue.click();
    }

    /**
     * @param message
     * @param block
     * @return {HTMLElement}
     * @private
     */
    _showMessage(message, block) {
        const line = message.line;
        const lineElem = document.evaluate(
            "self::node()/descendant::div[text()  = '" + line + "']",
            block,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE
        ).singleNodeValue;
        lineElem.style.backgroundColor = "#f86c6b";
        lineElem.parentNode.classList.add('yap-tooltip');
        lineElem.title = message.message;

        // this.addTooltip(lineElem, message);

        return lineElem;
    }

    addTooltip(lineElem, message) {
        if (lineElem.parentNode.querySelector('.yap-tooltiptext')) {
            return;
        }

        const tooltipTextElem = document.createElement('span');
        tooltipTextElem.classList.add('yap-tooltiptext');
        tooltipTextElem.textContent = message.message;
        lineElem.parentNode.append(tooltipTextElem);
    }
}