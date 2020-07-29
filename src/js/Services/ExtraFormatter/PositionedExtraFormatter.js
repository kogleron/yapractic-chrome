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
     * @param {ErrorInfo} error
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
        fileElement.textContent = error.filePath;

        errorElem.append(fileElement);

        // noinspection JSUnresolvedVariable
        error.messages.forEach(message => errorElem.append(this._createMessageBlock(message, error, rule)));

        return errorElem;
    }

    /**
     * @param {Message} message
     * @param {ErrorInfo} error
     * @param {Rule} rule
     * @return {HTMLElement}
     * @private
     */
    _createMessageBlock(message, error, rule) {

        const block = document.createElement('div');
        block.classList.add('yap-error__message');

        block.append(
            this._createGotoElem(message, error, rule),
            this._createMessageElem(message, error, rule)
        );

        return block;
    }

    /**
     * @param {Message} message
     * @param {ErrorInfo} error
     * @param {Rule} rule
     * @return {HTMLSpanElement}
     * @private
     */
    _createMessageElem(message, error, rule) {
        const element = document.createElement('span');
        element.textContent = message.message;
        element.classList.add('yap-error__message-message');
        element.title = 'Добавить комментарий';
        element.onclick = () => {
            this._commentsManager.showErrorMessage(error, message, rule);
        };

        return element;
    }

    /**
     * Creates button by clicking on it comment with error will be inserted.
     * @param {Message} message
     * @param {ErrorInfo} error
     * @param {Rule} rule
     * @return {HTMLSpanElement}
     * @private
     */
    _createGotoElem(message, error, rule) {
        const element = document.createElement('span');
        element.classList.add('yap-error__goto', 'yap-_clickable');
        element.textContent = " - [" + message.line + ":" + message.column + "]";
        element.title = 'Перейти к строке';
        element.onclick = () => {
            this._commentsManager.gotoToErrorLine(error, message, rule);
        };
        return element;
    }

    /**
     * @param {Result} result
     * @return boolean
     */
    collapsed(result) {
        return false;
    }
}