'use strict';
import { __decorate } from "tslib";
import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import '../etools-icons/etools-icon';
import '../etools-button/etools-button';
import '@a11y/focus-trap';
import './calendar-lite';
import '../etools-input/etools-input';
import dayjs from 'dayjs';
const dateLib = dayjs || window.moment;
if (!dateLib) {
    throw new Error('DatepickerLite: dayjs or moment is not loaded');
}
let openedDatepickerLiteElems = window.openedDatepickerLiteElems || [];
let openedDatepickerLiteElemsCloseTimeout = window.openedDatepickerLiteElemsCloseTimeout || null;
const controlFormat = 'YYYY-MM-DD';
const _closeDatepickers = (keepOpenDatepicker) => {
    openedDatepickerLiteElems.forEach((datePicker) => {
        if (datePicker.calendar.opened && keepOpenDatepicker !== datePicker.calendar) {
            datePicker.calendar.opened = false;
        }
    });
    openedDatepickerLiteElems =
        keepOpenDatepicker && keepOpenDatepicker.opened ? [{ keepOpen: false, calendar: keepOpenDatepicker }] : [];
};
const _getClickedDatepicker = (e) => {
    let clickedDatepicker = e.target.tagName.toLowerCase() === 'datepicker-lite' ? e.target : e.target.closest('datepicker-lite');
    if (!clickedDatepicker) {
        const openedDatepikerMap = openedDatepickerLiteElems.find((d) => d.keepOpen === true);
        if (openedDatepikerMap && openedDatepikerMap.keepOpen) {
            clickedDatepicker = openedDatepikerMap.calendar;
        }
    }
    return clickedDatepicker;
};
const _handleDatepickerLiteCloseOnClickOrTap = (e) => {
    if (openedDatepickerLiteElems.length === 0 || openedDatepickerLiteElemsCloseTimeout !== null) {
        return;
    }
    // timeout is used for debouncing Event and MouseEvent
    openedDatepickerLiteElemsCloseTimeout = setTimeout(() => {
        const clickedDatepicker = _getClickedDatepicker(e);
        openedDatepickerLiteElemsCloseTimeout = null;
        if (!(openedDatepickerLiteElems.length === 1 && openedDatepickerLiteElems[0] === clickedDatepicker)) {
            _closeDatepickers(clickedDatepicker);
        }
    }, 10);
};
document.addEventListener('tap', _handleDatepickerLiteCloseOnClickOrTap);
document.addEventListener('click', _handleDatepickerLiteCloseOnClickOrTap);
/**
 * @customElement
 * @polymer
 * @appliesMixin GestureEventListeners
 */
