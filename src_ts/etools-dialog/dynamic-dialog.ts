/* Create etools-dialog programmatically and add them directly to the body.
  Now paper-dialog has an issues and the backdrop that covers all the content(if dialog is not a child of body),
  everything becomes unselectable.
  This way of creating the dialog will fix the issue. */

import './etools-dialog.js';

export function createDynamicDialog(config) {
  if (!_validateParams(config)) {
    return null;
  }

  const dialog = document.createElement('etools-dialog') as any;
  _applyDefaultDialogConfig(dialog);

  for (const propertyName in config) {
    if (!Object.prototype.hasOwnProperty.call(config, propertyName) || propertyName === 'closeCallback') {
      continue;
    }
    if (propertyName === 'noPadding' && typeof config[propertyName] === 'boolean') {
      dialog.noPadding = config.noPadding;
      continue;
    }
    if (typeof config[propertyName] === 'string' && config[propertyName] !== '') {
      dialog[propertyName] = config[propertyName];
    }
  }
  // set close callback
  if (config.closeCallback) {
    dialog.addEventListener('close', function (event) {
      config.closeCallback(event);
    });
  }

  document.querySelector('body')!.appendChild(dialog);

  setTimeout(() => {
    const msgPlaceholder = dialog.shadowRoot!.querySelector('#dynamicContent');
    if (msgPlaceholder) {
      msgPlaceholder.appendChild(config.content);
    }
  }, 400);

  return dialog;
}

export function createDialog(title, size, okBtnText, cancelBtnText, closeCallback, content, removePadding, theme) {
  const config = {
    title: title,
    size: size,
    okBtnText: okBtnText,
    cancelBtnText: cancelBtnText,
    closeCallback: closeCallback,
    content: content,
    noPadding: removePadding,
    theme: theme
  };
  const dialog = createDynamicDialog(config)!;
  document.querySelector('body')!.appendChild(dialog);
  return dialog;
}

export function removeDialog(dialogElement) {
  document.querySelector('body')!.removeChild(dialogElement);
}

function _validateParams(config) {
  if (typeof config.content === 'undefined' || config.content === null) {
    return false;
  }
  return true;
}

function _applyDefaultDialogConfig(dialog) {
  dialog.theme = 'confirmation';
  dialog.okBtnText = 'Yes';
  dialog.cancelBtnText = 'No';
}
