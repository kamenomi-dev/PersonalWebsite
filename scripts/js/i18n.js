import { Logger } from "./logger.js";
export class I18n {
    root;
    i18nLogger = Logger.Initialize("I18N", {
        EnvType: WEBSITE_TYPE
    });
    constructor(root) {
        this.root = root;
        if (I18n.instance) {
            return {};
        }
        I18n.instance = this;
    }
    ;
    async ApplyI18N(lang) {
        let allNode = this.root.querySelectorAll("*[i18n]");
        if (allNode.length == 0) {
            return;
        }
        let currLang = lang || navigator.language;
        let langTable = {};
        try {
            let request = new XMLHttpRequest();
            request.open("GET", `./resource/lang/${currLang}.json`, false);
            request.onreadystatechange = () => {
                this.i18nLogger.Debug(`XMLHttpRequest() Status-changed rs${request.readyState} s${request.status}`);
                if (request.readyState !== XMLHttpRequest.DONE || request.status !== 200) {
                    return;
                }
                langTable = JSON.parse(request.responseText);
            };
            request.send();
        }
        catch (error) {
            this.i18nLogger.Debug(`XMLHttpRequest() Failed! \n${error}`);
            this.ApplyI18N("zh_CN");
        }
        this.i18nLogger.Debug(`XMLHttpRequest() Success`);
        allNode.forEach(node => {
            const originText = node.getAttribute("i18n");
            if (originText == null) {
                return;
            }
            let procBlock = /#\[.*\]/g.exec(originText);
            if (procBlock == null) {
                return;
            }
            let textBlock = procBlock.map(pattern => {
                let symbol = pattern.slice(2, -1);
                let presentText = langTable[symbol] || langTable["undefined-symbol"] || "[Where?]";
                if (langTable[symbol] == undefined) {
                    this.i18nLogger.Error(`Cannot find symbol ${symbol}, and it will be showed "${presentText}"`);
                }
                else {
                    this.i18nLogger.Debug(`Found symbol ${symbol} <-> ${presentText}"`);
                }
                return presentText;
            });
            if (Object.hasOwn(node, "innerText")) {
                node.innerText = textBlock.join("");
            }
            else {
                node.innerHTML = textBlock.join("");
            }
            node.removeAttribute("i18n");
        });
    }
    ;
    static instance;
}
//# sourceMappingURL=i18n.js.map