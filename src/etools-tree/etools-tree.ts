import {customElement} from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/tree/tree.js';
import SlTree from '@shoelace-style/shoelace/dist/components/tree/tree.component.js';
import {EtoolsTreeItem} from './etools-tree-item';

// Copied from SlTree component, because it is not exported.
function syncCheckboxes(changedTreeItem: EtoolsTreeItem, initialSync = false) {
  function syncParentItem(treeItem: EtoolsTreeItem) {
    const children = treeItem.getChildrenItems({includeDisabled: false});

    if (children.length) {
      const allChecked = children.every((item) => item.selected);
      const allUnchecked = children.every((item) => !item.selected && !item.indeterminate);

      treeItem.selected = allChecked;
      treeItem.indeterminate = !allChecked && !allUnchecked;
    }
  }

  function syncAncestors(treeItem: EtoolsTreeItem) {
    const parentItem: EtoolsTreeItem | null = treeItem.parentElement as EtoolsTreeItem;

    if (EtoolsTreeItem.isTreeItem(parentItem)) {
      syncParentItem(parentItem);
      syncAncestors(parentItem);
    }
  }

  function syncDescendants(treeItem: EtoolsTreeItem) {
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

@customElement('etools-tree')
export class EtoolsTree extends SlTree {
  static styles = [SlTree.styles];
  slHandleSelectionChange: () => Promise<void>;

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

      [...(this.querySelectorAll(':scope > etools-tree-item') as any)].forEach((treeItem: EtoolsTreeItem) =>
        syncCheckboxes(treeItem, true)
      );
    }
  }

  // Same logic from SlTree, only changed sl-tree-item to etools-tree-item
  private overwriteGetAllTreeItems() {
    return [...(this.querySelectorAll<EtoolsTreeItem>('etools-tree-item') as any)];
  }

  // Same logic from SlTree, only changed sl-tree-item to etools-tree-item
  private overwriteHandleClick(event: Event) {
    const target = event.target as EtoolsTreeItem as any;
    const treeItem = target.closest('etools-tree-item')!;
    const isExpandButton = event.composedPath().some((el: any) => el?.classList?.contains('tree-item__expand-button'));

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
    } else {
      this['selectItem'](treeItem);
    }
  }
}
