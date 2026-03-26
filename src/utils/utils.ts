export const toggleAttributeValue = (el: any, attrName: string, attrVal1: any, attrVal2: any) => {
  if (!el || !el.hasAttribute) {
    return;
  }

  if (!el.hasAttribute(attrName)) {
    el.setAttribute(attrName, attrVal1);
    return;
  }

  if (el.getAttribute(attrName) === attrVal1) {
    el.setAttribute(attrName, attrVal2);
  } else {
    el.setAttribute(attrName, attrVal1);
  }
};

export interface IDialog<D> {
  dialog: string;
  dialogData?: D;
  readonly?: boolean;
}

export interface IDialogResponse<R> {
  response?: R;
  confirmed: boolean;
}

export function openDialog<D, R = any>({dialog, dialogData, readonly}: IDialog<D>): Promise<IDialogResponse<R>> {
  return new Promise((resolve: (detail: IDialogResponse<R>) => any, reject: (e: Error) => any) => {
    const dialogElement: HTMLElement & IDialog<D> & any = document.createElement(dialog) as HTMLElement & IDialog<D>;
    const body: HTMLBodyElement | null = document.querySelector('body');
    if (body) {
      body.appendChild(dialogElement);
    } else {
      reject(new Error('Body not exist'));
    }
    dialogElement.dialogData = dialogData;
    let etoolsDialog: any;
    dialogElement.updateComplete.then(() =>
      setTimeout(() => {
        etoolsDialog = dialogElement.shadowRoot.querySelector('etools-dialog');
        etoolsDialog.opened = true;
      })
    );

    if (readonly) {
      dialogElement.readonly = readonly;
    }

    dialogElement.addEventListener('dialog-closed', (e: Event) => {
      const event: CustomEvent<IDialogResponse<R>> = e as CustomEvent<IDialogResponse<R>>;
      resolve(event.detail);
      etoolsDialog.opened = false;
      dialogElement.remove();
    });
  });
}
