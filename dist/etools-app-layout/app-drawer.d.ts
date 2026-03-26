import { LitElement, PropertyValueMap, PropertyValues } from 'lit';
export declare class AppDrawer extends LitElement {
    render(): import("lit-html").TemplateResult<1>;
    opened: boolean;
    persistent: boolean;
    /**
     * The alignment of the drawer on the screen ('left', 'right', 'start' or
     * 'end'). 'start' computes to left and 'end' to right in LTR layout and
     * vice versa in RTL layout.
     */
    align: string;
    /**
     * The computed, read-only position of the drawer on the screen ('left' or
     * 'right').
     */
    position: string;
    transitionDuration: number;
    private scrim;
    private contentContainer;
    protected firstUpdated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    updated(changedProperties: PropertyValues): void;
    setContainerTransition(): Promise<void>;
    open(): void;
    close(): void;
    toggle(): void;
    _isRTL(): boolean;
    _resetPosition(): void;
    _openedPersistentChanged(opened: boolean, persistent: boolean): void;
}
