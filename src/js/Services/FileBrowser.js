export default class FileBrowser {
    /**
     * @param {String}folder
     * @return {Node|HTMLElement}
     */
    _findFolderElement(folder) {
        return document.evaluate(
            "//div[contains(text(), '" + folder + "')]/ancestor::button",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue
    };

    /**
     * @param {HTMLElement} folderElem
     * @return {boolean}
     */
    _isOpenedFolderElement(folderElem) {
        return null !== folderElem.nextElementSibling
    };

    /**
     * @param {HTMLElement} folderElem
     */
    _openFolderElement(folderElem) {
        folderElem.click();
    };

    /**
     * @param {String} path
     */
    openPath(path) {

        const pathParts = ('mesto-master' + path).split('/');
        let filename = null;

        while (pathParts.length) {
            filename = pathParts.shift();
            if (!pathParts.length) {
                break;
            }

            const folderElem = this._findFolderElement(filename);
            if (!folderElem) throw "Could not find " + filename;
            if (this._isOpenedFolderElement(folderElem)) continue;
            this._openFolderElement(folderElem);
        }
    }
}