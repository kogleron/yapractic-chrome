import AbstractExtraFormatter from "./AbstractExtraFormatter.js";

export default class RawExtraFormatter extends AbstractExtraFormatter {
    supports(result) {
        return true;
    }

    format(extraElem, result) {
        const rawElem = document.createElement('div');
        rawElem.classList.add('.yap-result__extra-raw');
        rawElem.textContent = JSON.stringify(result.extra, null, 2);

        extraElem.append(rawElem);
    }
}