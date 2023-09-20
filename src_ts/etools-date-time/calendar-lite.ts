import {LitElement, html} from 'lit';
import {property, customElement} from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import {elevationStyles} from './styles/elevation-styles';
import {translatedDayNames, translatedDaysFirstLetter, translatedMonthNames} from './assets/translations';

const dateLib = (window as any).dayjs || (window as any).moment;
const controlFormat = 'YYYY-MM-DD';

if (!dateLib) {
  throw new Error('CalendarLite: dayjs or moment is not loaded');
}

@customElement('calendar-lite')
export class CalendarLite extends LitElement {
  private _date: any;
  private tmpDate: Date | null = null;
  private cf: number | null = null;
  private days_names: string[] = [];
  private _mainContent: any;
  private months_names: any;
  private current_page: string = '';
  private tmpObject: any = null;
  private multiple: string[] = [];
  private _animationEvent: any;
  private todayYear!: number;
  private todayMonth!: number;
  private todayDay!: number;
  private years: number[] = [];

  @property({
    type: Date
  })
  set date(date) {
    if (this._date && date && this._date.getTime() === date.getTime()) {
      return;
    }
    this._date = date;
    this._populate(this.date);
    this.dispatchEvent(
      new CustomEvent('date-changed', {
        detail: {value: this.date},
        bubbles: true,
        composed: true
      })
    );
  }

  get date() {
    return this._date;
  }
  @property({
    type: Number
  })
  currentMonth!: number;

  @property({
    type: Number
  })
  currentDay!: number;

  @property({
    type: Date,
    reflect: true,
    attribute: 'min-date',
    converter: {
      fromAttribute: (value) => {
        if (typeof value === 'string') {
          return dateLib(value, controlFormat).toDate();
        }
      }
    }
  })
  minDate: Date | null = null;

  @property({
    type: Date,
    reflect: true,
    attribute: 'max-date',
    converter: {
      fromAttribute: (value) => {
        if (typeof value === 'string') {
          return dateLib(value, controlFormat).toDate();
        }
      }
    }
  })
  maxDate: Date | null = null;

  @property({
    type: Array
  })
  disabledDays: number[] = [];

  @property({
    type: Number
  })
  currentYear!: number;

  @property({
    type: Object
  })
  multiSelect: any = null;

  @property({
    type: Array
  })
  days: number[] = [];

  @property({
    type: Array
  })
  separator: number[] = [0, 1, 2, 3, 4, 5];

  @property({
    type: Array
  })
  disabledWeekDay: string[] = [];

  @property({
    type: String,
    reflect: true,
    attribute: 'pretty-date'
  })
  prettyDate!: string;

  @property({
    type: String
  })
  format = 'YYYY-MM-DD';

  @property({
    type: Boolean,
    reflect: true,
    attribute: 'hide-header'
  })
  hideHeader = false;

  private _language = window.EtoolsLanguage || 'en';
  @property({
    type: String
  })
  set language(val) {
    if (val) {
      this._language = val;
      this.days_names = translatedDayNames(this._language);
      this.months_names = translatedMonthNames(this._language);
      this.requestUpdate();
    }
  }
  get language() {
    return this._language;
  }

  static get styles() {
    return [elevationStyles];
  }

