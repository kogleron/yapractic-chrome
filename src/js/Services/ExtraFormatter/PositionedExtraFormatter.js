import AbstractExtraFormatter from "./AbstractExtraFormatter.js";

export default class PositionedExtraFormatter extends AbstractExtraFormatter {
    /**
     * @type {CommentsManager}
     */
    _commentsManager;

    /**
     * @param {CommentsManager} commentsManager
     */
    constructor(commentsManager) {
        super();
        this._commentsManager = commentsManager;
    }

    supports(result) {
        // noinspection JSUnresolvedVariable
        return result.extra && result.extra.type
            && 'positioned' === result.extra.type && Array.isArray(result.extra.errors);
    }

    format(extraElem, result) {
        const blockElem = document.createElement('div');
        blockElem.classList.add('.yap-result__extra-positioned');

        extraElem.append(blockElem);

        // noinspection JSUnresolvedVariable
        result.extra.errors.forEach(error => blockElem.append(this._createErrorElem(error, result.rule)));
    }

    /**
     *
     * @param {Error} error
     * @param {Rule} rule
     * @return {HTMLElement}
     * @private
     */
    _createErrorElem(error, rule) {
        const errorElem = document.createElement('div');
        errorElem.classList.add('yap-error');

        const fileElement = document.createElement('div');
        fileElement.classList.add('yap-error__filepath');
        // noinspection JSValidateTypes
        fileElement.textContent = error.filePath.match(/[^/]+$/);

        errorElem.append(fileElement);

        // noinspection JSUnresolvedVariable
        error.messages.forEach(message => errorElem.append(this._createMessageBlock(message, error, rule)));

        return errorElem;
    }

    /**
     * @param {Message} message
     * @param {Error} error
     * @param {Rule} rule
     * @return {HTMLElement}
     * @private
     */
    _createMessageBlock(message, error, rule) {

        const block = document.createElement('div');
        block.classList.add('yap-error__message');

        block.append(
            this._createAddCommentElem(message, error, rule),
            this._createGotoElem(message, error, rule),
            this._createMessageElem(message)
        );

        return block;
    }

    _createMessageElem(message) {
        const element = document.createElement('span');
        element.textContent = " " + message.message;
        element.classList.add('yap-error__message-message');
        return element;
    }

    _createGotoElem(message, error, rule) {
        const element = document.createElement('span');
        element.classList.add('yap-error__message-goto', 'yap-_clickable');
        element.textContent = message.line + ":" + message.column;
        element.onclick = () => {
            this._commentsManager.showErrorMessage(error, message, rule,true)
        };
        return element;
    }

    /**
     * @param {Message} message
     * @param {Error} error
     * @param {Rule} rule
     * @return {HTMLElement}
     * @private
     */
    _createAddCommentElem(message, error, rule) {
        const element = document.createElement('span');
        element.classList.add('yap-error__message-add-comment', 'yap-_clickable');
        element.textContent = "[+]";
        element.onclick = () => {
            this._commentsManager.addComment(rule, error, message, true);
        };
        return element;
    }
}