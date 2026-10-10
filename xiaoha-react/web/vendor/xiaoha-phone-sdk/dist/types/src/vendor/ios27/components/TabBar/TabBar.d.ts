import { type HTMLAttributes, type ReactNode } from 'react';
export interface TabBarItem {
    id: string;
    label: string;
    icon: ReactNode;
}
export interface TabBarProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange' | 'defaultValue'> {
    items: TabBarItem[];
    active?: string;
    defaultActive?: string;
    onChange?: (id: string) => void;
}
export declare const TabBar: import("react").ForwardRefExoticComponent<TabBarProps & import("react").RefAttributes<HTMLElement>>;