  render() {
    // language=HTML
    return html`
      <style>
        :host {
          display: block;
          background-color: white;
          width: 312px;
          -webkit-font-smoothing: antialiased;
          font-family: Helvetica, Arial, sans-serif;
          border: 1px solid #eee;
          --my-elem-primary: var(--primary-color, #3acfe3);
          text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
          text-rendering: optimizeLegibility !important;
          -webkit-font-smoothing: antialiased !important;
          position: absolute;
          z-index: 1;
          border-radius: 0.5rem;
        }

        /*Animation while showing next or previous months*/

        .slide-right {
          animation: slide-right 0.4s linear forwards;
          visibility: hidden;
          -webkit-animation: slide-right 0.4s linear forwards;
        }

        .slide-left {
          animation: slide-left 0.4s linear forwards;
          visibility: hidden;
          -webkit-animation: slide-left 0.4s linear forwards;
        }

        /* Animation while showing years and months*/

        .scale-up {
          animation: scale-up 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          -webkit-animation: scale-up 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        @-webkit-keyframes scale-up {
          0% {
            -webkit-transform: scale(0);
            transform: scale(0);
          }
          100% {
            -webkit-transform: scale(1, 1);
            transform: scale(1, 1);
          }
        }

        @-webkit-keyframes slide-left {
          0% {
            -webkit-transform: translateX(0%);
            transform: translateX(0%);
            visibility: hidden;
          }
          30% {
            -webkit-transform: translateX(3%);
            transform: translateX(3%);
            visibility: hidden;
          }
          60% {
            -webkit-transform: translateX(-3%);
            transform: translateX(-3%);
            visibility: hidden;
          }
          90% {
            -webkit-transform: translateX(0%);
            transform: translateX(0%);
            visibility: visible;
          }
          100% {
            -webkit-transform: translateX(0%);
            visibility: visible;
          }
        }

        @-webkit-keyframes slide-right {
          0% {
            -webkit-transform: translateX(0%);
            transform: translateX(0%);
            visibility: hidden;
          }
          30% {
            -webkit-transform: translateX(-3%);
            transform: translateX(-3%);
            visibility: hidden;
          }
          60% {
            -webkit-transform: translateX(3%);
            transform: translateX(3%);
            visibility: hidden;
          }
          90% {
            -webkit-transform: translateX(0%);
            transform: translateX(0%);
            visibility: visible;
          }
          100% {
            -webkit-transform: translateX(0%);
            visibility: visible;
          }
        }

        /* Decorate scroll bar for years list*/

        .flex-wrap::-webkit-scrollbar-track {
          background-clip: padding-box;
          border: solid transparent;
          border-width: 0 0 0 4px;
        }

        .flex-wrap::-webkit-scrollbar {
          width: 6px;
        }

        #yearList {
          height: 220px;
        }

        .flex-wrap::-webkit-scrollbar-thumb {
          background-color: darkgrey;
          outline: 1px solid slategrey;
        }

        /* color the .dateSticker on selected */

        .dateSticker.selected {
          background: var(--my-elem-primary);
          color: #fff;
        }

        .dateSticker.today {
          border: solid 1px var(--my-elem-primary);
          margin-top: -0.5px !important;
        }

        /* disabled .dateSticker color and pointer */

        .dateSticker[disabled] {
          color: #9d9898;
          cursor: not-allowed !important;
        }

        /* change border on hover on years in  years list and months in months list */

        .dateItem:hover {
          transition: border 0.3s ease;
          border: 1px solid #eee;
        }

        .flex-horizontal,
        .dates {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        .flexchild {
          display: flex;
          flex-direction: row;
          flex: 1;
          justify-content: left;
          align-items: center;
          padding: 0 5px 0 5px;
          color: #474e54;
          font-size: 1.2em;
          font-weight: 700;
        }

        .flexchild > div > sl-icon-button {
          margin-inline-start: -4px;
        }

        .dayNames,
        .dates {
          justify-content: space-between;
        }

        .dates .dateSticker {
          border-radius: 50%;
          padding: 4px;
          text-align: center;
          width: 24px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          height: 24px;
          cursor: pointer;
          margin: 1px;
          font-size: 14px;
        }

        .notextselect,
        .dateSticker {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .dayNames > div {
          padding: 8px 12px;
          font-size: 12px;
          color: #474e54;
          font-weight: 700;
        }

        .flex-wrap {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          height: 100%;
          align-items: center;
          overflow: auto;
          justify-content: center;
          overflow: auto;
        }

        .monthwrap {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
        }

        .monthwrap div {
          margin: 4px;
        }

        .dateItem {
          border: 1px solid transparent;
          cursor: pointer;
          font-size: 15px;
          padding: 8px 12px;
          border-radius: 4px;
        }

        .flex-wrap div {
          padding: 8px;
          margin: 3px;
          font-size: 13px;
        }

        .pageContainer {
          padding-bottom: 14px;
        }

        .headerContainer {
          cursor: pointer;
          padding: 4px;
          width: 50%;
          display: flex;
          align-items: center;
        }

        .swipePanel sl-icon-button {
          margin: 2px;
          border: solid 2px #dddddd;
          border-radius: 50%;
        }

        #dateContainer {
          height: 195px;
        }

        .swipePanel sl-icon-button[focused] {
          background: #dddddd;
        }
        .elevation[elevation='1'] {
          height: 100%;
          padding: 0 12px 0 12px;
          border-radius: 0.5rem;
        }
        .container.menu {
          padding-top: 10px;
          margin-bottom: 10px;
          border-bottom: solid 1px var(--primary-color);
        }
        #headerYear:focus {
          outline: 1px solid white;
        }
        #headerMonth:focus {
          outline: 1px solid white;
        }
        .day:focus:not(:focus-visible) {
          outline: 0;
        }
        .day:focus-visible {
          outline: 1px solid black;
        }
      </style>

      <!-- Main header date,month,year are compund binded to selected date -->

      <div class="elevation" elevation="1">
        <div>
          <!-- header with  left, right icon and present viewing month  -->
          <div class="container menu flex-horizontal">
            <div class="flexchild">
              <div
                id="headerMonth"
                class="headerContainer notextselect"
                type="monthsList"
                @keydown="${this.activateOnEnterAndSpace}"
                @click="${this._show}"
              >
                ${this.monthFormat}
                <sl-icon-button type="monthsList" @click="${this._show}" name="expand-more"></sl-icon-button>
              </div>
              <div
                id="headerYear"
                class="headerContainer notextselect"
                type="yearList"
                @keydown="${this.activateOnEnterAndSpace}"
                @click="${this._show}"
              >
                ${this.yearFormat}
                <sl-icon-button type="yearList" @click="${this._show}" name="expand-more"></sl-icon-button>
              </div>
            </div>
            <div class="swipePanel">
              <sl-icon-button @click="${this._swipePrevMonth}" name="chevron-left"></sl-icon-button>
              <sl-icon-button
                @click="${this._swipeNextMonth}"
                name="chevron-right"
                @keydown="${this.onSwipeNextKeyDown}"
              ></sl-icon-button>
            </div>
          </div>

          <!-- .pageContainer contains calendar, months list and years list  -->

          <div class="pageContainer">
            <!-- years list -->

            <div id="yearList" class="page" style="display:none;">
              <div class="flex-wrap">
                ${(this.years || []).map(
                  (item) => html`
                    <div
                      class="dateItem notextselect yearItem"
                      tabindex="0"
                      .item=${item}
                      @keydown="${this.activateOnEnterAndSpace}"
                      @click="${this._setYear}"
                    >
                      ${item}
                    </div>
                  `
                )}
              </div>
            </div>

            <!-- months list -->

            <div id="monthsList" class="page" style="display:none;">
              <div class="monthwrap">
                ${this.months_names.map(
                  (item) => html`
                    <div
                      class="dateItem notextselect"
                      tabindex="0"
                      .item=${item}
                      @keydown="${this.activateOnEnterAndSpace}"
                      @click="${this._setMonth}"
                    >
                      ${item}
                    </div>
                  `
                )}
              </div>
            </div>

            <!-- calendar -->

            <div class="container page" id="calendarContent">
              <div id="mainContent">
                <div class="container flex-horizontal dayNames">
                  <div>${translatedDaysFirstLetter(this.language, 0)}</div>
                  <div>${translatedDaysFirstLetter(this.language, 1)}</div>
                  <div>${translatedDaysFirstLetter(this.language, 2)}</div>
                  <div>${translatedDaysFirstLetter(this.language, 3)}</div>
                  <div>${translatedDaysFirstLetter(this.language, 4)}</div>
                  <div>${translatedDaysFirstLetter(this.language, 5)}</div>
                  <div>${translatedDaysFirstLetter(this.language, 6)}</div>
                </div>
                <div id="dateContainer">
                  <!-- separator splits calendar into 6 rows -->
                  ${this.separator.map(
                    (row) => html` <div class="dates">${this._getDays(row).map((day) => this._getDayHTML(day))}</div> `
                  )}
                </div>
              </div>
            </div>
          </div>

          <slot name="actions"></slot>
        </div>
      </div>
    `;
  }

