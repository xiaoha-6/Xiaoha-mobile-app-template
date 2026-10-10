import { type InputHTMLAttributes, type ReactNode } from 'react';
export type TextFieldType = 'text' | 'email' | 'password' | 'number' | 'search';
export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'type'> {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    label?: ReactNode;
    placeholder?: string;
    type?: TextFieldType;
    disabled?: boolean;
    clearable?: boolean;
}
export declare const TextField: import("react").ForwardRefExoticComponent<TextFieldProps & import("react").RefAttributes<HTMLInputElement>>;
