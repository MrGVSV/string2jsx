import React, { HTMLAttributes } from 'react'

interface IMap {
    from: RegExp;
    to: JSX.Element | string;
    isChild?: boolean;
    props?: {[key: string]: any};
    useForProps?: string[];
    matchGroup?: number; 
}
interface IString2JSX extends HTMLAttributes<HTMLElement> {
    map: IMap[];
    parent?: JSX.Element;
}

export default function String2JSX({ map=[], parent, children, ...etc }: IString2JSX) {

    // The elements to return
    let elements: (string | JSX.Element)[] = []

    // Get the starting text/text-array
    if(Array.isArray(children)) {
        if(children.length > 0 && typeof children[0] === 'string') {
            elements = (children as string[])
        }
    } else {
        let text: string = children ? children.toString() : ''
        elements = [text]
    }
    
    // Search for matches
    for(let jsxMap of map) {

        // === Break If Empty String === //
        if(elements.length === 0) {
            break;
        }
        // /== Break If Empty String === //

        // === Setup Map === //
        // --- Check If Using Match as Child --- //
        if(jsxMap.isChild) {
            if(!jsxMap.useForProps) {
                jsxMap.useForProps = []
            }
            jsxMap.useForProps.push('children');
        }
        // /== Setup Map === //

        let newElements: (string | JSX.Element)[] = [];
        for(let elt of elements) {

            // === Skip JSX Elements === //
            if(typeof elt !== 'string') {
                newElements.push(elt);
                continue;
            }
            // /== Skip JSX Elements === //

            // === Search String === //
            let match = jsxMap.from.exec(elt);
            if(match) {
                while(match) {
                    // --- Push Text Up-To Match --- //
                    let previous = elt.substring(0, match.index)
                    if(previous){newElements.push(previous);}

                    // --- Push JSX --- //
                    let jsxElt = typeof jsxMap.to !== 'string' ? jsxMap.to : <span children={jsxMap.to} />;
                    // Add specified props (if any)
                    let newProps: {[key: string]: any} = {...jsxElt.props, ...jsxMap.props}
                    jsxMap.useForProps?.map(key => newProps[key] = match![jsxMap.matchGroup??0]);
                    // Push the new element
                    newElements.push(<jsxElt.type {...newProps} />);

                    // --- Overwrite Current Text --- //
                    elt = elt.substring(match.index + match[0].length);
                    
                    // --- Get Next Match (If Any) --- //
                    match = jsxMap.from.exec(elt);
                }
            }
            // /== Search String === //

            // === Push Leftover Text === //
            if(elt) {
                newElements.push(elt);
            }
            // /== Push Leftover Text === //

        }

        // Replace Old Elements 
        elements = newElements;
    }

    // Get Parent Element
    const Parent = parent ? parent.type : React.Fragment;

    return (
        <Parent {...parent?.props} {...etc}>
            {
                elements.map((item, index) => {
                    // Assign id to key if given
                    let key = (item as JSX.Element).props?.id??index
                    return (
                        <React.Fragment key={key}>
                            {item}
                        </React.Fragment>
                    )
                })
            }
        </Parent>
    )
}
