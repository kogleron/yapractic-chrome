import {fetchResults, resultsToElems} from "./Utils/Results.js";
import {injectCss} from "./Utils/utils.js";
import ControlPanel from "./UI/ControlPanel.js";
import Result from "./UI/Result.js";
import CommentsManager from "./Services/CommentsManager.js";
import ExtraFormatter from "./Services/ExtraFormatter.js";
import RawExtraFormatter from "./Services/ExtraFormatter/RawExtraFormatter.js";
import PositionedExtraFormatter from "./Services/ExtraFormatter/PositionedExtraFormatter.js";

// noinspection JSUnusedGlobalSymbols
export function main() {
    injectCss(chrome.extension.getURL('/src/css/styles.css'));

    const commentsManager = new CommentsManager();
    const controlPanel = new ControlPanel();
    const extraFormatter = new ExtraFormatter(
        new PositionedExtraFormatter(commentsManager),
        new RawExtraFormatter());

    controlPanel.onRefreshHandler = () => {
        fetchResults().then(data => {
            controlPanel.setResultElems(resultsToElems(
                data,
                Result,
                (result) => {
                    commentsManager.insertPositionedCommentsFromResult(result)
                },
                extraFormatter
            ));
        });
    };
    controlPanel.show();
    controlPanel.onRefreshHandler();
}
