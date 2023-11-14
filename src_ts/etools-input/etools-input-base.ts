import {LitElement} from 'lit';
import {property, state} from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';

export class EtoolsInputBase extends LitElement {
  @property({type: String})
  label!: string;

  @property({type: String, reflect: true, attribute: 'placeholder'})
  placeholder!: string;

  @property({type: Boolean, reflect: true, attribute: 'required-placeholder'})
  requiredPlaceholder = false;

  @property({type: Boolean, reflect: true, attribute: 'no-label-float'})
  noLabelFloat = false;

  @property({type: String, reflect: true, attribute: 'pattern'})
  pattern!: string;

  @property({type: String, reflect: true, attribute: 'allowed-pattern'})
  allowedPattern!: string;

  @property({type: String})
  value: number | string | null = null;

  @property({type: Boolean, reflect: true, attribute: 'disabled'})
  disabled = false;

  @property({type: Boolean, reflect: true, attribute: 'required'})
  required = false;

  @property({type: Boolean, reflect: true, attribute: 'readonly'})
  readonly = false;

  @property({type: String, reflect: true, attribute: 'error-message'})
  errorMessage = 'This field is required';

  @property({type: Boolean, reflect: true, attribute: 'auto-validate'})
  autoValidate = false;

  @state()
  _autoValidate = false;

  @property({type: Boolean, reflect: true, attribute: 'invalid'})
  invalid = false;

  @property({type: Boolean, reflect: true, attribute: 'always-float-label'})
  alwaysFloatLabel = false;

  @property({type: Number, attribute: 'min'})
  min: number | string | undefined;

  @property({type: Number, attribute: 'max'})
  max: number | string | undefined;

  @property({type: Number, attribute: 'step'})
  step: number | 'any' | undefined;

  @property({type: String, reflect: true, attribute: 'type'})
  type: 'date' | 'datetime-local' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' =
    'text';

  @property({type: Boolean, reflect: true, attribute: 'no-spin-buttons'})
  noSpinButtons = false;

  @property({type: Boolean, reflect: true, attribute: 'password-toggle'})
  passwordToggle = false;

  @property({type: Boolean, reflect: true, attribute: 'password-visible'})
  passwordVisible = false;

  @property({type: Boolean, reflect: true, attribute: 'clearable'})
  clearable = false;

  @property({type: Number, reflect: true, attribute: 'minlength'})
  minlength: number | undefined;

  @property({type: Number, reflect: true, attribute: 'maxlength'})
  maxlength: number | undefined;

  @property({type: Boolean, reflect: true, attribute: 'char-counter'})
  charCounter!: boolean;

  @property({type: Number})
  charCount = 0;

  @property({type: String, attribute: 'autocapitalize'})
  autocapitalize: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters' = 'off';

  @property({type: String, attribute: 'autocorrect'})
  autocorrect: 'off' | 'on' = 'off';

  @property({type: Boolean, reflect: true, attribute: 'wrap-text-in-readonly'})
  wrapTextInReadonly = true;
}
