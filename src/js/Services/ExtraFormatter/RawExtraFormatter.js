import AbstractExtraFormatter from "./AbstractExtraFormatter.js";

export default class RawExtraFormatter extends AbstractExtraFormatter {
    /**
     * @param {object} extra
     * @return {boolean}
     */
    supports(extra) {
        return true;
    }

    /**
     * @param {HTMLElement} extraElem
     * @param {object} extra
     */
    format(extraElem, extra) {
        const rawElem = document.createElement('div');
        rawElem.classList.add('.yap-result__extra-raw');
        rawElem.textContent = JSON.stringify(extra, null, 2);

        extraElem.append(rawElem);
    }
}