import {copyToClipboardText} from "../Utils/utils.js";

export default class CommentsManager {

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

    showErrorMessage(error, message, scrollTo) {
        const filename = this._getFileNameFromError(error);
        const block = this._getFileBlock(filename);

        this._openBlock(filename, block);

        // noinspection JSUnresolvedVariable
        const lineElem = this._showMessage(message, block);

        if (scrollTo) {
            lineElem.scrollIntoView();
        }
    }

    /**
     * @param {Rule} rule
     * @param {Error} error
     * @param {Message} message
     * @param {boolean} scrollTo
     */
    addComment(rule, error, message, scrollTo) {
        copyToClipboardText("[не сделано] " + rule.description + " (" + message.message + ")");
    }

    _processError(error) {
        const filename = this._getFileNameFromError(error);
        const block = this._getFileBlock(filename);

        this._openBlock(filename, block);

        // noinspection JSUnresolvedVariable
        error.messages.forEach(message => this._showMessage(message, block));
    }

    _getFileNameFromError(error) {
        return error.filePath.match(/[^/]+$/);
    }

    /**
     * @param {String} filename
     * @return {Node}
     */
    _getFileBlock(filename) {
        return document.evaluate(
            "//div[contains(text(), '" + filename + "')]/ancestor::button",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue.parentNode;
    }

    _openBlock(filename, block) {
        const result = document.evaluate(
            "self::node()/descendant::div[text()  = '1']",
            block,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE
        );

        if (result.singleNodeValue) return;

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

        if (!lineElem.parentNode.querySelector('.yap-tooltiptext')) {
            const tooltipTextElem = document.createElement('span');
            tooltipTextElem.classList.add('yap-tooltiptext');
            tooltipTextElem.textContent = message.message;
            lineElem.parentNode.append(tooltipTextElem);
        }

        console.log(lineElem);
        return lineElem;
    }
}