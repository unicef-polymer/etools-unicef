import { AsyncDirective } from 'lit/async-directive.js';
import { LangChangedSubscription } from '../types';
/**
 * An abstract lit directive that reacts when the language changes.
 */
export declare abstract class LangChangedDirectiveBase extends AsyncDirective {
    protected langChangedSubscription: LangChangedSubscription | null;
    protected getValue: () => unknown;
    /**
     * Sets up the directive by setting the getValue property and subscribing.
     * When subclassing LangChangedDirectiveBase this function should be call in the render function.
     * @param getValue
     */
    renderValue(getValue: () => unknown): unknown;
    /**
     * Called when the lang changed event is dispatched.
     */
    updateValue(): void;
    /**
     * Subscribes to the lang changed event.
     */
    subscribe(): void;
    /**
     * Unsubscribes from the lang changed event.
     */
    unsubscribe(): void;
    /**
     * Unsubscribes when disconnected.
     */
    disconnected(): void;
    /**
     * Subscribes when reconnected.
     */
    reconnected(): void;
}
