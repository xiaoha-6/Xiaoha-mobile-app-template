import { type HTMLAttributes, type ReactNode } from 'react';
export type SheetDetent = 'medium' | 'large' | 'full';
export interface SheetProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onChange'> {
    open?: boolean;
    defaultOpen?: boolean;
    onChange?: (open: boolean) => void;
    grabber?: boolean;
    detent?: SheetDetent;
    title?: ReactNode;
    children: ReactNode;
    onClose?: () => void;
    backdropClassName?: string;
}
export declare function Sheet({ open: openProp, defaultOpen, onChange, grabber, detent, title, children, onClose, backdropClassName, className, style, ...rest }: SheetProps): import("react").JSX.Element | null;
