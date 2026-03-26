import { LitElement } from 'lit';
import '../etools-media-query/etools-media-query';
export declare class AppDrawerLayout extends LitElement {
    render(): import("lit-html").TemplateResult<1>;
    forceNarrow: boolean;
    /**
     * If the viewport's width is smaller than this value, the panel will change
     * to narrow layout. In the mode the drawer will be closed.
     */
    responsiveWidth: string;
    /**
     * Returns true if it is in narrow layout. This is useful if you need to
     * show/hide elements based on the layout.
     */
    narrow: boolean;
    /**
     * If true, the drawer will initially be opened when in narrow layout mode.
     */
    openedWhenNarrow: boolean;
    drawerPosition: string;
    _drawerNeedsReset: boolean;
    getDrawer(): any;
    _updateLayoutStates(): void;
    _onQueryMatchesChanged(event: CustomEvent): void;
    _computeMediaQuery(forceNarrow: boolean, responsiveWidth: string): string;
}
