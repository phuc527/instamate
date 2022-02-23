export function cleanEmptyFields<T> (obj: T): T {

    return JSON.parse(JSON.stringify(obj), (key, value) => {
    
    if (value == null || value === '' || value === [] || value === '{}' || value === {})
    
    return undefined;
    
    return value;
    
    }) as T;
    
    }