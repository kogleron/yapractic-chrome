import {copyToClipboardText} from "../Utils/utils.js";

export default class ControlPanel {
    /**
     * @type {HTMLElement}
     */
    _checklistElem;

    constructor() {
        /**
         * @type {HTMLElement}
         */
        this._panelElem = null;
        /**
         * @type {HTMLElement}
         */
        this._resultsElem = null;
    }

    show() {
        const contentElem = document.createElement('div');
        contentElem.classList.add('yap-control-panel__content');
        contentElem.append(this._createResultsElem());

        const panelElem = document.createElement('div');
        panelElem.classList.add('yap-control-panel');
        panelElem.append(this._createHeader());
        panelElem.append(contentElem);

        document.querySelector('body').append(panelElem);

        this._panelElem = panelElem;
    }

    onRefreshHandler = () => {
        alert('Clicked')
    };

    _createResultsElem() {
        const resultsElem = document.createElement('div');
        resultsElem.classList.add('yap-results');

        if (this._resultsElem) {
            this._resultsElem.remove();
        }
        this._resultsElem = resultsElem;

        return resultsElem;
    }

    /**
     * @param {Array<HTMLElement>} elems
     */
    setResultElems(elems) {
        if (this._resultsElem) this._resultsElem.remove();

        this._panelElem.querySelector('.yap-control-panel__content')
            .append(this._createResultsElem());
        elems.forEach(elem => this._resultsElem.append(elem));
    }

    /**
     * @param {String} html
     */
    setChecklist(html) {
        if (this._checklistElem) this._checklistElem.remove();

        this._panelElem.querySelector('.yap-control-panel__content')
            .append(this._createChecklist(html));
    }

    _createHeader() {
        const headerElement = document.createElement('header');
        headerElement.classList.toggle('yap-header');

        const listElement = document.createElement('ul');
        listElement.classList.add('yap-header-toolbar');

        listElement.append(
            this._createGotoButton(),
            // this._createChecklistButton(),
            this._createRefreshButton(),
            this._createCloseButton(),
            this._createOpenButton()
        );
        headerElement.append(listElement);

        return headerElement;
    }

    _createOpenButton() {
        const openElem = document.createElement('li');
        openElem.classList.add('yap-header-toolbar__item', 'yap-_clickable', 'yap-header-toolbar__item_open');
        openElem.textContent = 'Открыть';
        openElem.onclick = () => this._onOpenCloseHandler();
        return openElem;
    }

    _createCloseButton() {
        const closeElem = document.createElement('li');
        closeElem.classList.add('yap-header-toolbar__item', 'yap-_clickable');
        closeElem.textContent = 'Закрыть';
        closeElem.onclick = () => this._onOpenCloseHandler();
        return closeElem;
    }

    _createGotoButton() {
        const gotoElem = document.createElement('li');
        gotoElem.classList.add('yap-header-toolbar__item', 'yap-_clickable');
        gotoElem.textContent = 'Перейти';
        gotoElem.onclick = this._onGotoHandler;
        return gotoElem;
    }

    _createRefreshButton() {
        const refreshElem = document.createElement('li');
        refreshElem.classList.add('yap-header-toolbar__item', 'yap-_clickable');
        refreshElem.textContent = 'Обновить';
        refreshElem.onclick = this.onRefreshHandler;
        return refreshElem;
    }

    _onGotoHandler() {
        document.evaluate(
            "//*[contains(text(), 'Код-ревью')]",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue.click();

        const mestoMaster = document.evaluate(
            "//*[contains(text(), 'mesto-master')]",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;
        mestoMaster.click();

        // let button = null;
        // let xpathResult = document.evaluate( "self::node()/child::div", AmestoMaster.parentNode.parentNode.parentNode, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null );
        //
        // while (button = xpathResult.iterateNext()){
        //     document.evaluate( "self::node()/descendant::button", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.click();
        // }
    }

    _onOpenCloseHandler() {
        this._panelElem.classList.toggle('yap-control-panel_closed');
        this._panelElem.querySelector('.yap-control-panel__content').classList.toggle('yap-_collapsed');
    }

    _createChecklistButton() {
        const button = document.createElement('li');
        button.classList.add('yap-header-toolbar__item', 'yap-_clickable');
        button.textContent = 'Чеклист';
        button.onclick = () => this.onChecklistHandler();
        return button;
    }

    onChecklistHandler = () => {
        alert('Clicked')
    };

    _createChecklist(html) {
        const checklistElem = document.createElement('div');
        checklistElem.innerHTML = html;
        checklistElem.classList.add('yap-checklist');

        if (this._checklistElem) {
            this._checklistElem.remove();
        }

        this._checklistElem = checklistElem;
        this._checklistElem.addEventListener('click', (evt) => {
            if (evt.target.nodeName !== 'LABEL') return;

            copyToClipboardText("- [`не сделано`] " + evt.target.textContent);
        });

        return checklistElem;
    }
}