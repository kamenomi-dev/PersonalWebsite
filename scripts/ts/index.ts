
import { WebsiteType } from "./define.js";
import { Logger } from "./logger.js";
import { I18n } from "./i18n.js";

window.WEBSITE_TYPE = WebsiteType.Debug;
window.CLIENT_MOBILE = (/ipad|iphone os|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile|android/i).test(navigator.userAgent);

// Once init
(async function () {
    const log = Logger.Initialize("Main", {
        EnvType: <Logger.EnvType><unknown>WEBSITE_TYPE
    });

    log.Info("Initializing");

    const i18n = new I18n(document);
    i18n.ApplyI18N();

    // adjust process.

    var adjustBlocks = document.querySelectorAll("*[detect-device]");
    adjustBlocks.forEach(element => {
        const target = element.getAttribute("detect-device");
        if (CLIENT_MOBILE) {
            if (target != "mobile") {
                element.remove();
            }
        } else if (target == "mobile") {
            element.remove();
        }
    });

    // Load subpage.
    var content = <HTMLIFrameElement>document.getElementById("bodyContent");
    const args = new URLSearchParams(location.search);

    if (args.has("article")){
        content.src = `./pages/main/subpage-blogframe.html`;
    }else {
        const part = args.get("current_page") || "main";
        content.src = `./pages/main/subpage-${part}.html`;
    }

    // debug information.

    if (WEBSITE_TYPE === WebsiteType.Release) {
        return;
    }

    let infoList = <HTMLLabelElement>document.getElementById("website-debugger-information");

    var infoArray = new Array<string>;
    infoArray.push(`Current information: ${new Date().toISOString()}`);
    infoArray.push(`Website Type: ${WebsiteType[WEBSITE_TYPE]}`);
    infoArray.push(`Client Mobile Type: ${CLIENT_MOBILE}`);

    infoList.innerText = infoArray.join("\n");

    window.WATCH_DOG = true;
})();