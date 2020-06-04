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
        const extra = result.extra;
        const ruleElem = document.createElement('div');
        ruleElem.classList.add('yap-rule', 'yap-rule_' + rule.type);

        const nameElem = document.createElement('div');
        nameElem.classList.add('yap-rule__name');
        nameElem.textContent = rule.name;
        if (extra && extra.type && 'positioned' === extra.type) {
            nameElem.title = 'Can be inserted';
            nameElem.classList.add('yap-_clickable');
            nameElem.onclick = () => {
                this._showExtra(null, ruleElem.parentNode.querySelector('.yap-result__extra'));
                this.insertCommentsHandler(result);
            }
        }

        const descriptionElem = document.createElement('div');
        descriptionElem.classList.add('yap-rule__description');
        descriptionElem.textContent = rule.description;
        descriptionElem.onclick = function (evt) {
            copyToClipboardText("[не сделано] " + evt.target.textContent);
        };

        const typeElem = document.createElement('div');
        typeElem.classList.add('yap-rule__type');
        typeElem.textContent = rule.type;
        typeElem.onclick = this._showExtra;

        ruleElem.append(nameElem, descriptionElem, typeElem);

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
        extraElem.classList.add('yap-_collapsed');

        this._extraFormatter.format(extraElem, result);

        return extraElem;
    }

    insertCommentsHandler = (result) => {
        alert('Inserting...');
        console.log(result);
    };

    _showExtra(evt, target) {
        const extraElem = null === evt ? target : evt.target.parentNode.parentNode.querySelector('.yap-result__extra');

        extraElem.classList.toggle('yap-_collapsed')
    }
}