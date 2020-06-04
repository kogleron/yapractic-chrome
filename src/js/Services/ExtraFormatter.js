export default class ExtraFormatter {
    /**
     * @type {Array<AbstractExtraFormatter>}
     * @private
     */
    _formatters = [];

    constructor() {
        for (let i = 0; i < arguments.length; i++)
            this._formatters.push(arguments[i]);
    }

    /**
     * @param {HTMLElement} extraElem
     * @param {Result} result
     */
    format(extraElem, result) {
        this._formatters.every(
            formatter => {
                if (!formatter.supports(result)) {
                    return true;
                }

                formatter.format(extraElem, result);
                return false;
            }
        );
    }
}