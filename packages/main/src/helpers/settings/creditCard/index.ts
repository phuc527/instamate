export const formatCardNumber = (value: string): string => {
    const match = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const parts = []

    for (let i=0; i < match.length; i+=4) {
        parts.push(match.substring(i, Number(i)+4))
    }

    if (parts.length) {
        return parts.join(' ')
    } 
    return value
}

export const formatCardExpireDate = (value: string): string => {    
    let res = ''
    if(value.length > 5){
        res = value.substring(0, 5)
    }
    else if (value.length === 1) {
        if (value.trim() === "/"){
            res = "";
        }
        else res = value;
    }
    else if (value.length >= 2) {
        if (value.includes("/")){
            const month = value.split("/")[0];
            const year = value.split("/")[1];
            if (Number(month) > 12) {
                res = `12/${year}`
            }
            else res = `${month}/${year}`
        }
        else if (Number(value) > 12) {
            res = `12/`
        }
        else res = `${value}/`

    }
        else res = value;

    return res;
}
