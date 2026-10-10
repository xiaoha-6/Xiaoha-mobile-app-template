import { type HTMLAttributes, type ReactNode } from 'react';
export interface ToolbarProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
    title: string;
    largeTitle?: boolean;
    scrollY?: number;
    leading?: ReactNode;
    trailing?: ReactNode;
    titleAs?: 'h1' | 'h2' | 'div';
}
export declare const Toolbar: import("react").ForwardRefExoticComponent<ToolbarProps & import("react").RefAttributes<HTMLElement>>;
