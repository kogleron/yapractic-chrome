import AbstractExtraFormatter from "./AbstractExtraFormatter.js";
import {copyToClipboardText} from "../../Utils/utils.js";

export default class SimpleErrorFormatter extends AbstractExtraFormatter {
    supports(result) {
        console.log(result);
        return result.extra && result.extra.type
            && 'simple_error' === result.extra.type;
    }

    format(extraElem, result) {
        const errorElem = document.createElement('div');
        errorElem.classList.add('yap-error');

        const rawElem = document.createElement('div');
        rawElem.classList.add('yap-result__extra-simple_error');
        rawElem.textContent = result.extra.message;
        rawElem.onclick = () => {
            copyToClipboardText("[не сделано] " + result.rule.description
                + "\n "
                + (result.extra.message.includes('- ') ? "" : " - ")
                + result.extra.message);
        };

        errorElem.append(rawElem);
        extraElem.append(errorElem);
    }

    /**
     * @param {Result} result
     * @return boolean
     */
    collapsed(result) {
        return false;
    }
}