export function cleanEmptyFields<T> (obj: T): T {
    return JSON.parse(JSON.stringify(obj), (key, value) => {
        if (value == null || value === '' || value === [] || value === '{}' || value === {})
            return undefined;
        return value;
    }) as T;
}

export function formatMetric(x: number): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function upperCaseFirstLetter(string: string): string {
    return string[0]?.toUpperCase() + string?.substring(1) || "";
}
