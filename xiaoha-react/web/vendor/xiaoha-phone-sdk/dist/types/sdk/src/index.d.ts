import React, { type ReactNode, type HTMLAttributes } from 'react';
export * from '../../src/vendor/ios27';
export { material, glass, useFocusTrap, usePortalContainer } from '../../src/vendor/ios27/lib';
export interface PhoneContext {
    theme: 'light' | 'dark';
    language: string;
    screen: string;
    folded: boolean;
    model?: 'duo' | 'iphone18promax';
    resource?: string;
    app?: string;
    zoom?: number;
    tint?: string;
    style?: string;
    safeArea?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    [key: string]: unknown;
}
export interface PhoneAPI {
    readonly context: PhoneContext | null;
    on(event: string, listener: (data: any) => void): () => void;
    off(event: string, listener: (data: any) => void): void;
    ready(): void;
    close(): void;
    home(): void;
    open(app: string): void;
    notify(options: string | {
        title?: string;
        message?: string;
        sound?: boolean;
    }): void;
    toast(text: string): void;
    badge(count: number): void;
    fold(mode?: string): void;
    message<T = unknown>(data: unknown): Promise<T | null>;
    fetch<T = unknown>(name: string, data?: unknown): Promise<T>;
}
declare global {
    interface Window {
        XiaohaPhone: PhoneAPI;
        TitanPhone: PhoneAPI;
    }
}
export declare const phone: PhoneAPI;
export declare function PreviewProvider({ context, children }: {
    context: PhoneContext;
    children: ReactNode;
}): React.JSX.Element;
export declare function usePhoneContext(): PhoneContext | null;
export declare function waitForPhone(timeout?: number): Promise<PhoneContext>;
export declare function fetchNui<T = unknown>(event: string, data?: unknown): Promise<T>;
export declare function onNuiEvent<T = unknown>(event: string, listener: (data: T) => void): () => void;
export declare function useNuiEvent<T = unknown>(event: string, listener: (data: T) => void): void;
export declare function AppFrame({ children, className, ...props }: HTMLAttributes<HTMLDivElement>): React.JSX.Element;
