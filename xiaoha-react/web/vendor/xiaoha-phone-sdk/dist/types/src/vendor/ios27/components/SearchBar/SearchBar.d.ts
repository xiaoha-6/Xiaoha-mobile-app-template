import { type InputHTMLAttributes } from 'react';
export interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'onInput' | 'onSubmit' | 'type'> {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    onInput?: (value: string) => void;
    onSubmit?: (value: string) => void;
    onCancel?: () => void;
    cancelLabel?: string;
}
export declare const SearchBar: import("react").ForwardRefExoticComponent<SearchBarProps & import("react").RefAttributes<HTMLInputElement>>;
