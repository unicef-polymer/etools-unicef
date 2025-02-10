import {customElement} from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/tree-item/tree-item.js';
import SlTreeItem from '@shoelace-style/shoelace/dist/components/tree-item/tree-item.component.js';

@customElement('etools-tree-item')
export class EtoolsTreeItem extends SlTreeItem {
  static styles = [SlTreeItem.styles];

  render() {
    // language=HTML
    return super.render();
  }
}
