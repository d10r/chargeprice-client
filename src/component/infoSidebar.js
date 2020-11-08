import { html, render } from 'lit-html';
import ViewBase from './viewBase';
import ModalFeedback from '../modal/feedback';
export default class InfoSidebar extends ViewBase {
  constructor(depts) {
    super(depts);
    this.analytics = depts.analytics();
  }

  template(){
    return html`
    <div class="w3-margin-bottom">
      <label class="w3-margin-top w3-large">${this.t("poiKey")}</label><br>
      <span>
        <img src="img/markers/fast_multi.png" class="key-marker">
        <img src="img/markers/ultra_multi.png" class="key-marker">
        ${this.t("fastChargerMultiInfo")}
      </span>
      <p>
        <div class="key-marker my-location-icon"></div> ${this.t("myLocationPin")}
        <img src="img/markers/search_single.png" class="key-marker w3-margin-left"> ${this.t("searchResultPin")}
      </p>
    </div>

    <div id="theme-info" class="w3-margin-bottom">
      <span id="theme-name"></span> ${this.t("poweredBy")} <a href="https://www.chargeprice.app" target="_blank">Chargeprice</a>
    </div>

    <button id="btAppInstall" class="w3-btn pc-secondary w3-margin-top w3-margin-bottom hidden">
      <img class="inverted" src="img/download.svg">
      ${this.t("installApp")}
    </button>
    
    <div class="w3-margin-bottom">
      <label class="w3-margin-top w3-large">${this.t("aboutHeader")}</label><br>
      <a href="http://www.chargeprice.net">chargeprice.net</a>
    </div>

    <div id="donate-button" class="w3-margin-bottom">
      <a href="http://paypal.me/chargeprice">
        <img src="https://www.paypalobjects.com/${this.t('paypalLocale')}/i/btn/btn_donateCC_LG.gif"/>
      </a>
    </div>

    <p>
      <button @click="${()=>this.onGiveFeedback("other_feedback")}" class="w3-btn pc-secondary w3-margin-top">${this.t("fbGiveFeedback")}</button>
      <button @click="${()=>this.onGiveFeedback("missing_station")}" class="w3-btn pc-secondary w3-margin-top">${this.t("fbReportMissingStationHeader")}</button>
    </p>

    <label class="w3-margin-top w3-large">${this.t("partnerHeader")}</label><br>
    <a @click="${()=>this.onGreenDrive()}" href="https://www.greendrive-accessories.com/" target="_blank"><img width="100%" src="img/partners/greendrive.png"></a>
    <br><br>

    <label class="w3-margin-top w3-large">${this.t("dataSourceHeader")}</label><br>
    <ul>
      <li>${this.ut("dataSourceContentGoingElectric")}</li>
      <li>${this.t("dataSourceContentOther")}</li>
    </ul>

    <label class="w3-margin-top w3-large">${this.t("disclaimerHeader")}</label><br>
    <div class="w3-margin-bottom">${this.t("disclaimerContent")}</div>

    <label class="w3-margin-top w3-large">${this.t("openSourceHeader")}</label><br>
    <div class="w3-margin-bottom">
      <a href="https://github.com/chargeprice/chargeprice-client" target="_blank">Chargeprice (Github)</a><br>
      <a href="https://github.com/chargeprice/chargeprice-api-docs" target="_blank">Chargeprice API (Github)</a><br>
      <a href="https://github.com/chargeprice/open-ev-data" target="_blank">Open EV Data (Github)</a><br>
    </div>
    `;
  }

  render(){
    render(this.template(),document.getElementById("infoContent"));
  }

  onGiveFeedback(type){
    new ModalFeedback(this.depts).show(type);
  }

  onGreenDrive(){
    this.analytics.log('send', 'event', 'AffiliatePartner', 'greendrive');
  }
}

