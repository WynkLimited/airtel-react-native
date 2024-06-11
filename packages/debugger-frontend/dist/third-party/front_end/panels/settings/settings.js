import*as t from"../../core/common/common.js";import*as e from"../../core/host/host.js";import*as i from"../../core/i18n/i18n.js";import*as s from"../../core/root/root.js";import*as n from"../../ui/components/icon_button/icon_button.js";import*as o from"../../ui/legacy/components/utils/utils.js";import*as r from"../../ui/legacy/legacy.js";import*as a from"../../ui/visual_logging/visual_logging.js";import{PanelUtils as c}from"../utils/utils.js";import*as l from"./components/components.js";import*as d from"../../core/platform/platform.js";const h=new CSSStyleSheet;h.replaceSync('.settings-window-main{color:var(--sys-color-on-surface);background-color:var(--sys-color-cdt-base-container);padding:11px 0 0}.settings-content{overflow-y:auto;overflow-x:hidden;margin:8px 8px 8px 0;padding:0 4px;flex:auto}.settings-container{width:100%;column-width:288px}.settings-block{display:block;padding-bottom:9px;width:288px;break-inside:avoid}.settings-tab.settings-container{column-width:308px}.settings-tab .settings-block{margin-left:20px}.settings-line{padding-bottom:5px;margin-bottom:5px}.settings-key-cell{display:inline-block;width:153px;white-space:nowrap;text-align:right;vertical-align:middle;padding-right:6px}.settings-cell{display:inline-block;width:135px;vertical-align:middle}.settings-section-title{font-size:120%;text-align:left}.settings-combine-keys{margin:0 0.3em;font-size:9px}fieldset{margin:0;padding:0;border:none}.experiments-filter{padding-top:1px;display:flex;align-items:center}label{padding-right:8px;padding-bottom:8px}.experiments-filter label{padding-bottom:0}.settings-tab p{margin:12px 0}.settings-block p p{padding-left:30px}.settings-select{align-items:center;display:grid}.settings-experiments-warning-subsection-warning{color:var(--sys-color-error)}.settings-experiments-warning-subsection-message{color:inherit}.settings-content input[type="checkbox"]{margin:1px 7px 1px 2px}.settings-window-title{font-size:18px;color:var(--sys-color-on-surface);padding:0 0 5px 13px}.settings-container-wrapper{position:absolute;top:31px;left:0;right:0;bottom:0;overflow:auto;padding-top:9px;border-top:1px solid var(--sys-color-divider)}.settings-tab.settings-content{margin:0;padding:0}.settings-tab-container{flex:auto;overflow:hidden}.settings-tab-container header{padding:0 0 6px}#experiments-tab-content .settings-container{column-width:auto}#experiments-tab-content .settings-block{width:auto;margin-left:0;margin-right:10px}.settings-tab-container header > h1{font-size:18px;font-weight:normal;margin:0;padding-bottom:3px;white-space:nowrap}.settings-tab .settings-section-title{margin-left:-20px;color:var(--sys-color-on-surface-subtle)}.settings-tab select{margin-left:10px;width:80%}.settings-experiment{display:grid;grid-template-columns:auto min-content auto 1fr}.settings-experiment .devtools-link{display:flex!important;align-items:center}.settings-experiment .devtools-link:has(.link-icon){outline-offset:0}.experiment-label{margin-right:2px}.settings-experiment-unstable{color:var(--sys-color-token-subtle)}.settings-experiment .feedback-link{color:var(--sys-color-primary);text-decoration-line:underline;margin-left:4px}.tabbed-pane-content slot::slotted(.widget){overflow:visible!important}@media (forced-colors: active){.settings-window-title{color:canvastext}.tabbed-pane-header-tab{background:ButtonFace}.tabbed-pane-header-tab-title{color:canvastext}}@media (forced-colors: active) and (prefers-color-scheme: dark){.tabbed-pane-header-tab.selected{background:ButtonFace}.tabbed-pane-header-tab.selected .tabbed-pane-header-tab-title{color:HighlightText}}\n/*# sourceURL=settingsScreen.css */\n');const g={settings:"Settings",shortcuts:"Shortcuts",preferences:"Preferences",restoreDefaultsAndReload:"Restore defaults and reload",experiments:"Experiments",theseExperimentsCouldBeUnstable:"These experiments could be unstable or unreliable and may require you to restart DevTools.",theseExperimentsAreParticularly:"These experiments are particularly unstable. Enable at your own risk.",warning:"WARNING:",oneOrMoreSettingsHaveChanged:"One or more settings have changed which requires a reload to take effect.",filterExperimentsLabel:"Filter",noResults:"No experiments match the filter",learnMore:"Learn more",sendFeedback:"Send feedback"},p=i.i18n.registerUIStrings("panels/settings/SettingsScreen.ts",g),u=i.i18n.getLocalizedString.bind(void 0,p);let m;class b extends r.Widget.VBox{tabbedLocation;keybindsTab;reportTabOnReveal;constructor(){super(!0),this.contentElement.classList.add("settings-window-main"),this.contentElement.classList.add("vbox");const t=document.createElement("div"),e=r.Utils.createShadowRootWithCoreStyles(t,{cssFile:[h],delegatesFocus:void 0}).createChild("div","settings-window-title");r.ARIAUtils.markAsHeading(e,1),e.textContent=u(g.settings),this.tabbedLocation=r.ViewManager.ViewManager.instance().createTabbedLocation((()=>b.revealSettingsScreen()),"settings-view");const i=this.tabbedLocation.tabbedPane();i.registerCSSFiles([h]),i.leftToolbar().appendToolbarItem(new r.Toolbar.ToolbarItem(t)),i.setShrinkableTabs(!1),i.makeVerticalTabLayout();const s=r.ViewManager.ViewManager.instance().view("keybinds");s&&s.widget().then((t=>{this.keybindsTab=t})),i.show(this.contentElement),i.selectTab("preferences"),i.addEventListener(r.TabbedPane.Events.TabInvoked,this.tabInvoked,this),this.reportTabOnReveal=!1}static instance(t={forceNew:null}){const{forceNew:e}=t;return m&&!e||(m=new b),m}static revealSettingsScreen(){const t=b.instance();if(t.isShowing())return t;t.reportTabOnReveal=!0;const e=new r.Dialog.Dialog("settings");return e.contentElement.tabIndex=-1,e.addCloseButton(),e.setOutsideClickCallback((()=>{})),e.setPointerEventsBehavior("PierceGlassPane"),e.setOutsideTabIndexBehavior("PreserveMainViewTabIndex"),t.show(e.contentElement),e.setEscapeKeyCallback(t.onEscapeKeyPressed.bind(t)),e.setMarginBehavior("NoMargin"),e.show(),t}static async showSettingsScreen(t={name:void 0,focusTabHeader:void 0}){const{name:e,focusTabHeader:i}=t,s=b.revealSettingsScreen();s.selectTab(e||"preferences");const n=s.tabbedLocation.tabbedPane();await n.waitForTabElementUpdate(),i?n.focusSelectedTabHeader():n.focus()}resolveLocation(t){return this.tabbedLocation}selectTab(t){this.tabbedLocation.tabbedPane().selectTab(t,!0)}tabInvoked(t){const e=t.data;if(!e.isUserGesture)return;const i=e.prevTabId,s=e.tabId;!this.reportTabOnReveal&&i&&i===s||(this.reportTabOnReveal=!1,this.reportSettingsPanelShown(s))}reportSettingsPanelShown(t){t!==u(g.shortcuts)?e.userMetrics.settingsPanelShown(t):e.userMetrics.settingsPanelShown("shortcuts")}onEscapeKeyPressed(t){"keybinds"===this.tabbedLocation.tabbedPane().selectedTabId&&this.keybindsTab&&this.keybindsTab.onEscapeKeyPressed(t)}wasShown(){super.wasShown(),this.registerCSSFiles([h])}}class y extends r.Widget.VBox{containerElement;constructor(t,e){super(),this.element.classList.add("settings-tab-container"),e&&(this.element.id=e);const i=this.element.createChild("header");r.UIUtils.createTextChild(i.createChild("h1"),t),this.containerElement=this.element.createChild("div","settings-container-wrapper").createChild("div","settings-tab settings-content settings-container")}appendSection(t){const e=this.containerElement.createChild("div","settings-block");if(t){r.ARIAUtils.markAsGroup(e);const i=e.createChild("div","settings-section-title");i.textContent=t,r.ARIAUtils.markAsHeading(i,2),r.ARIAUtils.setLabel(e,t)}return e}}class x extends y{syncSection=new l.SyncSection.SyncSection;settingToControl=new Map;constructor(){super(u(g.preferences),"preferences-tab-content"),this.element.setAttribute("jslog",`${a.pane("preferences")}`);const e=["","APPEARANCE","SOURCES","ELEMENTS","NETWORK","PERFORMANCE","MEMORY","CONSOLE","EXTENSIONS","PERSISTENCE","DEBUGGER","GLOBAL","SYNC"],i=t.Settings.getRegisteredSettings().sort(((t,e)=>t.order&&e.order?t.order-e.order:t.order?-1:e.order?1:0));for(const t of e){const e=i.filter((e=>e.category===t&&x.isSettingVisible(e)));this.createSectionElement(t,e)}const s=r.UIUtils.createTextButton(u(g.restoreDefaultsAndReload),(function(){t.Settings.Settings.instance().clearAll(),o.Reload.reload()}),{jslogContext:"settings.restore-defaults-and-reload"});this.appendSection().appendChild(s)}static isSettingVisible(t){return Boolean(t.title?.())&&Boolean(t.category)}wasShown(){r.Context.Context.instance().setFlavor(x,this),super.wasShown(),this.updateSyncSection()}willHide(){super.willHide(),r.Context.Context.instance().setFlavor(x,null)}updateSyncSection(){e.InspectorFrontendHost.InspectorFrontendHostInstance.getSyncInformation((e=>{this.syncSection.data={syncInfo:e,syncSetting:t.Settings.moduleSetting("sync-preferences")}}))}createExtensionSection(t){const e=o.Linkifier.LinkHandlerSettingUI.instance().settingElement();if(e){this.createStandardSectionElement("EXTENSIONS",t).appendChild(e)}}createSectionElement(t,e){"EXTENSIONS"===t?this.createExtensionSection(e):"SYNC"===t&&e.length>0?this.containerElement.appendChild(this.syncSection):e.length>0&&this.createStandardSectionElement(t,e)}createStandardSectionElement(e,i){const s=t.Settings.getLocalizedSettingsCategory(e),n=this.appendSection(s);for(const e of i){const i=t.Settings.Settings.instance().moduleSetting(e.settingName),s=r.SettingsUI.createControlForSetting(i);s&&(this.settingToControl.set(i,s),n.appendChild(s))}return n}highlightObject(e){if(e instanceof t.Settings.Setting){const t=this.settingToControl.get(e);t&&c.highlightElement(t)}}}class S extends y{#t;#e;#i;experimentToControl=new Map;constructor(){super(u(g.experiments),"experiments-tab-content");const t=this.appendSection();t.classList.add("experiments-filter"),this.element.setAttribute("jslog",`${a.pane("experiments")}`);const e=t.createChild("label");e.textContent=u(g.filterExperimentsLabel),this.#i=r.UIUtils.createInput("","text","experiments-filter"),r.ARIAUtils.bindLabelToControl(e,this.#i),t.appendChild(this.#i),this.#i.addEventListener("input",(()=>this.renderExperiments(this.#i.value.toLowerCase())),!1),this.setDefaultFocusedElement(this.#i),this.setFilter("")}renderExperiments(t){this.experimentToControl.clear(),this.#t&&this.#t.remove(),this.#e&&this.#e.remove();const e=s.Runtime.experiments.allConfigurableExperiments().sort(),i=e.filter((e=>e.unstable&&e.title.toLowerCase().includes(t))),n=e.filter((e=>!e.unstable&&e.title.toLowerCase().includes(t)));if(n.length){this.#t=this.appendSection();const t=u(g.theseExperimentsCouldBeUnstable);this.#t.appendChild(this.createExperimentsWarningSubsection(t));for(const t of n)this.#t.appendChild(this.createExperimentCheckbox(t))}if(i.length){this.#e=this.appendSection();const t=u(g.theseExperimentsAreParticularly);this.#e.appendChild(this.createExperimentsWarningSubsection(t));for(const t of i)this.#e.appendChild(this.createExperimentCheckbox(t))}if(!n.length&&!i.length){this.#t=this.appendSection();const t=this.#t.createChild("span");t.textContent=u(g.noResults),r.ARIAUtils.alert(t.textContent)}}createExperimentsWarningSubsection(t){const e=document.createElement("div");e.createChild("span","settings-experiments-warning-subsection-warning").textContent=u(g.warning),r.UIUtils.createTextChild(e," ");return e.createChild("span","settings-experiments-warning-subsection-message").textContent=t,e}createExperimentCheckbox(t){const i=r.UIUtils.CheckboxLabel.create(t.title,t.isEnabled(),void 0,t.name);i.classList.add("experiment-label");const s=i.checkboxElement;s.name=t.name,s.addEventListener("click",(function(){t.setEnabled(s.checked),e.userMetrics.experimentChanged(t.name,t.isEnabled()),r.InspectorView.InspectorView.instance().displayReloadRequiredWarning(u(g.oneOrMoreSettingsHaveChanged))}),!1);const o=document.createElement("p");if(this.experimentToControl.set(t,o),o.classList.add("settings-experiment"),t.unstable&&!t.isEnabled()&&o.classList.add("settings-experiment-unstable"),o.appendChild(i),t.docLink){const e=r.XLink.XLink.create(t.docLink,void 0,void 0,void 0,`${t.name}-documentation`);e.textContent="",e.setAttribute("aria-label",u(g.learnMore));const i=new n.Icon.Icon;i.data={iconName:"help",color:"var(--icon-default)",width:"16px",height:"16px"},i.classList.add("link-icon"),e.prepend(i),o.appendChild(e)}if(t.feedbackLink){const e=r.XLink.XLink.create(t.feedbackLink,void 0,void 0,void 0,`${t.name}-feedback`);e.textContent=u(g.sendFeedback),e.classList.add("feedback-link"),o.appendChild(e)}return o}highlightObject(t){if(t instanceof s.Runtime.Experiment){const e=this.experimentToControl.get(t);e&&c.highlightElement(e)}}setFilter(t){this.#i.value=t,this.#i.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0}))}wasShown(){r.Context.Context.instance().setFlavor(S,this),super.wasShown()}willHide(){super.willHide(),r.Context.Context.instance().setFlavor(S,null)}}var f=Object.freeze({__proto__:null,SettingsScreen:b,GenericSettingsTab:x,ExperimentsSettingsTab:S,ActionDelegate:class{handleAction(t,i){switch(i){case"settings.show":return b.showSettingsScreen({focusTabHeader:!0}),!0;case"settings.documentation":return e.InspectorFrontendHost.InspectorFrontendHostInstance.openInNewTab(r.UIUtils.addReferrerToURL("https://developer.chrome.com/docs/devtools/")),!0;case"settings.shortcuts":return b.showSettingsScreen({name:"keybinds",focusTabHeader:!0}),!0}return!1}},Revealer:class{async reveal(i){const n=r.Context.Context.instance();if(i instanceof s.Runtime.Experiment){e.InspectorFrontendHost.InspectorFrontendHostInstance.bringToFront(),await b.showSettingsScreen({name:"experiments"});const t=n.flavor(S);null!==t&&t.highlightObject(i)}else{for(const s of t.Settings.getRegisteredSettings())if(x.isSettingVisible(s)&&s.settingName===i.name){e.InspectorFrontendHost.InspectorFrontendHostInstance.bringToFront(),await b.showSettingsScreen();const t=n.flavor(x);return void(null!==t&&t.highlightObject(i))}for(const t of r.ViewManager.getRegisteredViewExtensions()){const s=t.viewId();if("settings-view"!==t.location())continue;const n=t.settings();if(n&&-1!==n.indexOf(i.name)){e.InspectorFrontendHost.InspectorFrontendHostInstance.bringToFront(),await b.showSettingsScreen({name:s});const n=await t.widget();return void(n instanceof y&&n.highlightObject(i))}}}}}});const k=new CSSStyleSheet;k.replaceSync(':host{overflow:hidden}.header{padding:0 0 6px;border-bottom:1px solid var(--sys-color-divider);font-size:18px;font-weight:normal;flex:none}.intro{margin-top:10px}.ignore-list-option{flex:none;padding:3px 6px;min-height:30px}.ignore-list-option devtools-icon{margin-bottom:-1px}.ignore-list-option-group-title{margin-top:16px;margin-bottom:3px;margin-left:8px;flex-shrink:0}.add-button{margin:10px 2px;align-self:flex-start;flex:none}.ignore-list{max-width:500px;flex:0 1 auto}.ignore-list-global-enable{padding:3px 0;color:var(--sys-color-token-subtle);font-size:120%;margin-top:20px}.ignore-list-item{padding:3px 5px;height:30px;display:flex;align-items:center;position:relative;flex:auto 1 1}.ignore-list-pattern{flex:auto;min-width:100px}.ignore-list-item > [is="dt-checkbox"]{width:100%}.ignore-list-item .ignore-list-pattern{white-space:nowrap;text-overflow:ellipsis;user-select:none;color:var(--sys-color-on-surface);overflow:hidden}.ignore-list-edit-row{flex:none;display:flex;flex-direction:row;margin:6px 5px;align-items:center}.ignore-list-edit-row input,\n.ignore-list-edit-row select{width:100%;text-align:inherit}.ignore-list-options{margin-left:22px;display:flex;flex-direction:column}.ignore-list-options.ignore-listing-disabled{opacity:30%}.list:has(.ignore-list-empty),\n.list:has(.ignore-list-edit-row),\n.list:has(.ignore-list-item){border:none}.editor-container:has(.ignore-list-edit-row){background:var(--sys-color-surface1);border-radius:10px}.ignore-list.list-editing ~ .add-button{display:none}.devtools-link:has(devtools-icon){margin-left:6px}\n/*# sourceURL=frameworkIgnoreListSettingsTab.css */\n');const v={frameworkIgnoreList:"Framework Ignore List",debuggerWillSkipThroughThe:"Debugger will skip through the scripts and will not stop on exceptions thrown by them.",ignoreListContentScripts:"Content scripts injected by extensions",automaticallyIgnoreListKnownThirdPartyScripts:"Known third-party scripts from source maps",enableIgnoreListing:"Enable Ignore Listing",enableIgnoreListingTooltip:"Uncheck to disable all ignore listing",generalExclusionRules:"General exclusion rules:",customExclusionRules:"Custom exclusion rules:",addPattern:"Add pattern...",addFilenamePattern:"Add filename pattern",ignoreScriptsWhoseNamesMatchS:"Ignore scripts whose names match ''{PH1}''",pattern:"Add Pattern",patternCannotBeEmpty:"Pattern cannot be empty",patternAlreadyExists:"Pattern already exists",patternMustBeAValidRegular:"Pattern must be a valid regular expression",learnMore:"Learn more"},w=i.i18n.registerUIStrings("panels/settings/FrameworkIgnoreListSettingsTab.ts",v),C=i.i18n.getLocalizedString.bind(void 0,w);class E extends r.Widget.VBox{list;setting;editor;constructor(){super(!0),this.element.setAttribute("jslog",`${a.pane("blackbox")}`);const e=this.contentElement.createChild("div","header");e.textContent=C(v.frameworkIgnoreList),r.ARIAUtils.markAsHeading(e,1),this.contentElement.createChild("div","intro").textContent=C(v.debuggerWillSkipThroughThe);const i=t.Settings.Settings.instance().moduleSetting("enable-ignore-listing"),s=this.contentElement.createChild("div","ignore-list-global-enable");s.appendChild(r.SettingsUI.createSettingCheckbox(C(v.enableIgnoreListing),i,!0)),r.Tooltip.Tooltip.install(s,C(v.enableIgnoreListingTooltip));const o=this.contentElement.createChild("div","ignore-list-options"),c=this.createSettingGroup(C(v.generalExclusionRules));o.appendChild(c);c.createChild("div","ignore-list-option").appendChild(r.SettingsUI.createSettingCheckbox(C(v.ignoreListContentScripts),t.Settings.Settings.instance().moduleSetting("skip-content-scripts"),!0));const l=c.createChild("div","ignore-list-option");l.appendChild(r.SettingsUI.createSettingCheckbox(C(v.automaticallyIgnoreListKnownThirdPartyScripts),t.Settings.Settings.instance().moduleSetting("automatically-ignore-list-known-third-party-scripts"),!0));const d=r.XLink.XLink.create("http://goo.gle/skip-third-party",void 0,void 0,void 0,"learn-more");d.textContent="",d.setAttribute("aria-label",C(v.learnMore));const h=new n.Icon.Icon;h.data={iconName:"help",color:"var(--icon-default)",width:"16px",height:"16px"},d.prepend(h),l.appendChild(d);const g=this.createSettingGroup(C(v.customExclusionRules));o.appendChild(g),this.list=new r.ListWidget.ListWidget(this),this.list.element.classList.add("ignore-list");const p=document.createElement("div");p.classList.add("ignore-list-empty"),this.list.setEmptyPlaceholder(p),this.list.show(g);const u=r.UIUtils.createTextButton(C(v.addPattern),this.addButtonClicked.bind(this),{className:"add-button",jslogContext:"settings.add-ignore-list-pattern"});function m(){i.get()?o.classList.remove("ignore-listing-disabled"):o.classList.add("ignore-listing-disabled")}r.ARIAUtils.setLabel(u,C(v.addFilenamePattern)),g.appendChild(u),this.setting=t.Settings.Settings.instance().moduleSetting("skip-stack-frames-pattern"),this.setting.addChangeListener(this.settingUpdated,this),this.setDefaultFocusedElement(u),i.addChangeListener(m),m()}wasShown(){super.wasShown(),this.list.registerCSSFiles([k]),this.registerCSSFiles([k]),this.settingUpdated()}settingUpdated(){this.list.clear();const t=this.setting.getAsArray();for(let e=0;e<t.length;++e)this.list.appendItem(t[e],!0)}addButtonClicked(){this.list.addNewItem(this.setting.getAsArray().length,{pattern:"",disabled:!1})}createSettingGroup(t){const e=document.createElement("div");e.classList.add("ignore-list-option-group"),r.ARIAUtils.markAsGroup(e);const i=e.createChild("div","ignore-list-option-group-title");return r.ARIAUtils.markAsHeading(i,2),r.ARIAUtils.setLabel(e,t),i.textContent=t,e}renderItem(t,e){const i=document.createElement("div"),s=this.setting,n=r.UIUtils.CheckboxLabel.create(t.pattern,!t.disabled,void 0,"settings.ignore-list-pattern"),o=C(v.ignoreScriptsWhoseNamesMatchS,{PH1:t.pattern});return r.Tooltip.Tooltip.install(n,o),n.checkboxElement.ariaLabel=o,n.checkboxElement.addEventListener("change",(function(){const e=!n.checkboxElement.checked;t.disabled!==e&&(t.disabled=e,t.disabledForUrl=void 0,s.setAsArray(s.getAsArray()))}),!1),i.appendChild(n),i.classList.add("ignore-list-item"),i}removeItemRequested(t,e){const i=this.setting.getAsArray();i.splice(e,1),this.setting.setAsArray(i)}commitEdit(t,e,i){t.pattern=e.control("pattern").value.trim();const s=this.setting.getAsArray();i&&s.push(t),this.setting.setAsArray(s)}beginEdit(t){const e=this.createEditor();return e.control("pattern").value=t.pattern,e}createEditor(){if(this.editor)return this.editor;const t=new r.ListWidget.Editor;this.editor=t;const e=t.contentElement();e.createChild("div","ignore-list-edit-row").createChild("div","ignore-list-pattern").textContent=C(v.pattern);const i=e.createChild("div","ignore-list-edit-row"),s=t.createInput("pattern","text","/framework\\.js$",function(t,e,i){const s=i.value.trim(),n=this.setting.getAsArray();if(!s.length)return{valid:!1,errorMessage:C(v.patternCannotBeEmpty)};for(let t=0;t<n.length;++t)if(t!==e&&n[t].pattern===s)return{valid:!1,errorMessage:C(v.patternAlreadyExists)};let o;try{o=new RegExp(s)}catch(t){}if(!o)return{valid:!1,errorMessage:C(v.patternMustBeAValidRegular)};return{valid:!0,errorMessage:void 0}}.bind(this));return r.ARIAUtils.setLabel(s,C(v.pattern)),i.createChild("div","ignore-list-pattern").appendChild(s),t}}var I=Object.freeze({__proto__:null,FrameworkIgnoreListSettingsTab:E});const A=new CSSStyleSheet;A.replaceSync('header{padding:0 0 6px;border-bottom:1px solid var(--sys-color-divider);flex:none;margin-bottom:25px}h1{font-size:18px;font-weight:normal;padding-bottom:3px;margin:0}[role="list"]{overflow:auto;> *{min-width:300px}}.keybinds-key{padding:0.1em 0.6em;border:1px solid var(--sys-color-neutral-outline);font-size:11px;background-color:var(--sys-color-neutral-container);color:var(--sys-color-on-surface);box-shadow:var(--box-shadow-outline-color);border-radius:3px;display:inline-block;margin:0 0.1em;text-shadow:0 1px 0 var(--sys-color-cdt-base-container);line-height:1.5;white-space:nowrap}.keybinds-list-item{min-height:30px;display:grid;grid-template-rows:repeat(auto-fit,minmax(30px,auto));grid-template-columns:1fr 30px 2fr 30px 30px;flex:auto 1 1}.keybinds-list-item:focus-visible{background-color:var(--sys-color-tonal-container)}.keybinds-list-item:not(.keybinds-category-header){padding:4px 0 4px 20px;border-radius:7px}.keybinds-list-item:not(.keybinds-category-header):last-child{margin-bottom:5px}.keybinds-list-item.keybinds-editing{background-color:var(--sys-color-neutral-container)}.keybinds-list-text.keybinds-action-name{padding-top:7px;grid-row:1/3}.keybinds-shortcut,\n.keybinds-info{grid-row:auto;grid-column:3/span 1}.keybinds-shortcut.devtools-link{align-items:center;margin-left:3px}.keybinds-info .devtools-link{padding-top:6px}.keybinds-error{color:var(--sys-color-error)}.keybinds-list-item.keybinds-editing .keybinds-shortcut{display:flex}.keybinds-modified{grid-column:2/span 1;margin-top:2px}.keybinds-list-item button{border:none;padding:0;background:transparent}.keybinds-list-item button:hover devtools-icon{color:var(--icon-default-hover)}.keybinds-list-item button:focus-visible{background-color:var(--sys-color-tonal-container)}.keybinds-list-item button[disabled]{opacity:40%}.keybinds-confirm-button{grid-column:-2/span 1}.keybinds-cancel-button{grid-column:-1/span 1}.keybinds-edit-button{display:none;grid-row:1/span 1;grid-column:4/span 1}.keybinds-list-item:not(.keybinds-editing):hover .keybinds-edit-button,\n.keybinds-list-item:not(.keybinds-editing):focus-within .keybinds-edit-button{display:inline-block}.keybinds-list-text{padding:3px 0;user-select:none;color:var(--sys-color-on-surface);text-align:start;position:relative;margin-right:0}.keybinds-category-header{font-weight:bold;line-height:30px;white-space:nowrap}.keybinds-category-header:not(:nth-child(2)){border-top:1px solid var(--sys-color-divider)}.keybinds-list-item:not(.keybinds-category-header):hover,\n.keybinds-list-item:not(.keybinds-editing):focus-within{background:var(--sys-color-state-hover-on-subtle)}.keybinds-set-select{text-align:right;margin-bottom:25px}.keybinds-set-select label p{display:inline;color:var(--sys-color-on-surface)}.keybinds-set-select select{margin-left:6px}button.text-button{width:fit-content;align-self:flex-end}.keybinds-list-text input{margin:0 2px}.keybinds-list-text:has(.keybinds-delete-button){grid-column:3/-1}.docs-link.devtools-link{align-self:flex-start;min-height:2em;line-height:2em;margin-bottom:4px}.keybinds-footer{display:flex;flex-wrap:wrap;justify-content:space-between;min-height:fit-content;margin-top:10px}\n/*# sourceURL=keybindsSettingsTab.css */\n');const L={shortcuts:"Shortcuts",matchShortcutsFromPreset:"Match shortcuts from preset",keyboardShortcutsList:"Keyboard shortcuts list",shortcutModified:"Shortcut modified",noShortcutForAction:"No shortcut for action",addAShortcut:"Add a shortcut",confirmChanges:"Confirm changes",discardChanges:"Discard changes",removeShortcut:"Remove shortcut",editShortcut:"Edit shortcut",shortcutsCannotContainOnly:"Shortcuts cannot contain only modifier keys.",thisShortcutIsInUseByS:"This shortcut is in use by {PH1}: {PH2}.",RestoreDefaultShortcuts:"Restore default shortcuts",FullListOfDevtoolsKeyboard:"Full list of DevTools keyboard shortcuts and gestures",ResetShortcutsForAction:"Reset shortcuts for action",shortcutRemoved:"{PH1} Shortcut removed",shortcutChangesRestored:"Changes to shortcut restored to default",shortcutChangesApplied:"Changes to shortcut applied",shortcutChangesDiscared:"Changes to shortcut discarded"},T=i.i18n.registerUIStrings("panels/settings/KeybindsSettingsTab.ts",L),R=i.i18n.getLocalizedString.bind(void 0,T);class U extends r.Widget.VBox{items;list;editingItem;editingRow;constructor(){super(!0),this.element.setAttribute("jslog",`${a.pane("keybinds")}`);this.contentElement.createChild("header").createChild("h1").textContent=R(L.shortcuts);const e=t.Settings.Settings.instance().moduleSetting("active-keybind-set"),i=t.Settings.Settings.instance().moduleSetting("user-shortcuts");i.addChangeListener(this.update,this),e.addChangeListener(this.update,this);const s=r.SettingsUI.createControlForSetting(e,R(L.matchShortcutsFromPreset));s&&(s.classList.add("keybinds-set-select"),this.contentElement.appendChild(s)),this.items=new r.ListModel.ListModel,this.list=new r.ListControl.ListControl(this.items,this,r.ListControl.ListMode.NonViewport),this.items.replaceAll(this.createListItems()),r.ARIAUtils.markAsList(this.list.element),this.contentElement.appendChild(this.list.element),r.ARIAUtils.setLabel(this.list.element,R(L.keyboardShortcutsList));const n=this.contentElement.createChild("div");n.classList.add("keybinds-footer");const o=r.XLink.XLink.create("https://developer.chrome.com/docs/devtools/shortcuts/",R(L.FullListOfDevtoolsKeyboard),void 0,void 0,"learn-more");o.classList.add("docs-link"),n.appendChild(o);const c=r.UIUtils.createTextButton(R(L.RestoreDefaultShortcuts),(()=>{i.set([]),e.set(r.ShortcutRegistry.DefaultShortcutSetting)}),{jslogContext:"restore-default-shortcuts"});n.appendChild(c),this.editingItem=null,this.editingRow=null,this.update()}createElementForItem(t){let e=document.createElement("div");if("string"==typeof t)r.ARIAUtils.setLevel(e,1),e.classList.add("keybinds-category-header"),e.textContent=r.ActionRegistration.getLocalizedActionCategory(t);else{const i=new F(t,this,t===this.editingItem);e=i.element,r.ARIAUtils.setLevel(e,2),t===this.editingItem&&(this.editingRow=i)}return e.classList.add("keybinds-list-item"),r.ARIAUtils.markAsListitem(e),e.tabIndex=t===this.list.selectedItem()&&t!==this.editingItem?0:-1,e}commitChanges(t,i){for(const[t,s]of i)"UnsetShortcut"!==t.type&&(r.ShortcutRegistry.ShortcutRegistry.instance().removeShortcut(t),s||e.userMetrics.actionTaken(e.UserMetrics.Action.ShortcutRemoved)),s&&(r.ShortcutRegistry.ShortcutRegistry.instance().registerUserShortcut(t.changeKeys(s).changeType("UserShortcut")),"UnsetShortcut"===t.type?e.userMetrics.actionTaken(e.UserMetrics.Action.UserShortcutAdded):e.userMetrics.actionTaken(e.UserMetrics.Action.ShortcutModified));this.stopEditing(t)}heightForItem(t){return 0}isItemSelectable(t){return!0}selectedItemChanged(t,e,i,s){i&&(i.tabIndex=-1),s&&(e===this.editingItem&&this.editingRow?this.editingRow.focus():(s.tabIndex=0,this.list.element.hasFocus()&&s.focus()),this.setDefaultFocusedElement(s))}updateSelectedItemARIA(t,e){return!0}startEditing(t){this.list.selectItem(t),this.editingItem&&this.stopEditing(this.editingItem),r.UIUtils.markBeingEdited(this.list.element,!0),this.editingItem=t,this.list.refreshItem(t)}stopEditing(t){r.UIUtils.markBeingEdited(this.list.element,!1),this.editingItem=null,this.editingRow=null,this.list.refreshItem(t),this.focus()}createListItems(){const t=r.ActionRegistry.ActionRegistry.instance().actions().sort(((t,e)=>t.category()<e.category()?-1:t.category()>e.category()?1:t.id()<e.id()?-1:t.id()>e.id()?1:0)),e=[];let i;return t.forEach((t=>{"elements.toggle-element-search"!==t.id()&&(i!==t.category()&&e.push(t.category()),e.push(t),i=t.category())})),e}onEscapeKeyPressed(t){const e=d.DOMUtilities.deepActiveElement(document);this.editingRow&&e&&"INPUT"===e.nodeName&&this.editingRow.onEscapeKeyPressed(t)}update(){this.editingItem&&this.stopEditing(this.editingItem),this.list.refreshAllItems(),this.list.selectedItem()||this.list.selectItem(this.items.at(0))}willHide(){this.editingItem&&this.stopEditing(this.editingItem)}wasShown(){super.wasShown(),this.registerCSSFiles([A])}}class F{isEditing;settingsTab;item;element;editedShortcuts;shortcutInputs;shortcuts;elementToFocus;confirmButton;addShortcutLinkContainer;errorMessageElement;secondKeyTimeout;constructor(t,e,i){this.isEditing=Boolean(i),this.settingsTab=e,this.item=t,this.element=document.createElement("div"),this.element.setAttribute("jslog",`${a.item().context(t.id())}`),this.editedShortcuts=new Map,this.shortcutInputs=new Map,this.shortcuts=r.ShortcutRegistry.ShortcutRegistry.instance().shortcutsForAction(t.id()),this.elementToFocus=null,this.confirmButton=null,this.addShortcutLinkContainer=null,this.errorMessageElement=null,this.secondKeyTimeout=null,this.update()}focus(){this.elementToFocus&&this.elementToFocus.focus()}update(){this.element.removeChildren(),this.elementToFocus=null,this.shortcutInputs.clear(),this.element.classList.toggle("keybinds-editing",this.isEditing),this.element.createChild("div","keybinds-action-name keybinds-list-text").textContent=this.item.title(),this.shortcuts.forEach(this.createShortcutRow,this),0===this.shortcuts.length&&this.createEmptyInfo(),this.isEditing&&this.setupEditor()}createEmptyInfo(){if(r.ShortcutRegistry.ShortcutRegistry.instance().actionHasDefaultShortcut(this.item.id())){const t=n.Icon.create("keyboard-pen","keybinds-modified");r.ARIAUtils.setLabel(t,R(L.shortcutModified)),this.element.appendChild(t)}if(!this.isEditing){const t=this.element.createChild("div","keybinds-shortcut keybinds-list-text");r.ARIAUtils.setLabel(t,R(L.noShortcutForAction)),this.element.appendChild(this.createEditButton())}}setupEditor(){this.addShortcutLinkContainer=this.element.createChild("div","keybinds-shortcut devtools-link");const t=this.addShortcutLinkContainer.createChild("span","devtools-link");t.setAttribute("jslog",`${a.action("add-shortcut").track({click:!0})}`),t.textContent=R(L.addAShortcut),t.tabIndex=0,r.ARIAUtils.markAsLink(t),self.onInvokeElement(t,this.addShortcut.bind(this)),this.elementToFocus||(this.elementToFocus=t),this.errorMessageElement=this.element.createChild("div","keybinds-info keybinds-error hidden"),r.ARIAUtils.markAsAlert(this.errorMessageElement),this.element.appendChild(this.createIconButton(R(L.ResetShortcutsForAction),"undo","","undo",this.resetShortcutsToDefaults.bind(this))),this.confirmButton=this.createIconButton(R(L.confirmChanges),"checkmark","keybinds-confirm-button","confirm",(()=>{r.ARIAUtils.alert(L.shortcutChangesApplied),this.settingsTab.commitChanges(this.item,this.editedShortcuts)})),this.element.appendChild(this.confirmButton),this.element.appendChild(this.createIconButton(R(L.discardChanges),"cross","keybinds-cancel-button","cancel",(()=>{this.settingsTab.stopEditing(this.item),r.ARIAUtils.alert(L.shortcutChangesDiscared)}))),this.element.addEventListener("keydown",(t=>{d.KeyboardUtilities.isEscKey(t)&&(this.settingsTab.stopEditing(this.item),t.consume(!0))}))}addShortcut(){const t=new r.KeyboardShortcut.KeyboardShortcut([],this.item.id(),"UnsetShortcut");this.shortcuts.push(t),this.update();const e=this.shortcutInputs.get(t);e&&e.focus()}createShortcutRow(t,e){if(this.editedShortcuts.has(t)&&!this.editedShortcuts.get(t))return;let i;"UnsetShortcut"===t.type||t.isDefault()||(i=n.Icon.create("keyboard-pen","keybinds-modified"),r.ARIAUtils.setLabel(i,R(L.shortcutModified)),this.element.appendChild(i));const s=this.element.createChild("div","keybinds-shortcut keybinds-list-text");if(this.isEditing){const e=s.createChild("input","harmony-input");e.setAttribute("jslog",`${a.textField().track({keydown:!0})}`),e.spellcheck=!1,e.maxLength=0,this.shortcutInputs.set(t,e),this.elementToFocus||(this.elementToFocus=e),e.value=t.title();const i=this.editedShortcuts.get(t);i&&(e.value=this.shortcutInputTextForDescriptors(i)),e.addEventListener("keydown",this.onShortcutInputKeyDown.bind(this,t,e)),e.addEventListener("blur",(()=>{null!==this.secondKeyTimeout&&(clearTimeout(this.secondKeyTimeout),this.secondKeyTimeout=null)})),s.appendChild(this.createIconButton(R(L.removeShortcut),"bin","keybinds-delete-button","delete",(()=>{const e=this.shortcuts.indexOf(t);t.isDefault()||this.shortcuts.splice(e,1),r.ARIAUtils.alert(R(L.shortcutRemoved,{PH1:this.item.title()})),this.editedShortcuts.set(t,null),this.update(),this.focus(),this.validateInputs()})))}else{t.descriptors.flatMap((t=>t.name.split(" + "))).forEach((t=>{s.createChild("span","keybinds-key").textContent=t})),0===e&&this.element.appendChild(this.createEditButton())}}createEditButton(){return this.createIconButton(R(L.editShortcut),"edit","keybinds-edit-button","edit",(()=>this.settingsTab.startEditing(this.item)))}createIconButton(t,e,i,s,o){const c=document.createElement("button");return c.setAttribute("jslog",`${a.action().track({click:!0}).context(s)}`),c.setAttribute("title",t),c.appendChild(n.Icon.create(e)),c.addEventListener("click",o),r.ARIAUtils.setLabel(c,t),i&&c.classList.add(i),c}onShortcutInputKeyDown(t,e,i){if("Tab"!==i.key){const s=this.descriptorForEvent(i),n=this.editedShortcuts.get(t)||[];this.editedShortcuts.set(t,n);const o=2===n.length&&r.KeyboardShortcut.KeyboardShortcut.isModifier(n[1].key);2===n.length&&!o&&n.splice(0,2),this.secondKeyTimeout?(clearTimeout(this.secondKeyTimeout),this.secondKeyTimeout=null,n.push(s)):o?n[1]=s:r.KeyboardShortcut.KeyboardShortcut.isModifier(s.key)?n[0]=s:(n[0]=s,this.secondKeyTimeout=window.setTimeout((()=>{this.secondKeyTimeout=null}),r.ShortcutRegistry.KeyTimeout)),e.value=this.shortcutInputTextForDescriptors(n),this.validateInputs(),i.consume(!0)}}descriptorForEvent(t){const e=r.KeyboardShortcut.KeyboardShortcut.makeKeyFromEvent(t),i=r.KeyboardShortcut.KeyboardShortcut.keyCodeAndModifiersFromKey(e);let s=r.KeyboardShortcut.Keys[t.key]||r.KeyboardShortcut.KeyBindings[t.key];if(!s&&!/^[a-z]$/i.test(t.key)){const e=t.code;s=r.KeyboardShortcut.Keys[e]||r.KeyboardShortcut.KeyBindings[e],e.startsWith("Digit")?s=e.slice(5):e.startsWith("Key")&&(s=e.slice(3))}return r.KeyboardShortcut.KeyboardShortcut.makeDescriptor(s||t.key,i.modifiers)}shortcutInputTextForDescriptors(t){return t.map((t=>t.name)).join(" ")}resetShortcutsToDefaults(){this.editedShortcuts.clear();for(const t of this.shortcuts)if("UnsetShortcut"===t.type){const e=this.shortcuts.indexOf(t);this.shortcuts.splice(e,1)}else"UserShortcut"===t.type&&this.editedShortcuts.set(t,null);r.ShortcutRegistry.ShortcutRegistry.instance().disabledDefaultsForAction(this.item.id()).forEach((t=>{this.shortcuts.includes(t)||(this.shortcuts.push(t),this.editedShortcuts.set(t,t.descriptors))})),r.ARIAUtils.alert(L.shortcutChangesRestored),this.update(),this.focus()}onEscapeKeyPressed(t){const e=d.DOMUtilities.deepActiveElement(document);for(const[i,s]of this.shortcutInputs.entries())e===s&&this.onShortcutInputKeyDown(i,s,t)}validateInputs(){const t=this.confirmButton,e=this.errorMessageElement;t&&e&&(t.disabled=!1,e.classList.add("hidden"),this.shortcutInputs.forEach(((i,s)=>{const n=this.editedShortcuts.get(s);if(!n)return;if(n.some((t=>r.KeyboardShortcut.KeyboardShortcut.isModifier(t.key))))return t.disabled=!0,i.classList.add("error-input"),r.ARIAUtils.setInvalid(i,!0),e.classList.remove("hidden"),void(e.textContent=R(L.shortcutsCannotContainOnly));const o=r.ShortcutRegistry.ShortcutRegistry.instance().actionsForDescriptors(n).filter((t=>t!==this.item.id()));if(o.length){if(t.disabled=!0,i.classList.add("error-input"),r.ARIAUtils.setInvalid(i,!0),e.classList.remove("hidden"),!r.ActionRegistry.ActionRegistry.instance().hasAction(o[0]))return;const s=r.ActionRegistry.ActionRegistry.instance().getAction(o[0]),n=s.title(),a=s.category();e.textContent=R(L.thisShortcutIsInUseByS,{PH1:a,PH2:n})}else i.classList.remove("error-input"),r.ARIAUtils.setInvalid(i,!1)})))}}var K=Object.freeze({__proto__:null,KeybindsSettingsTab:U,ShortcutListItem:F});export{I as FrameworkIgnoreListSettingsTab,K as KeybindsSettingsTab,f as SettingsScreen};