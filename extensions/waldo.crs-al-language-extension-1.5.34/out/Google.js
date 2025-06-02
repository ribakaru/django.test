"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Google = void 0;
const open = require("open");
const StringFunctions_1 = require("./StringFunctions");
const crsOutput = require("./CRSOutput");
const ApplicationInsights_1 = require("./ApplicationInsights");
class Google {
    static GetSearchUrl(SearchString) {
        return StringFunctions_1.StringFunctions.replaceAll(this.BusinessCentralSearchUrl, '<SearchString>', SearchString.split(' ').join('+'));
    }
    static OpenSearchUrl(SearchString) {
        let Url = this.GetSearchUrl(SearchString);
        open(Url);
        crsOutput.showOutput(`OpenSearchUrl ${Url}`);
        let appInsightsEntryProperties = {};
        appInsightsEntryProperties.Url = Url;
        appInsightsEntryProperties.SearchString = SearchString;
        ApplicationInsights_1.AppInsights.getInstance().trackEvent(ApplicationInsights_1.EventName.SearchGoogle, appInsightsEntryProperties);
    }
}
exports.Google = Google;
Google.BusinessCentralSearchUrl = 'http://www.google.com/search?q=<SearchString>+Business+Central';
//# sourceMappingURL=Google.js.map