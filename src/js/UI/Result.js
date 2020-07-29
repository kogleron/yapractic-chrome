import {copyToClipboardText} from "../Utils/utils.js";

export default class Result {
    /**
     * @type {AbstractExtraFormatter}
     */
    _extraFormatter;

    constructor(data, extraFormatter) {
        this._data = data;
        this._extraFormatter = extraFormatter;
    }

    /**
     * @return {HTMLElement}
     */
    createElem() {
        return this._createResult(this._data);
    }

    /**
     * @param result
     * @return {HTMLElement}
     * @private
     */
    _createResult(result) {
        const resultElem = document.createElement('div');
        resultElem.classList.add('yap-result');
        resultElem.append(
            this._createRule(result),
            this._createExtra(result)
        );

        return resultElem;
    }

    /**
     * @return {HTMLElement}
     * @private
     */
    _createRule(result) {
        const rule = result.rule;
        const ruleElem = document.createElement('div');
        ruleElem.classList.add('yap-rule', 'yap-rule_' + rule.type);

        const descriptionElem = document.createElement('div');
        descriptionElem.classList.add('yap-rule__description');
        descriptionElem.textContent = rule.description;
        descriptionElem.onclick = function (evt) {
            copyToClipboardText("* [`не сделано`] " + evt.target.textContent);
        };

        const typeElem = document.createElement('div');
        typeElem.classList.add('yap-rule__type');
        typeElem.textContent = rule.type;
        typeElem.title = rule.name + ':' + ruleElem.type;
        typeElem.onclick = (evt) => {
            copyToClipboardText(rule.name);
            this._showExtra(evt);
        };

        ruleElem.append(descriptionElem, typeElem);

        return ruleElem;
    }

    /**
     * @return {HTMLElement}
     * @private
     * @param {Result} result
     */
    _createExtra(result) {
        const extraElem = document.createElement('div');
        extraElem.classList.add('yap-result__extra');
        if (this._extraFormatter.collapsed(result)) {
            extraElem.classList.add('yap-_collapsed');
        }

        this._extraFormatter.format(extraElem, result);

        return extraElem;
    }

    _showExtra(evt, target) {
        const extraElem = null === evt ? target : evt.target.parentNode.parentNode.querySelector('.yap-result__extra');

        extraElem.classList.toggle('yap-_collapsed')
    }
}