let DatePickerLite = class DatePickerLite extends LitElement {
    set value(value) {
        if (this._value !== value) {
            this._value = value;
            this._valueChanged(this.value);
        }
    }
    get value() {
        return this._value;
    }
    set monthInput(monthInput) {
        this._monthInput = monthInput;
        this.computeDate(this.monthInput, this.dayInput, this.yearInput);
    }
    get monthInput() {
        return this._monthInput;
    }
    set dayInput(dayInput) {
        this._dayInput = dayInput;
        this.computeDate(this.monthInput, this.dayInput, this.yearInput);
    }
    get dayInput() {
        return this._dayInput;
    }
    set yearInput(yearInput) {
        this._yearInput = yearInput;
        this.computeDate(this.monthInput, this.dayInput, this.yearInput);
    }
    get yearInput() {
        return this._yearInput;
    }
    render() {
        // language=HTML
        return html `
      <style>
        :host {
          display: block;
          max-width: 100%;
        }

        sl-input {
          width: 180px;
          max-width: 100%;
        }

        :host(:not([readonly])) etools-icon {
          cursor: pointer;
          --etools-icon-fill-color: var(--secondary-text-color);
        }

        etools-icon[slot='prefix'] {
          margin-inline-end: 8px;
        }

        etools-icon[slot='suffix'] {
          margin-inline-start: 8px;
          --etools-icon-font-size: var(--etools-font-size-20, 20px);
        }

        .clear-btn,
        .close-btn {
          margin: 10px;
        }

        .clear-btn::part(base) {
          background: var(--datepiker-lite-clear-btn-bg, #ff4747);
          color: #fff;
          padding: 6px;
        }

        .close-btn {
          padding: 6px;
        }

        .monthInput {
          width: 35px;
        }

        .dayInput {
          width: 25px;
        }

        .yearInput {
          width: 40px;
        }

        .actions {
          display: flex;
          justify-content: flex-end;
        }

        *[hidden] {
          display: none;
        }

        calendar-lite {
          z-index: 130;
          margin-top: -10px;
        }

        #dateDisplayinputContainer:not([readonly]) {
          cursor: pointer;
        }
      </style>

      <etools-input
        .label="${this.label}"
        id="dateDisplayinputContainer"
        always-float-label
        ?disabled="${this.disabled}"
        ?readonly="${this.readonly}"
        ?required="${this.required}"
        ?invalid="${this.invalid}"
        prevent-user-direct-input
        value="${this.formatDateForDisplay(this.value, this.readonly)}"
        .errorMessage="${this.errorMessage}"
        @keypress="${this._toggelOnKeyPressFromPaperInput}"
        @click="${this.toggleCalendarFromPaperInput}"
      >
        <etools-icon
          @keypress="${this._toggelOnKeyPressFromIcon}"
          ?readonly="${this.readonly}"
          name="date-range"
          title="Toggle calendar"
          tabindex="${this._getTabindexByReadonly(this.readonly)}"
          @click="${this.toggleCalendarFromIcon}"
          slot="prefix"
          part="dp-etools-icon"
        ></etools-icon>
        ${this.getXBtnHTML()}
      </etools-input>
      <focus-trap>
        <calendar-lite
          id="calendar"
          part="dp-calendar"
          @date-changed="${this.datePicked}"
          .date="${this.inputDate}"
          .minDate="${this.minDate}"
          .maxDate="${this.maxDate}"
          ?hidden="${!this.opened}"
          @keydown="${this.closeCalendarOnEsc}"
        >
          <div class="actions" slot="actions">${this.getActionsHTML()}</div>
        </calendar-lite>
      </focus-trap>
    `;
    }
    constructor() {
        super();
        this.readonly = false;
        this.required = false;
        this.errorMessage = 'Invalid date';
        this.disabled = false;
        this.invalid = false;
        this.opened = false;
        this.clearBtnInsideDr = false;
        this.closeOnSelect = true;
        this.autoValidate = false;
        this.minDateErrorMsg = 'Date is earlier than min date';
        this.maxDateErrorMsg = 'Date exceeds max date';
        this.requiredErrorMsg = 'This field is required';
        this.selectedDateDisplayFormat = 'D MMM YYYY';
        this.inputDateFormat = '';
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', () => {
            if (openedDatepickerLiteElems.length === 0) {
                return;
            }
            for (let i = 0; i < openedDatepickerLiteElems.length; i++) {
                if (openedDatepickerLiteElems[i].calendar === this && this.opened) {
                    openedDatepickerLiteElems[i].keepOpen = true;
                    break;
                }
            }
        });
    }
    updated(changedProperties) {
        // Invalid state should be reset when auto-validate becomes false as a
        // result of user cancelling the edit of the form
        if (changedProperties.has('autoValidate') && !this.autoValidate) {
            setTimeout(() => {
                this.invalid = false;
            }, 50);
        }
    }
    getActionsHTML() {
        return html `${this.getClearBtnHTML()} ${this.getCloseBtnHTML()}`;
    }
    getClearBtnHTML() {
        return this.readonly
            ? html ``
            : html `<etools-button class="clear-btn" @click="${this._clearData}" ?hidden="${!this.clearBtnInsideDr}"
          >Clear</etools-button
        >`;
    }
    getCloseBtnHTML() {
        return this.closeOnSelect
            ? html ``
            : html `<etools-button class="close-btn" @click="${this.toggleCalendar}">Close</etools-button>`;
    }
    getXBtnHTML() {
        const showXBtn = this.showXBtn(this.readonly, this.disabled, this.value);
        return showXBtn
            ? html ` <etools-icon
          name="clear"
          slot="suffix"
          @click="${this._clearData}"
          title="Clear"
          tabindex="0"
          ?hidden="${this.clearBtnInsideDr}"
          @keydown="${this.activateOnEnterAndSpace}"
          part="dp-etools-icon"
        ></etools-icon>`
            : html ``;
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
    closeCalendarOnEsc(event) {
        if (event.key === 'Escape') {
            event.preventDefault();
            event.target.closest('focus-trap').parentNode.host.opened = false;
        }
    }
    _getDateString(date) {
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        const year = date.getFullYear();
        month = month.length < 2 ? '0' + month : month;
        day = day.length < 2 ? '0' + day : day;
        return [year, month, day].join('-');
    }
    _getTabindexByReadonly(readOnly) {
        return readOnly ? '-1' : '0';
    }
    _triggerDateChangeCustomEvent(date) {
        if (this.fireDateHasChanged) {
            this.dispatchEvent(new CustomEvent('date-has-changed', {
                detail: { date: date },
                bubbles: true,
                composed: true
            }));
        }
    }
    datePicked(event) {
        if (this._clearDateInProgress) {
            this._clearDateInProgress = false;
            return;
        }
        const date = event.detail.value;
        if (!date) {
            return;
        }
        this._setDayMonthYearInInputElements(date);
        this.value = this._getDateString(date);
        if (this.closeOnSelect) {
            _closeDatepickers();
        }
        this._stopDateCompute = false;
    }
    _setDayMonthYearInInputElements(date) {
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        const year = date.getFullYear();
        month = month.length < 2 ? '0' + month : month;
        day = day.length < 2 ? '0' + day : day;
        this._stopDateCompute = true;
        this.monthInput = Number(month);
        this.dayInput = Number(day);
        this.yearInput = Number(year);
    }
    computeDate(month, day, year) {
        if (this.autoValidate) {
            // this.set('_stopDateCompute', false);
            this.invalid = !this._isValidYear() || !this._isValidMonth() || !this._isValidDay();
            if (this.invalid) {
                this.errorMessage = 'Invalid date';
            }
        }
        if (month !== undefined && day !== undefined && year !== undefined) {
            if (this._stopDateCompute) {
                // prevent setting wrong value when year/month/day are set by datepiker in datePicked
                return;
            }
            if (this.monthInput || this.dayInput || this.yearInput) {
                if (this._isValidYear() && this._isValidMonth() && this._isValidDay() && this._enteredDateIsValid()) {
                    const newDate = new Date(year, month - 1, day);
                    this.inputDate = newDate;
                    this.value = year + '-' + month + '-' + day;
                }
            }
            else {
                this.value = null;
            }
        }
    }
    toggleCalendarFromPaperInput() {
        this.toggleCalendar();
    }
    toggleCalendarFromIcon(e) {
        var _a, _b;
        e.stopImmediatePropagation();
        (_a = this.shadowRoot.querySelector('#dateDisplayinputContainer')) === null || _a === void 0 ? void 0 : _a.click();
        if (this.opened) {
            (_b = this.shadowRoot.querySelector('#dateDisplayinputContainer')) === null || _b === void 0 ? void 0 : _b.focus();
        }
    }
    toggleCalendar() {
        if (!this.readonly && !this.disabled) {
            this.shadowRoot.querySelector('#calendar').style.marginTop = `${this._getCalendarMarginTop()}px`;
            this.opened = !this.opened;
            if (openedDatepickerLiteElems.length > 0) {
                _closeDatepickers();
            }
            if (this.opened) {
                openedDatepickerLiteElems.push({ keepOpen: true, calendar: this });
            }
        }
    }
    _getCalendarMarginTop() {
        let marginTop = -10;
        const calendarHeight = 305;
        const datepickerPosition = this.shadowRoot.querySelector('#dateDisplayinputContainer').getBoundingClientRect();
        const availableHeightBelow = document.querySelector('body').getBoundingClientRect().height - datepickerPosition.bottom;
        if (availableHeightBelow < calendarHeight && datepickerPosition.top > availableHeightBelow) {
            // show calendar on top of the control
            marginTop = 0 - (datepickerPosition.height + calendarHeight);
        }
        return marginTop;
    }
    _toggelOnKeyPressFromPaperInput(event) {
        this._toggelOnKeyPress(event);
    }
    _toggelOnKeyPressFromIcon(event) {
        event.stopImmediatePropagation();
        this._toggelOnKeyPress(event);
    }
    _toggelOnKeyPress(event) {
        if (!this.readonly) {
            if (event.which === 13 || event.button === 0) {
                this.toggleCalendar();
            }
        }
    }
    _clearData(e) {
        if (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
        }
        this._clearDateInProgress = true;
        this.inputDate = null;
        this.monthInput = undefined;
        this.dayInput = undefined;
        this.yearInput = undefined;
        this.value = null;
        if (this.autoValidate) {
            this.validate();
        }
        else {
            this.invalid = false;
        }
        this._triggerDateChangeCustomEvent(this.value);
        setTimeout(() => {
            this._clearDateInProgress = false;
        }, 0);
    }
    _isValidYear() {
        if (this.yearInput !== undefined) {
            return this.yearInput >= 1970 && this.yearInput < 9999 && String(this.yearInput).length === 4;
        }
        return false;
    }
    _isValidMonth() {
        return Number(this.monthInput) >= 1 && Number(this.monthInput) <= 12;
    }
    _isValidDay() {
        return this.dayInput >= 1 && this.dayInput <= 31;
    }
    _enteredDateIsValid() {
        const newDate = new Date(this.yearInput, this.monthInput - 1, this.dayInput);
        const newYear = newDate.getFullYear();
        const newMonth = newDate.getMonth() + 1;
        const newDay = newDate.getDate();
        const valid = newMonth === Number(this.monthInput) && newDay === Number(this.dayInput) && newYear === Number(this.yearInput);
        if (!valid) {
            this.errorMessage = 'Invalid date';
        }
        return valid;
    }
    validate() {
        let valid = true;
        valid = this.requiredValidation() && this.maxDateValidation() && this.minDateValidation();
        if (valid) {
            if (this.yearInput || this.monthInput || this.dayInput) {
                valid = this._enteredDateIsValid();
            }
        }
        this.invalid = !valid;
        return valid;
    }
    maxDateValidation() {
        if (this.maxDate && this.value) {
            const valid = dateLib(this.value, controlFormat).toDate() <= this.maxDate;
            if (!valid) {
                this.errorMessage = this.maxDateErrorMsg;
            }
            return valid;
        }
        return true;
    }
    minDateValidation() {
        if (this.minDate && this.value) {
            const valid = dateLib(this.value, controlFormat).toDate() >= this.minDate;
            if (!valid) {
                this.errorMessage = this.minDateErrorMsg;
            }
            return valid;
        }
        return true;
    }
    requiredValidation() {
        if (this.required) {
            const valid = this._isValidMonth() && this._isValidDay() && this._isValidYear() && this._enteredDateIsValid();
            if (!valid) {
                this.errorMessage = this.requiredErrorMsg
                    ? this.requiredErrorMsg
                    : this.maxDate
                        ? 'This field is required'
                        : this.errorMessage;
            }
            return valid;
        }
        return true;
    }
    _valueChanged(newValue) {
        if (!newValue) {
            if (this.monthInput || this.dayInput || this.yearInput) {
                this._clearData();
            }
            return;
        }
        if (this.inputDateFormat) {
            const formattedDate = dateLib(newValue, this.inputDateFormat, true);
            if (formattedDate.isValid()) {
                newValue = formattedDate.format(controlFormat);
            }
        }
        const dData = newValue.split('-');
        if (dData.length !== 3) {
            // value need to be yyyy-mm-dd format
            return;
        }
        this._stopDateCompute = true;
        this.monthInput = dData[1];
        this.dayInput = dData[2].slice(0, 2);
        this.yearInput = dData[0];
        this._stopDateCompute = false;
        const d = new Date(dData[0], Number(dData[1]) - 1, dData[2]);
        if (d.toString() !== 'Invalid Date') {
            this.inputDate = d;
            this._triggerDateChangeCustomEvent(this.value);
        }
    }
    _handleOnBlur() {
        if (this.autoValidate) {
            this.validate();
        }
    }
    formatDateForDisplay(selectedDt, readonly) {
        if (!selectedDt) {
            return readonly ? '—' : '';
        }
        return dateLib(selectedDt, controlFormat).format(this.selectedDateDisplayFormat);
    }
    showXBtn(readonly, disabled, selectedDt) {
        return !readonly && !disabled && selectedDt;
    }
};
__decorate([
    property({
        type: String
    })
], DatePickerLite.prototype, "value", null);
__decorate([
    property({
        type: Boolean,
        reflect: true
    })
], DatePickerLite.prototype, "readonly", void 0);
__decorate([
    property({
        type: Boolean,
        reflect: true
    })
], DatePickerLite.prototype, "required", void 0);
__decorate([
    property({
        type: String,
        reflect: true,
        attribute: 'error-message'
    })
], DatePickerLite.prototype, "errorMessage", void 0);
__decorate([
    property({
        type: Boolean,
        reflect: true
    })
], DatePickerLite.prototype, "disabled", void 0);
__decorate([
    property({
        type: String
    })
], DatePickerLite.prototype, "label", void 0);
__decorate([
    property({
        type: Number
    })
], DatePickerLite.prototype, "monthInput", null);
__decorate([
    property({
        type: Number
    })
], DatePickerLite.prototype, "dayInput", null);
__decorate([
    property({
        type: Number
    })
], DatePickerLite.prototype, "yearInput", null);
__decorate([
    property({
        type: Boolean
    })
], DatePickerLite.prototype, "invalid", void 0);
__decorate([
    property({
        type: Date
        // notify: true
    })
], DatePickerLite.prototype, "inputDate", void 0);
__decorate([
    property({
        type: Boolean
    })
], DatePickerLite.prototype, "opened", void 0);
__decorate([
    property({
        type: Boolean,
        reflect: true,
        attribute: 'clear-btn-inside-dr'
    })
], DatePickerLite.prototype, "clearBtnInsideDr", void 0);
__decorate([
    property({
        type: Boolean,
        reflect: true,
        attribute: 'close-on-select'
    })
], DatePickerLite.prototype, "closeOnSelect", void 0);
__decorate([
    property({
        type: Boolean
    })
], DatePickerLite.prototype, "_clearDateInProgress", void 0);
__decorate([
    property({
        type: Boolean
    })
], DatePickerLite.prototype, "_stopDateCompute", void 0);
__decorate([
    property({
        type: Boolean,
        reflect: true,
        attribute: 'auto-validate'
    })
], DatePickerLite.prototype, "autoValidate", void 0);
__decorate([
    property({
        type: Date,
        reflect: true,
        attribute: 'min-date',
        converter: {
            fromAttribute: (value) => {
                if (typeof value === 'string') {
                    return dateLib(value, controlFormat).toDate();
                }
                return value;
            }
        }
    })
], DatePickerLite.prototype, "minDate", void 0);
__decorate([
    property({
        type: Date,
        reflect: true,
        attribute: 'max-date',
        converter: {
            fromAttribute: (value) => {
                if (typeof value === 'string') {
                    return dateLib(value, controlFormat).toDate();
                }
                return value;
            }
        }
    })
], DatePickerLite.prototype, "maxDate", void 0);
__decorate([
    property({
        type: Boolean,
        reflect: true,
        attribute: 'fire-date-has-changed'
    })
], DatePickerLite.prototype, "fireDateHasChanged", void 0);
__decorate([
    property({
        type: String,
        reflect: true,
        attribute: 'min-date-error-msg'
    })
], DatePickerLite.prototype, "minDateErrorMsg", void 0);
__decorate([
    property({
        type: String,
        reflect: true,
        attribute: 'max-date-error-msg'
    })
], DatePickerLite.prototype, "maxDateErrorMsg", void 0);
__decorate([
    property({
        type: String,
        reflect: true,
        attribute: 'required-error-msg'
    })
], DatePickerLite.prototype, "requiredErrorMsg", void 0);
__decorate([
    property({
        // to display selected date in a different format than default 'YYYY-MM-DD'
        // Ex: other option would be 'D MMM YYYY'
        type: String,
        reflect: true,
        attribute: 'selected-date-display-format'
    })
], DatePickerLite.prototype, "selectedDateDisplayFormat", void 0);
__decorate([
    property({
        // datepicker works internally with date in format 'YYYY-MM-DD', in case input
        // value has a different format, this can be specified using this property
        type: String,
        reflect: true,
        attribute: 'input-date-format'
    })
], DatePickerLite.prototype, "inputDateFormat", void 0);
DatePickerLite = __decorate([
    customElement('datepicker-lite')
], DatePickerLite);
export { DatePickerLite };
