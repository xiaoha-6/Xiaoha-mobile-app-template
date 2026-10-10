import { type HTMLAttributes } from 'react';
export interface SegmentedControlProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
    segments: string[];
    selected?: number;
    defaultSelected?: number;
    onChange?: (index: number) => void;
}
export declare const SegmentedControl: import("react").ForwardRefExoticComponent<SegmentedControlProps & import("react").RefAttributes<HTMLDivElement>>;
