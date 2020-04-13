import { HTMLAttributes } from 'react';
interface IMap {
    from: RegExp;
    to: JSX.Element | string;
    isChild?: boolean;
    props?: {
        [key: string]: any;
    };
    useForProps?: string[];
    matchGroup?: number;
}
interface IString2JSX extends HTMLAttributes<HTMLElement> {
    map: IMap[];
    parent?: JSX.Element;
    defaultMatchGroup?: number;
}
export default function String2JSX({ map, parent, defaultMatchGroup, children, ...etc }: IString2JSX): JSX.Element;
export {};
