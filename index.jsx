"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function String2JSX({ map = [], children, ...etc }) {
    var _a;
    // The elements to return
    let elements = [];
    // Get the starting text/text-array
    if (Array.isArray(children)) {
        if (children.length > 0 && typeof children[0] === 'string') {
            elements = children;
        }
    }
    else {
        let text = children ? children.toString() : '';
        elements = [text];
    }
    // Search for matches
    for (let jsxMap of map) {
        // === Break If Empty String === //
        if (elements.length === 0) {
            break;
        }
        // /== Break If Empty String === //
        // === Setup Map === //
        // --- Check If Using Match as Child --- //
        if (jsxMap.isChild) {
            if (!jsxMap.useForProps) {
                jsxMap.useForProps = [];
            }
            jsxMap.useForProps.push('children');
        }
        // /== Setup Map === //
        let newElements = [];
        for (let elt of elements) {
            // === Skip JSX Elements === //
            if (typeof elt !== 'string') {
                newElements.push(elt);
                continue;
            }
            // /== Skip JSX Elements === //
            // === Search String === //
            let match = jsxMap.from.exec(elt);
            if (match) {
                while (match) {
                    // --- Push Text Up-To Match --- //
                    let previous = elt.substring(0, match.index);
                    if (previous) {
                        newElements.push(previous);
                    }
                    // --- Push JSX --- //
                    let jsxElt = typeof jsxMap.to !== 'string' ? jsxMap.to : <span children={jsxMap.to}/>;
                    // Add specified props (if any)
                    let newProps = { ...jsxElt.props, ...jsxMap.props };
                    (_a = jsxMap.useForProps) === null || _a === void 0 ? void 0 : _a.map(key => { var _a; return newProps[key] = match[(_a = jsxMap.matchGroup) !== null && _a !== void 0 ? _a : 0]; });
                    // Push the new element
                    newElements.push(<jsxElt.type {...newProps}/>);
                    // --- Overwrite Current Text --- //
                    elt = elt.substring(match.index + match[0].length);
                    // --- Get Next Match (If Any) --- //
                    match = jsxMap.from.exec(elt);
                }
            }
            // /== Search String === //
            // === Push Leftover Text === //
            if (elt) {
                newElements.push(elt);
            }
            // /== Push Leftover Text === //
        }
        // Replace Old Elements 
        elements = newElements;
    }
    return (<react_1.default.Fragment {...etc}>
            {elements.map((item, index) => {
        var _a, _b;
        // Assign id to key if given
        let key = (_b = (_a = item.props) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : index;
        return (<react_1.default.Fragment key={key}>
                            {item}
                        </react_1.default.Fragment>);
    })}
        </react_1.default.Fragment>);
}
exports.default = String2JSX;
