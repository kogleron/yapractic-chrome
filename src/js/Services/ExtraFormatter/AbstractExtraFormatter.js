export default class AbstractExtraFormatter {
    /**
     * @return {boolean}
     * @param {Result} result
     */
    supports(result) {
        throw "Define me";
    }

    /**
     * @param {HTMLElement} extraElem
     * @param {Result} result
     */
    format(extraElem, result) {
        throw "Define me"
    }

    /**
     * @param {Result} result
     * @return boolean
     */
    collapsed(result) {
        return true;
    }
}