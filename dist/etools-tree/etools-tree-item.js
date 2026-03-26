import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/tree-item/tree-item.js';
import SlTreeItem from '@shoelace-style/shoelace/dist/components/tree-item/tree-item.component.js';
let EtoolsTreeItem = class EtoolsTreeItem extends SlTreeItem {
    render() {
        // language=HTML
        return super.render();
    }
};
EtoolsTreeItem.styles = [SlTreeItem.styles];
EtoolsTreeItem = __decorate([
    customElement('etools-tree-item')
], EtoolsTreeItem);
export { EtoolsTreeItem };
