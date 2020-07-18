import {resultsToElems} from "./Utils/Results.js";
import {injectCss} from "./Utils/utils.js";
import ControlPanel from "./UI/ControlPanel.js";
import Result from "./UI/Result.js";
import CommentsManager from "./Services/CommentsManager.js";
import ExtraFormatter from "./Services/ExtraFormatter.js";
import RawExtraFormatter from "./Services/ExtraFormatter/RawExtraFormatter.js";
import PositionedExtraFormatter from "./Services/ExtraFormatter/PositionedExtraFormatter.js";
import FileBrowser from "./Services/FileBrowser.js";

import {URLS} from "./consts.js";

// noinspection JSUnusedGlobalSymbols
export function main() {
    injectCss(chrome.extension.getURL('/src/css/styles.css'));

    const commentsManager = new CommentsManager(new FileBrowser());
    const controlPanel = new ControlPanel();
    const extraFormatter = new ExtraFormatter(
        new PositionedExtraFormatter(commentsManager),
        new RawExtraFormatter()
    );

    controlPanel.onRefreshHandler = () => {
        fetch(URLS.results).then(response => response.json())
            .then(data => {
                controlPanel.setResultElems(resultsToElems(
                    data,
                    Result,
                    (result) => {
                        commentsManager.insertPositionedCommentsFromResult(result)
                    },
                    extraFormatter
                ));
            });
        fetch(URLS.checklistsFix).then(response => response.json())
            .then(data => controlPanel.setChecklist(data));
    };
    controlPanel.show();
}
