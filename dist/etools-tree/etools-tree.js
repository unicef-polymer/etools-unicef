import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/tree/tree.js';
import SlTree from '@shoelace-style/shoelace/dist/components/tree/tree.component.js';
import { EtoolsTreeItem } from './etools-tree-item';
// Copied from SlTree component, because it is not exported.
function syncCheckboxes(changedTreeItem, initialSync = false) {
    function syncParentItem(treeItem) {
        const children = treeItem.getChildrenItems({ includeDisabled: false });
        if (children.length) {
            const allChecked = children.every((item) => item.selected);
            const allUnchecked = children.every((item) => !item.selected && !item.indeterminate);
            treeItem.selected = allChecked;
            treeItem.indeterminate = !allChecked && !allUnchecked;
        }
    }
    function syncAncestors(treeItem) {
        const parentItem = treeItem.parentElement;
        if (EtoolsTreeItem.isTreeItem(parentItem)) {
            syncParentItem(parentItem);
            syncAncestors(parentItem);
        }
    }
    function syncDescendants(treeItem) {
        for (const childItem of treeItem.getChildrenItems()) {
            childItem.selected = initialSync
                ? treeItem.selected || childItem.selected
                : !childItem.disabled && treeItem.selected;
            syncDescendants(childItem);
        }
        if (initialSync) {
            syncParentItem(treeItem);
        }
    }
    syncDescendants(changedTreeItem);
    syncAncestors(changedTreeItem);
}
let EtoolsTree = class EtoolsTree extends SlTree {
    constructor() {
        super();
        // Overwrite private methods
        this['handleClick'] = this.overwriteHandleClick.bind(this);
        this['getAllTreeItems'] = this.overwriteGetAllTreeItems.bind(this);
        // Overwrite public methods
        this.slHandleSelectionChange = this.handleSelectionChange.bind(this);
        this.handleSelectionChange = this.overwriteHandleSelectionChange.bind(this);
    }
    render() {
        // language=HTML
        return super.render();
    }
    // Same logic from SlTree, only changed :scope > sl-tree-item to :scope > etools-tree-item
    async overwriteHandleSelectionChange() {
        const isSelectionMultiple = this.selection === 'multiple';
        const items = this.overwriteGetAllTreeItems();
        this.setAttribute('aria-multiselectable', isSelectionMultiple ? 'true' : 'false');
        for (const item of items) {
            item.selectable = isSelectionMultiple;
        }
        if (isSelectionMultiple) {
            await this.updateComplete;
            [...this.querySelectorAll(':scope > etools-tree-item')].forEach((treeItem) => syncCheckboxes(treeItem, true));
        }
    }
    // Same logic from SlTree, only changed sl-tree-item to etools-tree-item
    overwriteGetAllTreeItems() {
        return [...this.querySelectorAll('etools-tree-item')];
    }
    // Same logic from SlTree, only changed sl-tree-item to etools-tree-item
    overwriteHandleClick(event) {
        const target = event.target;
        const treeItem = target.closest('etools-tree-item');
        const isExpandButton = event.composedPath().some((el) => { var _a; return (_a = el === null || el === void 0 ? void 0 : el.classList) === null || _a === void 0 ? void 0 : _a.contains('tree-item__expand-button'); });
        //
        // Don't Do anything if there's no tree item, if it's disabled, or if the click doesn't match the initial target
        // from mousedown. The latter case prevents the user from starting a click on one item and ending it on another,
        // causing the parent node to collapse.
        //
        // See https://github.com/shoelace-style/shoelace/issues/1082
        //
        if (!treeItem || treeItem.disabled || target !== this['clickTarget']) {
            return;
        }
        if (isExpandButton) {
            treeItem.expanded = !treeItem.expanded;
        }
        else {
            this['selectItem'](treeItem);
        }
    }
};
EtoolsTree.styles = [SlTree.styles];
EtoolsTree = __decorate([
    customElement('etools-tree')
], EtoolsTree);
export { EtoolsTree };
