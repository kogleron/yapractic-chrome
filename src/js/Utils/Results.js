/**
 * @param {Array} results
 * @param {Result} elemClass
 * @param {function} insertCommentsHandler
 * @param {ExtraFormatter} extraFormatter
 */
export const resultsToElems = function (results, elemClass, insertCommentsHandler, extraFormatter) {
    const elems = [];

    results.sort(function (a, b) {
        if (!a) return 1;
        if (!b) return -1;
        if (a.rule.type === b.rule.type) return 0;
        if (a.rule.type === 'reject') return -1;
        if (a.rule.type === 'fix' && b.rule.type !== 'reject') return -1;

        return 1;
    });

    results.forEach(result => {
        if (null === result || result.result) return;

        const resultEntity = new elemClass(result, extraFormatter);
        resultEntity.insertCommentsHandler = insertCommentsHandler;
        elems.push(resultEntity.createElem());
    });

    return elems;
};