export default class AbstractExtraFormatter {
    /**
     * @param {object} extra
     * @return {boolean}
     */
    supports(extra) {
        throw "Define me";
    }

    /**
     * @param {HTMLElement} extraElem
     * @param {object} extra
     */
    format(extraElem, extra) {
        throw "Define me"
    }

}