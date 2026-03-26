import '@shoelace-style/shoelace/dist/components/tree/tree.js';
import SlTree from '@shoelace-style/shoelace/dist/components/tree/tree.component.js';
export declare class EtoolsTree extends SlTree {
    static styles: import("lit").CSSResultGroup[];
    slHandleSelectionChange: () => Promise<void>;
    constructor();
    render(): import("lit-html").TemplateResult<1>;
    overwriteHandleSelectionChange(): Promise<void>;
    private overwriteGetAllTreeItems;
    private overwriteHandleClick;
}
