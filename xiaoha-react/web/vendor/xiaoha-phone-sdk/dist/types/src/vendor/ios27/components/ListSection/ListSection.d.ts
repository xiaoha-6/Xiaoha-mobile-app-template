import { type HTMLAttributes, type ReactNode } from 'react';
export interface ListSectionProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
    header?: ReactNode;
    footer?: ReactNode;
    children: ReactNode;
}
export declare const ListSection: import("react").ForwardRefExoticComponent<ListSectionProps & import("react").RefAttributes<HTMLElement>>;
