import { html, render } from 'lit-html';
import ViewBase from './viewBase';
export default class PricesSidebar extends ViewBase {
  constructor(depts) {
    super(depts.translation());
    this.depts = depts;
  }

  template(){
    return html`
      <div id="station-info"></div>
      <div id="select-charge-point"></div>

      <div id="noPricesAvailable" class="w3-margin-top">
        <label>${this.t("noTariffAvailable")}</label>
      </div>
      <div id="prices">
        <label id="batteryRangeInfo" class="w3-block"></label>
        <div id ="batteryRange" class="w3-margin-top"></div>

        <label id="parameterNote" class="w3-margin-bottom w3-margin-top w3-medium w3-block"></label>
        <table class="w3-table w3-striped w3-margin-top">
          <tr>
            <th>${this.t("tariff")}</th>
            <th id="pricesListCurrencyHeader" class="w3-right"></th>
          </tr>
          <tbody id="priceList">
              
          </tbody>
        </table>
        <div id="priceFeedback" class="w3-margin-top"></div>
        <label class="w3-margin-top w3-small w3-block">
          ${this.ut("totalPriceInfo")}
        </label>
      </div> 
    `;
  }

  render(){
    render(this.template(),document.getElementById("pricesContent"));
  }
}
