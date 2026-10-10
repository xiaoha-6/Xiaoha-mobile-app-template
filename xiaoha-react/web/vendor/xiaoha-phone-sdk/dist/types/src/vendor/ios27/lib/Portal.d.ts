import { type ReactNode, type ReactPortal } from 'react';
export interface PortalProps {
    children: ReactNode;
    container?: Element | DocumentFragment | null;
}
export declare const PortalProvider: import("react").Provider<DocumentFragment | Element | null>;
export declare const usePortalContainer: () => DocumentFragment | Element | null;
export declare function Portal({ children, container }: PortalProps): ReactPortal | null;
