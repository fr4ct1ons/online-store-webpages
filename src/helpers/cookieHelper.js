export function GetCookie(key)
{

    if(!document.cookie)
    {
        return undefined;
    }

    let result = document.cookie
    .split("; ")
    .find((row) => row.startsWith(key + "="));

    console.log(result)

    if(!result)
    {
        return undefined
    }

    result = result.split("=")[1]

    return result;
}

export function SetCookie(key, value, expirationDate)
{
    let result = key + "=" + value

    if(expirationDate)
    {
        result += ";expires=" + expirationDate
    }
    console.log(result)
    document.cookie = result; 
}