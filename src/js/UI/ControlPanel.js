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
        const panelElem = document.createElement('div');
        panelElem.classList.add('yap-control-panel');

        const headElement = this._createHead();
        panelElem.append(headElement);

        document.querySelector('body').append(panelElem);

        this._panelElem = panelElem;

        this._createResults();
    }

    onRefreshHandler = () => {
        alert('Clicked')
    };

    _createResults() {
        const resultsElem = document.createElement('div');
        resultsElem.classList.add('yap-results');

        this._panelElem.append(resultsElem);

        if (this._resultsElem) {
            this._resultsElem.remove();
        }
        this._resultsElem = resultsElem;
    }

    /**
     * @param {Array<HTMLElement>} elems
     */
    setResultElems(elems) {
        this._createResults();
        elems.forEach(elem => this._resultsElem.append(elem));
    }

    _createHead() {
        const headerElement = document.createElement('header');
        headerElement.classList.toggle('yap-header');

        const refreshElem = document.createElement('span');
        refreshElem.classList.add('yap-_clickable');
        refreshElem.textContent = 'REFRESH';
        refreshElem.onclick = this.onRefreshHandler;

        const gotoElem = document.createElement('span');
        gotoElem.classList.add('yap-_clickable');
        gotoElem.textContent = 'GOTO';
        gotoElem.onclick = this._onGotoHandler;

        headerElement.append(refreshElem, gotoElem);

        return headerElement;
    }

    _onGotoHandler() {
        document.evaluate( "//*[contains(text(), 'Код-ревью')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.click();

        const mestoMaster = document.evaluate( "//*[contains(text(), 'mesto-master')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
        mestoMaster.click();

        // let button = null;
        // let xpathResult = document.evaluate( "self::node()/child::div", AmestoMaster.parentNode.parentNode.parentNode, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null );
        //
        // while (button = xpathResult.iterateNext()){
        //     document.evaluate( "self::node()/descendant::button", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.click();
        // }
    }
}