  updated(changedProperties) {
    if (
      (changedProperties.has('minDate') && changedProperties.get('minDate')) ||
      (changedProperties.has('maxDate') && changedProperties.get('maxDate'))
    ) {
      this.generateTable();
    }
  }

  get mainContent() {
    if (!this._mainContent) {
      this._mainContent = this.shadowRoot!.querySelector('#mainContent');
    }
    return this._mainContent;
  }

  _getSelectedYear() {
    return this.date ? this.date.getFullYear() : this._getCurrentDate().getFullYear();
  }

  _getSelectedMonth() {
    return this.date ? this.date.getMonth() : this._getCurrentDate().getMonth();
  }

  _getSelectedDay() {
    return this.date ? this.date.getDate() : null;
  }

  _getCurrentDate() {
    return new Date();
  }

  get monthFormat() {
    return this.months_names[this.currentMonth];
  }

  get yearFormat() {
    return this.currentYear;
  }

  constructor() {
    super();
    this.initializeProperties();
  }

  initializeProperties() {
    this.days_names = translatedDayNames(this.language);
    this.months_names = translatedMonthNames(this.language);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  }

  handleLanguageChange(e) {
    this.language = e.detail.language;
  }

  onSwipeNextKeyDown(event) {
    if (event.key === 'Tab' && !event.shiftKey) {
      // when using tab navigation on years select by default current year
      const elSelectedYear = this._scrollToSelectedYear();
      if (elSelectedYear) {
        setTimeout(() => {
          elSelectedYear.focus();
        }, 10);
      }
    }
  }

