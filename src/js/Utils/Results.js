/**
 * @param {Array} results
 * @param {Result} elemClass
 * @param {function} insertCommentsHandler
 * @param {ExtraFormatter} extraFormatter
 */
export const resultsToElems = function (results, elemClass, insertCommentsHandler, extraFormatter) {
    const elems = [];

    results.forEach(result => {
        if (null === result || result.result) return;

        const resultEntity = new elemClass(result, extraFormatter);
        resultEntity.insertCommentsHandler = insertCommentsHandler;
        elems.push(resultEntity.createElem());
    });

    return elems;
};