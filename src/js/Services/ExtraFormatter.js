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
     * @param {object} extra
     */
    format(extraElem, extra) {
        this._formatters.every(
            formatter => {
                if(!formatter.supports(extra)){
                    return true;
                }

                formatter.format(extraElem, extra);
                return false;
            }
        );
    }
}