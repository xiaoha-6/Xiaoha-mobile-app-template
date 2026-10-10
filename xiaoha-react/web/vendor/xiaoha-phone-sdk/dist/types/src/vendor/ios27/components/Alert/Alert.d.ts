import { type HTMLAttributes, type ReactNode } from 'react';
export type AlertActionStyle = 'default' | 'cancel' | 'destructive';
export interface AlertAction {
    label: string;
    style?: AlertActionStyle;
    onClick: () => void;
}
export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onChange'> {
    open?: boolean;
    defaultOpen?: boolean;
    onChange?: (open: boolean) => void;
    title: ReactNode;
    message?: ReactNode;
    actions: AlertAction[];
}
export declare function Alert({ open: openProp, defaultOpen, onChange, title, message, actions, className, ...rest }: AlertProps): import("react").JSX.Element | null;
