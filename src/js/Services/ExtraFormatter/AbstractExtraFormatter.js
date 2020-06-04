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

}