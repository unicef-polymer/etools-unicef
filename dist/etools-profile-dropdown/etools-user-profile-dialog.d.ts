import { LitElement } from 'lit';
import '../etools-input/etools-input';
import '../etools-dialog/etools-dialog';
import '../etools-dropdown/etools-dropdown-multi';
import '../etools-dropdown/etools-dropdown';
/**
 * @polymer
 * @customElement
 */
export declare class EtoolsUserProfileDialog extends LitElement {
    private _profile;
    set profile(val: any);
    get profile(): any;
    offices: any;
    sections: any;
    users: any;
    readonly: boolean;
    availableCountryIds: any[];
    availableGroups: any[];
    showEmail: boolean;
    hideAvailableWorkspaces: boolean;
    language: string;
    /**
     *
     * FIELDS HIDDEN AS REQUIRED BY BUSINESS SPECS - CH6215
      <div class="row-h flex-c" hidden>
        <div class="col col-6">
          <etools-dropdown id="office" label="Office" placeholder="—" .selected="${this.profile?.office}"
                            .options="${this.offices}" auto-validate="" error-message="Please select an office">
          </etools-dropdown>
        </div>
        <div class="col col-6">
          <etools-dropdown id="section" label="Section" placeholder="—" .selected="${this.profile?.section}"
                            .options="${this.sections}" auto-validate="" error-message="Please select a section">
          </etools-dropdown>
        </div>
      </div>
      <div class="row-h flex-c">
        <div class="col col-6">
          <etools-input label="Job title" .value="${this.profile.job_title}" placeholder="—"></etools-input>
        </div>
        <div class="col col-6">
          <etools-input label="Phone number" .value="${this.profile.phone_number}" placeholder="—"></etools-input>
        </div>
      </div>
      <div class="row-h flex-c">
        <div class="col col-6">
          <etools-input id="supervisor" label="My supervisor" placeholder="—" .value="${this.profile.supervisor}"
                        readonly="">
          </etools-input>
        </div>
        <div class="col col-6">
          <etools-dropdown id="oic" label="My OIC" placeholder="—"
          .selected="${this.profile.oic}" .options="${this.users}"
                            auto-validate="" error-message="Please select an OIC">
          </etools-dropdown>
        </div>
      </div>
  
      <div class="row-h flex-c">
        <div class="col col-12">
          <etools-dropdown-multi id="supervisees" label="My supervisees" placeholder="—"
                                  .selectedValues="${this.profile.supervisees}" .options="${this.users}" readonly>
          </etools-dropdown-multi>
        </div>
      </div>
    */
    render(): import("lit-html").TemplateResult<1>;
    openUserProfileDialog(): void;
    _closeUserProfileDialog(e: any): void;
    getSeparator(collection: any, index: any): "" | "|";
    _mapIds(profile: any): void;
    _emptyArray(arr: any): boolean;
    saveData(): void;
}
