/**
 * Update month/day to locale datetime
 *
 * Requirement: <https://github.com/iamkun/dayjs>
 */

/* A tool for locale datetime */
class LocaleHelper {
  static datetimeAttr = 'datetime';

  static get locale() {
    return document.documentElement.getAttribute('lang').substring(0, 2);
  }

  static getDatetime(elem) {
    return elem.getAttribute(this.datetimeAttr);
  }
}

export function initLocaleDatetime() {
  dayjs.locale(LocaleHelper.locale);
  dayjs.extend(window.dayjs_plugin_localizedFormat);

  document
    .querySelectorAll(`[${LocaleHelper.datetimeAttr}][data-df]`)
    .forEach((elem) => {
      const date = dayjs(LocaleHelper.getDatetime(elem));
      elem.textContent = date.format(elem.dataset.df);
      delete elem.dataset.df;
    });
}
