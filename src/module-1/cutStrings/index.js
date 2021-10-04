export const cutStrings = (arr = []) => {
    let resultArray = [];

    if (arr.length === 0){
        return resultArray;
    }

    let minStringLength = arr[0].length;

    for (let str of arr){
        if (str.length < minStringLength){
            minStringLength = str.length;
        }
    }

    arr.forEach(item => {
        let cutStr;
        cutStr = item.substr(0, minStringLength);
        resultArray.push(cutStr);
    });

    return resultArray;
};
