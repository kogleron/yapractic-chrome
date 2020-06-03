import AbstractExtraFormatter from "./AbstractExtraFormatter.js";

export default class PositionedExtraFormatter extends AbstractExtraFormatter {
    _commentsManager;

    /**
     * @param {CommentsManager} commentsManager
     */
    constructor(commentsManager) {
        super();
        this._commentsManager = commentsManager;
    }

    /**
     * @param {object} extra
     * @return {boolean}
     */
    supports(extra) {
        return extra && extra.type && 'positioned' === extra.type;
    }

    /**
     * @param {HTMLElement} extraElem
     * @param {object} extra
     */
    format(extraElem, extra) {
        const blockElem = document.createElement('div');
        blockElem.classList.add('.yap-result__extra-positioned');

        extraElem.append(blockElem);

        // noinspection JSUnresolvedVariable
        extra.errors.forEach(error => blockElem.append(this._createErrorElem(error)));
    }

    /**
     *
     * @param {object} error
     * @return {HTMLElement}
     * @private
     */
    _createErrorElem(error) {
        const errorElem = document.createElement('div');
        errorElem.classList.add('yap-error');

        const fileElement = document.createElement('div');
        fileElement.classList.add('yap-error__filepath');
        fileElement.textContent = error.filePath.match(/[^/]+$/);

        errorElem.append(fileElement);

        // noinspection JSUnresolvedVariable
        error.messages.forEach(message => errorElem.append(this._createMessageElem(message, error)));

        return errorElem;
    }

    /**
     * @param {object} message
     * @param error
     * @return {HTMLElement}
     * @private
     */
    _createMessageElem(message, error) {
        const block = document.createElement('div');
        block.classList.add('yap-error__message');

        const gotoElem = document.createElement('span');
        gotoElem.classList.add('yap-error__message-goto', 'yap-_clickable');
        gotoElem.textContent = message.line + ":" + message.column;
        gotoElem.onclick = () => {
            this._commentsManager.showErrorMessage(error, message, true)
        };

        const messageElem = document.createElement('span');
        messageElem.textContent = " " + message.message;
        messageElem.classList.add('yap-error__message-message');

        block.append(gotoElem, messageElem);

        return block;
    }
}