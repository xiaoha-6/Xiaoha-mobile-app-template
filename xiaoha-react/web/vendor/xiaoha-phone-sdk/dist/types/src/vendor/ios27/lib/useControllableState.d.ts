export interface UseControllableStateParams<T> {
    value?: T;
    defaultValue?: T;
    onChange?: (value: T) => void;
}
export declare function useControllableState<T>({ value, defaultValue, onChange, }: UseControllableStateParams<T>): [T, (next: T) => void];