  activateOnEnterAndSpace(event) {
    if ((event.key === ' ' && !event.ctrlKey) || event.key === 'Enter') {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      event.target.click();
      return false;
    }

    return true;
  }

  focusOnHeaderYear() {
    (this.shadowRoot!.querySelector('#headerYear') as any)!.focus();
  }

  // to get number of days in a month
  monthDays(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  connectedCallback() {
    // generate 6 x 7 table
    super.connectedCallback(); // for 2.0 class-based elements only

    document.addEventListener('language-changed', this.handleLanguageChange);

    this.days_names = translatedDayNames(this.language);
    this.months_names = translatedMonthNames(this.language);

    this._animationEvent = this._whichAnimationEnd();

    this.multiple.push(this._getSelectedDay() + ',' + this._getSelectedMonth() + ',' + this._getSelectedYear());

    this.currentYear = this._getSelectedYear();
    this.currentMonth = this._getSelectedMonth();

    this.todayYear = this._getCurrentDate().getFullYear();
    this.todayMonth = this._getCurrentDate().getMonth();
    this.todayDay = this._getCurrentDate().getDate();

    this.generateTable();

    // push into years list
    if (!!this.maxDate && !!this.minDate) {
      this._generateYears(this.minDate.getFullYear(), this.maxDate.getFullYear());
    } else {
      this._generateYears(this.currentYear - 10, this.currentYear + 10);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('language-changed', this.handleLanguageChange);
  }

  generateTable() {
    // clone into tmpDate
    this.tmpDate = new Date(this.currentYear, this.currentMonth, 1);

    // tmpArray contains 6x7(42) items
    let tmpArray: any[] = [];
    this.cf = 0;
    // fill with empty cells
    for (let i = 0; i < this.tmpDate.getDay(); i++) {
      tmpArray.push({text: '', isDisabled: false, i: this.cf++});
    }

    // fill days and check disable dates
    for (let i = 1; i <= this.monthDays(this.tmpDate); i++) {
      this.tmpDate.setDate(i);
      if (
        (!!this.minDate && this.tmpDate < this.minDate) ||
        (!!this.maxDate && this.tmpDate > this.maxDate) ||
        this.disabledWeekDay.indexOf(this.days_names[this.tmpDate.getDay()]) != -1 ||
        this.disabledDays.indexOf(i) != -1
      ) {
        tmpArray.push({text: i, isDisabled: true, i: this.cf++});
      } else {
        tmpArray.push({text: i, isDisabled: false, i: this.cf++});
      }
    }
    // fill remaining empty cells
    this.cf = tmpArray.length > 35 ? 42 - tmpArray.length : 34 - tmpArray.length;
    for (let j = 0; j <= this.cf; j++) {
      tmpArray.push({text: ''});
    }
    this.days = tmpArray;
    tmpArray = [];
  }

  _getDayClass(dayText) {
    if (this.multiSelect != null) {
      if (this.multiple.indexOf(dayText + ',' + this.currentMonth + ',' + this.currentYear) > -1) {
        return 'dateSticker selected';
      }
    }
    if (
      this._getSelectedDay() == dayText &&
      this._getSelectedMonth() == this.currentMonth &&
      this._getSelectedYear() == this.currentYear
    ) {
      return 'dateSticker selected';
    }
    if (dayText == this.todayDay && this.currentMonth == this.todayMonth && this.currentYear == this.todayYear) {
      return 'dateSticker today';
    }
    return 'dateSticker';
  }

  _setDate(e) {
    const f = e.target.day;
    if (f.text != '' && !f.isDisabled) {
      if (this.multiSelect != null) {
        if (this.multiSelect.consequent) {
          this.multiple = [];
          this.cf = f.i;
          this.multiple.push(f.text + ',' + this.currentMonth + ',' + this.currentYear);
          for (let j = 1; this.multiple.length < this.multiSelect.max; j++) {
            this.tmpDate = new Date(this.currentYear, this.currentMonth, f.text + j);
            if (
              (!!this.minDate && this.tmpDate <= this.minDate) ||
              (!!this.maxDate && this.tmpDate >= this.maxDate) ||
              this.disabledWeekDay.indexOf(this.days_names[this.tmpDate.getDay()]) != -1 ||
              this.disabledDays.indexOf(this.tmpDate.getDate()) != -1
            ) {
              // Nothing to do
            } else {
              this.multiple.push(
                this.tmpDate.getDate() + ',' + this.tmpDate.getMonth() + ',' + this.tmpDate.getFullYear()
              );
            }
          }
        } else {
          this.cf = this.multiple.indexOf(f.text + ',' + this.currentMonth + ',' + this.currentYear);
          if (this.cf < 0) {
            this.multiple.push(f.text + ',' + this.currentMonth + ',' + this.currentYear);
          } else {
            e.target.classList.remove('selected');
            this.multiple.splice(this.cf, 1);
            this.triggerEvent('multiselect', this.multiple);
            return;
          }
          if (this.multiple.length > this.multiSelect.max) {
            this.multiple.shift();
          }
        }
        this.triggerEvent('multiselect', this.multiple);
      }

      this.date = new Date(this.currentYear, this.currentMonth, f.text);
      this.prettyDate = dateLib(this.date).format(this.format);
    }
  }

  _keyPressSelect(e) {
    if (e.which === 13) {
      this._setDate(e);
    }
  }

  triggerEvent(e, data) {
    this.dispatchEvent(new CustomEvent(e, {detail: {dates: data}}));
  }

  _setYear(e) {
    this.currentYear = e.target.item;
    this.generateTable();
    this.current_page = 'calendarContent';
    this.pagination();
  }

  _setMonth(e) {
    this.currentMonth = this.months_names.indexOf(e.target.item);
    this.generateTable();
    this.current_page = 'calendarContent';
    this.pagination();
  }

  _show(e) {
    this.current_page = e.target.attributes.type.value;
    setTimeout(() => {
      this._scrollToSelectedYear();
    }, 50);

    this.pagination();
  }

  _scrollToSelectedYear() {
    let selectedYearElem;
    const yearList = this.shadowRoot!.querySelector('#yearList') as any;
    if (yearList && yearList.style.display !== 'none') {
      const list = this.shadowRoot!.querySelectorAll('.yearItem');
      selectedYearElem = Array.from(list).find((el: any) => Number(el.innerText) === this._getSelectedYear());
      if (selectedYearElem) {
        selectedYearElem.scrollIntoView({block: 'center'});
      }
    }
    return selectedYearElem;
  }

  pagination() {
    let pages = this.shadowRoot!.querySelectorAll('.page') as any;
    for (let i = 0; i < pages.length; i++) {
      pages[i].style.display = 'none';
    }
    this.tmpObject = this.shadowRoot!.querySelector('#' + this.current_page) as any;
    this.tmpObject.style.display = 'block';
    this.tmpObject.classList.add('scale-up');
    this._once(
      this._animationEvent,
      () => {
        this.tmpObject.classList.remove('scale-up');
      },
      this.tmpObject
    );

    pages = null;
  }

  _generateYears(min, max) {
    const tmpArray: number[] = [];
    for (let i = min; i <= max; i++) {
      tmpArray.push(i);
    }
    this.years = tmpArray;
  }

  _populate(newDate) {
    this.currentMonth = newDate ? newDate.getMonth() : this._getCurrentDate().getMonth();
    this.currentYear = newDate ? newDate.getFullYear() : this._getCurrentDate().getFullYear();
    this.currentDay = newDate ? newDate.getDay() : null;
    this.generateTable();
  }

  _swipeNextMonth() {
    this.mainContent.classList.add('slide-right');
    this._once(
      this._animationEvent,
      () => {
        this.mainContent.classList.remove('slide-right');
      },
      this.mainContent
    );
    this.changeView(1);
  }

  changeView(x) {
    const tmp = new Date(this.currentYear, this.currentMonth, 1);
    tmp.setMonth(this.currentMonth + (typeof x === 'number' ? x : 0));
    this.currentMonth = tmp.getMonth();
    this.currentYear = tmp.getFullYear();
    this.dispatchEvent(new CustomEvent('month-change', {detail: {date: this.tmpDate}}));
    this.generateTable();
  }

  _once(eventName, callback, node) {
    function onceCallback() {
      node.removeEventListener(eventName, onceCallback);
      callback();
    }

    node.addEventListener(eventName, onceCallback);
  }

  _swipePrevMonth() {
    this.mainContent.classList.add('slide-left');
    this._once(
      this._animationEvent,
      () => {
        this.mainContent.classList.remove('slide-left');
      },
      this.mainContent
    );
    this.changeView(-1);
  }

  _getDays(row) {
    return this.days.slice(row * 7, row * 7 + 7);
  }

  _getDayHTML(day) {
    const tabIndex = day.text ? 0 : -1;
    const cssClass = this._getDayClass(day.text) + (day.text ? ' day' : '');
    return html` <div
      @click="${this._setDate}"
      .day=${day}
      @keydown="${this._keyPressSelect}"
      class="${cssClass}"
      ?disabled="${day.isDisabled}"
      tabindex="${tabIndex}"
    >
      ${day.text}
    </div>`;
  }

  _whichAnimationEnd() {
    const animations = {
      WebkitTransition: 'webkitAnimationEnd',
      MozTransition: 'animationend',
      OTransition: 'oanimationend  oAnimationEnd ',
      transition: 'animationend'
    };

    for (const t in animations) {
      if (this.style[t] !== undefined) {
        return animations[t];
      }
    }
  }
}
