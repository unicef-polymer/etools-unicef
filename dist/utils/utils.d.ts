export declare const toggleAttributeValue: (el: any, attrName: string, attrVal1: any, attrVal2: any) => void;
export interface IDialog<D> {
    dialog: string;
    dialogData?: D;
    readonly?: boolean;
}
export interface IDialogResponse<R> {
    response?: R;
    confirmed: boolean;
}
export declare function openDialog<D, R = any>({ dialog, dialogData, readonly }: IDialog<D>): Promise<IDialogResponse<R>>;
