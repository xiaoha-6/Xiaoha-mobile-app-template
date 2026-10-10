import type { CSSProperties, ReactNode } from 'react';
export type IconSize = 'sm' | 'md' | 'lg' | number;
export interface IconProps {
    children: ReactNode;
    label?: string;
    size?: IconSize;
    className?: string;
    style?: CSSProperties;
}
export declare function Icon({ children, label, size, className, style }: IconProps): import("react").JSX.Element;
