import { type RefObject } from 'react';
export interface UseFocusTrapOptions {
    onEscape?: () => void;
    restoreFocus?: boolean;
}
export declare function useFocusTrap<T extends HTMLElement = HTMLElement>(active: boolean, options?: UseFocusTrapOptions): RefObject<T>;
