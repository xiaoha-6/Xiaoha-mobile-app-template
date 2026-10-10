import { type HTMLAttributes, type ReactNode } from 'react';
export interface PageProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    toolbar?: ReactNode;
    tabbar?: ReactNode;
    children: ReactNode;
}
export declare const Page: import("react").ForwardRefExoticComponent<PageProps & import("react").RefAttributes<HTMLDivElement>>;
