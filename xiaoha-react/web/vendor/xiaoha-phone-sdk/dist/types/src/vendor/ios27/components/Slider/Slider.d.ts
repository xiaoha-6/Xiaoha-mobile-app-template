import { type InputHTMLAttributes, type ReactNode } from 'react';
export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onInput' | 'value' | 'defaultValue' | 'type' | 'min' | 'max' | 'step'> {
    value?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    leading?: ReactNode;
    trailing?: ReactNode;
    onChange?: (value: number) => void;
}
export declare const Slider: import("react").ForwardRefExoticComponent<SliderProps & import("react").RefAttributes<HTMLInputElement>>;
