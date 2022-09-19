"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var auto_id_1 = require("@reach/auto-id");
var glider_js_1 = __importDefault(require("glider-js"));
var GliderComponent = React.forwardRef(function (props, ref) {
    var id = props.id, containerElement = props.containerElement, arrows = props.arrows, dots = props.dots, hasArrows = props.hasArrows, hasDots = props.hasDots, scrollToSlide = props.scrollToSlide, scrollToPage = props.scrollToPage, className = props.className, iconLeft = props.iconLeft, iconRight = props.iconRight, children = props.children, onSlideVisible = props.onSlideVisible, onLoad = props.onLoad, onAnimated = props.onAnimated, onRemove = props.onRemove, onRefresh = props.onRefresh, onAdd = props.onAdd, onDestroy = props.onDestroy, onSlideHidden = props.onSlideHidden, restProps = __rest(props, ["id", "containerElement", "arrows", "dots", "hasArrows", "hasDots", "scrollToSlide", "scrollToPage", "className", "iconLeft", "iconRight", "children", "onSlideVisible", "onLoad", "onAnimated", "onRemove", "onRefresh", "onAdd", "onDestroy", "onSlideHidden"]);
    var innerRef = React.useRef(null);
    var gliderRef = React.useRef();
    var autoId = auto_id_1.useId(id);
    var nextBtnId = "glider-next-" + autoId;
    var prevBtnId = "glider-prev-" + autoId;
    var dotsId = "dots-" + autoId;
    var _a = React.useState(typeof autoId !== 'undefined'), isReady = _a[0], setIsReady = _a[1];
    React.useEffect(function () {
        setIsReady(true);
    }, [id]);
    var makeGliderOptions = React.useCallback(function () { return (__assign(__assign({}, restProps), { arrows: (hasArrows && {
            next: (arrows && arrows.next) || "#" + nextBtnId,
            prev: (arrows && arrows.prev) || "#" + prevBtnId,
        }) ||
            undefined, dots: (hasDots && dots) || "#" + dotsId || undefined })); }, [
        restProps,
        hasArrows,
        arrows,
        nextBtnId,
        prevBtnId,
        hasDots,
        dots,
        dotsId,
    ]);
    // initialize the glider
    React.useEffect(function () {
        var current = innerRef.current;
        if (current && isReady) {
            if (!gliderRef.current) {
                var glider = new glider_js_1.default(current, makeGliderOptions());
                gliderRef.current = glider;
                if (onLoad) {
                    onLoad.call(glider, new CustomEvent('glider-loaded', {
                        detail: { target: innerRef.current },
                    }));
                }
                if (scrollToSlide) {
                    glider.scrollItem(scrollToSlide - 1);
                }
                else if (scrollToPage) {
                    glider.scrollItem(scrollToPage - 1, true);
                }
            }
        }
    }, [makeGliderOptions, scrollToPage, scrollToSlide, isReady, onLoad]);
    // remove event listeners when props change
    React.useEffect(function () {
        var current = innerRef.current;
        return function () {
            var removeEventListener = function (event, fn) {
                if (typeof fn === 'function' && current) {
                    current.removeEventListener(event, fn);
                }
            };
            removeEventListener('glider-slide-visible', onSlideVisible);
            removeEventListener('glider-animated', onAnimated);
            removeEventListener('glider-remove', onRemove);
            removeEventListener('glider-refresh', onRefresh);
            removeEventListener('glider-add', onAdd);
            removeEventListener('glider-destroy', onDestroy);
            removeEventListener('glider-slide-hidden', onSlideHidden);
        };
    }, [
        onAdd,
        onAnimated,
        onDestroy,
        onRefresh,
        onRemove,
        onSlideHidden,
        onSlideVisible,
    ]);
    // update event listeners
    React.useEffect(function () {
        var current = innerRef.current;
        if (current) {
            var addEventListener_1 = function (event, fn) {
                if (typeof fn === 'function') {
                    current.addEventListener(event, fn);
                }
            };
            addEventListener_1('glider-slide-visible', onSlideVisible);
            addEventListener_1('glider-animated', onAnimated);
            addEventListener_1('glider-remove', onRemove);
            addEventListener_1('glider-refresh', onRefresh);
            addEventListener_1('glider-add', onAdd);
            addEventListener_1('glider-destroy', onDestroy);
            addEventListener_1('glider-slide-hidden', onSlideHidden);
        }
    }, [
        onAdd,
        onAnimated,
        onDestroy,
        onRefresh,
        onRemove,
        onSlideHidden,
        onSlideVisible,
    ]);
    // when the props update, update the glider
    React.useEffect(function () {
        if (gliderRef.current && isReady) {
            gliderRef.current.setOption(makeGliderOptions(), true);
            gliderRef.current.refresh(true);
        }
    }, [makeGliderOptions, isReady]);
    React.useEffect(function () {
        var current = gliderRef.current;
        return function () {
            if (current) {
                current.destroy();
            }
        };
    }, []);
    // expose the glider instance to the user so they can call the methods too
    React.useImperativeHandle(ref, function () { return gliderRef.current; });
    var Element = containerElement || 'div';
    return (React.createElement(Element, { className: "glider-contain" },
        props.hasArrows && !arrows && (React.createElement("button", { type: "button", className: "glider-prev", "aria-label": "Previous", id: prevBtnId }, iconLeft || '«')),
        React.createElement("div", { id: autoId, className: className, ref: innerRef }, children),
        hasDots && !dots && React.createElement("div", { id: dotsId }),
        props.hasArrows && !arrows && (React.createElement("button", { type: "button", className: "glider-next", "aria-label": "Next", id: nextBtnId }, iconRight || '»'))));
});
exports.default = GliderComponent;
//# sourceMappingURL=index.js.map