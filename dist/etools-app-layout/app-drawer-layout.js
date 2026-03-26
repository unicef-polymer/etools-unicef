import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../etools-media-query/etools-media-query';
let AppDrawerLayout = class AppDrawerLayout extends LitElement {
    constructor() {
        super(...arguments);
        // If true, ignore `responsiveWidth` setting and force the narrow layout.
        this.forceNarrow = false;
        /**
         * If the viewport's width is smaller than this value, the panel will change
         * to narrow layout. In the mode the drawer will be closed.
         */
        this.responsiveWidth = '640px';
        /**
         * If true, the drawer will initially be opened when in narrow layout mode.
         */
        this.openedWhenNarrow = false;
        this.drawerPosition = 'left';
    }
    render() {
        return html `
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
    getDrawer() {
        const expanderT = this.shadowRoot.querySelector('slot[id="drawerSlot"]');
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
                }
                else {
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
    _onQueryMatchesChanged(event) {
        this.narrow = event.detail.value;
        this._drawerNeedsReset = true;
        this._updateLayoutStates();
    }
    _computeMediaQuery(forceNarrow, responsiveWidth) {
        return forceNarrow ? '(min-width: 0px)' : '(max-width: ' + responsiveWidth + ')';
    }
};
__decorate([
    property({ type: Boolean })
], AppDrawerLayout.prototype, "forceNarrow", void 0);
__decorate([
    property({ type: String, attribute: 'responsive-width' })
], AppDrawerLayout.prototype, "responsiveWidth", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], AppDrawerLayout.prototype, "narrow", void 0);
__decorate([
    property({ type: Boolean })
], AppDrawerLayout.prototype, "openedWhenNarrow", void 0);
__decorate([
    property({ type: String })
], AppDrawerLayout.prototype, "drawerPosition", void 0);
__decorate([
    property({ type: Boolean })
], AppDrawerLayout.prototype, "_drawerNeedsReset", void 0);
AppDrawerLayout = __decorate([
    customElement('app-drawer-layout')
], AppDrawerLayout);
export { AppDrawerLayout };
