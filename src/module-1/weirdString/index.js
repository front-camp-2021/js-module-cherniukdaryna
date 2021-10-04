export const weirdString = (str = "") => {
    if(str.length === 0){
        return str;
    }
    let resultString = str.toUpperCase().split('');
    resultString.splice(resultString.length - 1, 1, resultString[resultString.length-1].toLowerCase());

    for (let i = 0; i < resultString.length; i++){
        if (resultString[i] === " "){
            resultString.splice(i-1, 1, resultString[i-1].toLowerCase());
        }
    }
    
    return resultString.join("");
};
