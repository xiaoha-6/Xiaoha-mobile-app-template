import { type HTMLAttributes, type ReactNode } from 'react';
export interface ContextMenuItem {
    label: string;
    icon?: ReactNode;
    destructive?: boolean;
    onClick: () => void;
    checked?: boolean;
    leading?: ReactNode;
    className?: string;
}
export interface ContextMenuGroup {
    items: ContextMenuItem[];
}
export interface ContextMenuProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    groups: ContextMenuGroup[];
    children: ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    activation?: 'contextmenu' | 'click';
    menuLabel?: string;
}
export declare function ContextMenu({ groups, children, className, onContextMenu, open: openProp, onOpenChange, activation, menuLabel, ...rest }: ContextMenuProps): import("react").JSX.Element;
