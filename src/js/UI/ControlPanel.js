export default class ControlPanel {

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
        contentElem.append(this._createResults());

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

    _createResults() {
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
            .append(this._createResults());
        elems.forEach(elem => this._resultsElem.append(elem));
    }

    _createHeader() {
        const headerElement = document.createElement('header');
        headerElement.classList.toggle('yap-header');

        const listElement = document.createElement('ul');
        listElement.classList.add('yap-header-toolbar');

        const refreshElem = document.createElement('li');
        refreshElem.classList.add('yap-header-toolbar__item', 'yap-_clickable');
        refreshElem.textContent = 'Обновить';
        refreshElem.onclick = this.onRefreshHandler;

        const gotoElem = document.createElement('li');
        gotoElem.classList.add('yap-header-toolbar__item', 'yap-_clickable');
        gotoElem.textContent = 'Перейти';
        gotoElem.onclick = this._onGotoHandler;

        const closeElem = document.createElement('li');
        closeElem.classList.add('yap-header-toolbar__item', 'yap-_clickable');
        closeElem.textContent = 'Закрыть';
        closeElem.onclick = () => this._onOpenCloseHandler();

        const openElem = document.createElement('li');
        openElem.classList.add('yap-header-toolbar__item', 'yap-_clickable', 'yap-header-toolbar__item_open');
        openElem.textContent = 'Открыть';
        openElem.onclick = () => this._onOpenCloseHandler();

        listElement.append(gotoElem, refreshElem, closeElem, openElem);
        headerElement.append(listElement);

        return headerElement;
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
}