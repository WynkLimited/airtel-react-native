import*as e from"../../core/common/common.js";import*as n from"../../core/i18n/i18n.js";import*as o from"../../core/root/root.js";import*as t from"../console/console.js";import*as i from"../../ui/legacy/legacy.js";const s={explainThisError:"Understand this error",explainThisWarning:"Understand this warning",explainThisMessage:"Understand this message",enableConsoleInsights:"Enable Console insights",wrongLocale:"To use this feature, update your Language preference in DevTools Settings to English."},a=n.i18n.registerUIStrings("panels/explain/explain-meta.ts",s),r=n.i18n.getLazilyComputedLocalizedString.bind(void 0,a),l=n.i18n.getLocalizedString.bind(void 0,a),c="console-insights-enabled",g=[{actionId:"explain.console-message.hover",title:r(s.explainThisMessage),contextTypes:()=>[t.ConsoleViewMessage.ConsoleViewMessage]},{actionId:"explain.console-message.context.error",title:r(s.explainThisError),contextTypes:()=>[]},{actionId:"explain.console-message.context.warning",title:r(s.explainThisWarning),contextTypes:()=>[]},{actionId:"explain.console-message.context.other",title:r(s.explainThisMessage),contextTypes:()=>[]}];function d(){return!0===m()&&p()}function p(){return"true"===o.Runtime.Runtime.queryParam("enableAida")}function m(){return!!n.DevToolsLocale.DevToolsLocale.instance().locale.startsWith("en-")||l(s.wrongLocale)}e.Settings.registerSettingExtension({category:"CONSOLE",settingName:c,settingType:"boolean",title:r(s.enableConsoleInsights),defaultValue:!0,reloadRequired:!0,condition:p,disabledCondition:()=>{const e=m();return!0!==e?{disabled:!0,reason:e}:{disabled:!1}}});for(const e of g)i.ActionRegistration.registerActionExtension({...e,setting:c,category:"CONSOLE",loadActionDelegate:async()=>new((await import("./explain.js")).ActionDelegate),condition:d});
