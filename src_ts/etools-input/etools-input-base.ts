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
}
