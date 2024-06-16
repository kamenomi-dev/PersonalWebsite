
import { WebsiteType } from "./define.js";
import { Logger } from "./logger.js";
import { I18n } from "./i18n.js";

window.WEBSITE_TYPE = WebsiteType.Debug;

// Once init
(async function () {
    const log = Logger.Initialize("Main", {
        EnvType: <Logger.EnvType><unknown>WEBSITE_TYPE
    });

    log.Info("Initializing");

    const i18n = new I18n(document);
    i18n.ApplyI18N();

    if (WEBSITE_TYPE === WebsiteType.Release) {
        return;
    }

    let infoList = <HTMLLabelElement>document.getElementById("website-debugger-information");

    var infoArray = new Array<string>;
    infoArray.push(`Current information: ${new Date().toISOString()}`);
    infoArray.push(`Website Type(Status): ${WebsiteType[WEBSITE_TYPE]}`);

    infoList.innerText = infoArray.join("\n");
})();