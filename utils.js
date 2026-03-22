export function resolveCustom(value, customFunction, defaultFunction) {
    if (value.startsWith("[") && value.endsWith("]")) {
        const slicedValue = value.slice(1, value.length - 1);
        return customFunction(slicedValue);
    } else {
        return defaultFunction(value);
    }
}