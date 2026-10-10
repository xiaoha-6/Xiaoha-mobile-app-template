import { type HTMLAttributes, type ReactNode } from 'react';
export interface ListRowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    disclosure?: boolean;
    separator?: boolean;
    leading?: ReactNode;
    trailing?: ReactNode;
    children: ReactNode;
    onClick?: () => void;
}
export declare const ListRow: import("react").ForwardRefExoticComponent<ListRowProps & import("react").RefAttributes<HTMLDivElement>>;
