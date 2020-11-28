import { html, render } from 'lit-html';
import ViewBase from './viewBase';
import ModalFeedback from '../modal/feedback';
import ModalMapKey from '../modal/mapKey';
import ModalSocialMedia from '../modal/socialMedia';
import ModalInstallApp from '../modal/installApp';
import ModalDonate from '../modal/donate';
import ModalPartner from '../modal/partner';
import ModalDisclaimer from '../modal/disclaimer';
import ModalDataSources from '../modal/dataSources';

export default class InfoSidebar extends ViewBase {
  constructor(depts) {
    super(depts);
    this.analytics = depts.analytics();
    this.themeLoader = depts.themeLoader();
    this.customConfig = depts.customConfig();
    this.menuItems = [
      {
        id: "install",
        title: this.t("installApp"),
        icon: "download",
        class: "bold",
        show: ()=> this.customConfig.isMobileOrTablet() && !this.customConfig.isRunningStandalone(),
        action: ()=> new ModalInstallApp(this.depts).show()
      },
      {
        id: "map_legend",
        title: this.t("poiKey"),
        icon: "map",
        action: ()=> new ModalMapKey(this.depts).show()
      },
      {
        id: "donate",
        title: this.t("infoDonateHeader"),
        subTitle: this.t("infoDonateSub"),
        icon: "eur",
        show: ()=> this.themeLoader.isDefaultTheme(),
        action: ()=> new ModalDonate(this.depts).show()
      },
      {
        id: "social_media",
        title: this.t("popupSocialMediaHeader"),
        subTitle: this.t("popupSocialMediaText1"),
        icon: "facebook-official",
        show: ()=> this.themeLoader.isDefaultTheme(),
        action: ()=> new ModalSocialMedia(this.depts).show()
      },
      {
        id: "data_sources",
        title: this.t("dataSourceHeader"),
        subTitle: this.t("infoApiSub"),
        icon: "connectdevelop",
        action: ()=> new ModalDataSources(this.depts).show()
      },
      {
        id: "partner",
        title: this.t("partnerHeader"),
        subTitle: this.t("partnerSub"),
        icon: "percent",
        show: ()=> this.themeLoader.isDefaultTheme(),
        action: ()=> new ModalPartner(this.depts).show()
      },
      {
        id: "feedback",
        title: this.t("fbGiveFeedback"),
        icon: "comment",
        action: ()=>this.onGiveFeedback("other_feedback")
      },
      {
        id: "missing_station",
        title: this.t("fbReportMissingStationHeader"),
        icon: "comment",
        action: ()=>this.onGiveFeedback("missing_station")
      },
      {
        id: "disclaimer",
        title: this.t("disclaimerHeader"),
        icon: "legal",
        action: ()=> new ModalDisclaimer(this.depts).show()
      },
      {
        id: "about",
        title: this.t("aboutHeader"),
        subTitle: "chargeprice.net",
        icon: "info-circle",
        action: ()=>window.open("https://www.chargeprice.net")
      }
    ]
  }

  template(){
    return html`
      <div class="w3-bar-block">
        ${this.menuItems.filter(entry=>!entry.show || entry.show()).map(entry=>html`
          <a @click="${()=>this.executeAction(entry)}" href="#" class="w3-bar-item w3-button w3-border-bottom">
            <i class="fa fa-${entry.icon} pc-main-text"></i> <span class="${entry.class}">${entry.title}</span>
            ${entry.subTitle ? html`<span class="w3-small w3-block w3-text-dark-gray">${entry.subTitle}</span>`:""}
          </a>
        `)}
      </div>
    `;
  }

  render(){
    render(this.template(),document.getElementById("infoContent"));
  }

  onGiveFeedback(type){
    new ModalFeedback(this.depts).show(type);
  }

  executeAction(entry){
    this.analytics.log('send', 'event', 'Menu', entry.id);
    entry.action();
  }
}

