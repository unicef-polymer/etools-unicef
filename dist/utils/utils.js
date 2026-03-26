export const toggleAttributeValue = (el, attrName, attrVal1, attrVal2) => {
    if (!el || !el.hasAttribute) {
        return;
    }
    if (!el.hasAttribute(attrName)) {
        el.setAttribute(attrName, attrVal1);
        return;
    }
    if (el.getAttribute(attrName) === attrVal1) {
        el.setAttribute(attrName, attrVal2);
    }
    else {
        el.setAttribute(attrName, attrVal1);
    }
};
export function openDialog({ dialog, dialogData, readonly }) {
    return new Promise((resolve, reject) => {
        const dialogElement = document.createElement(dialog);
        const body = document.querySelector('body');
        if (body) {
            body.appendChild(dialogElement);
        }
        else {
            reject(new Error('Body not exist'));
        }
        dialogElement.dialogData = dialogData;
        let etoolsDialog;
        dialogElement.updateComplete.then(() => setTimeout(() => {
            etoolsDialog = dialogElement.shadowRoot.querySelector('etools-dialog');
            etoolsDialog.opened = true;
        }));
        if (readonly) {
            dialogElement.readonly = readonly;
        }
        dialogElement.addEventListener('dialog-closed', (e) => {
            const event = e;
            resolve(event.detail);
            etoolsDialog.opened = false;
            dialogElement.remove();
        });
    });
}
