import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '../etools-media-query/etools-media-query';

@customElement('app-drawer-layout')
export class AppDrawerLayout extends LitElement {
  render() {
    return html`
      <style>
        :host {
          display: block;
          /**
         * Force app-drawer-layout to have its own stacking context so that its parent can
         * control the stacking of it relative to other elements.
         */
          position: relative;
          z-index: 0;
        }

        :host ::slotted([slot='drawer']) {
          z-index: 1;
        }

        :host([fullbleed]) {
          position: var(--layout-fit-position, absolute);
          top: var(--layout-fit-top, 0);
          right: var(--layout-fit-right, 0);
          bottom: var(--layout-fit-bottom, 0);
          left: var(--layout-fit-left, 0);
        }

        #contentContainer {
          /* Create a stacking context here so that all children appear below the header. */
          position: relative;
          z-index: 0;
          height: 100%;
          transition: var(--app-drawer-layout-content-transition, none);
        }

        #contentContainer[drawer-position='left'] {
          margin-left: var(--app-drawer-width, 256px);
        }

        #contentContainer[drawer-position='right'] {
          margin-right: var(--app-drawer-width, 256px);
        }
      </style>

      <slot id="drawerSlot" name="drawer"></slot>

      <div id="contentContainer" drawer-position="${this.drawerPosition}">
        <slot></slot>
      </div>

      <etools-media-query
        .query="${this._computeMediaQuery(this.forceNarrow, this.responsiveWidth)}"
        @query-matches-changed="${this._onQueryMatchesChanged}"
      ></etools-media-query>
    `;
  }

  // If true, ignore `responsiveWidth` setting and force the narrow layout.
  @property({type: Boolean})
  forceNarrow = false;

  /**
   * If the viewport's width is smaller than this value, the panel will change
   * to narrow layout. In the mode the drawer will be closed.
   */
  @property({type: String, attribute: 'responsive-width'})
  responsiveWidth = '640px';

  /**
   * Returns true if it is in narrow layout. This is useful if you need to
   * show/hide elements based on the layout.
   */
  @property({type: Boolean, reflect: true})
  narrow!: boolean;

  /**
   * If true, the drawer will initially be opened when in narrow layout mode.
   */
  @property({type: Boolean})
  openedWhenNarrow = false;

  @property({type: String})
  drawerPosition = 'left';

  @property({type: Boolean})
  _drawerNeedsReset!: boolean;

  getDrawer() {
    const expanderT = this.shadowRoot!.querySelector('slot[id="drawerSlot"]') as any;
    return expanderT ? expanderT.assignedElements()[0] : null;
  }

  _updateLayoutStates() {
    const drawer = this.getDrawer();
    if (!drawer) {
      return;
    }

    setTimeout(() => {
      this.drawerPosition = this.narrow ? null : drawer.position;
      if (this._drawerNeedsReset) {
        if (this.narrow) {
          drawer.opened = this.openedWhenNarrow;
          drawer.persistent = false;
        } else {
          drawer.opened = drawer.persistent = true;
        }
        if (drawer.hasAttribute('no-transition')) {
          drawer.removeAttribute('no-transition');
        }
        this._drawerNeedsReset = false;
        drawer.requestUpdate();
      }
    }, 0);
  }

  _onQueryMatchesChanged(event: CustomEvent) {
    this.narrow = event.detail.value;
    this._drawerNeedsReset = true;
    this._updateLayoutStates();
  }

  _computeMediaQuery(forceNarrow: boolean, responsiveWidth: string) {
    return forceNarrow ? '(min-width: 0px)' : '(max-width: ' + responsiveWidth + ')';
  }
}
