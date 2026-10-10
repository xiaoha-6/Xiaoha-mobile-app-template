import { type ButtonHTMLAttributes, type ReactNode } from 'react';
export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value' | 'defaultValue' | 'children' | 'role' | 'aria-checked'> {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    label?: ReactNode;
    onChange?: (checked: boolean) => void;
}
export declare const Toggle: import("react").ForwardRefExoticComponent<ToggleProps & import("react").RefAttributes<HTMLButtonElement>>;
