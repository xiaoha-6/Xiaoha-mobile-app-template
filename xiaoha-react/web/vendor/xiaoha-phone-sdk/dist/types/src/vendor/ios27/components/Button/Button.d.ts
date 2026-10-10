import { type ButtonHTMLAttributes, type ReactNode } from 'react';
export type ButtonVariant = 'filled' | 'gray' | 'tinted' | 'plain' | 'liquid-glass';
export type ButtonSize = 'small' | 'medium' | 'large';
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children: ReactNode;
}
export declare const Button: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
