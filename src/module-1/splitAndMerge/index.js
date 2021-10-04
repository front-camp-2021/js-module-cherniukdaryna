export const splitAndMerge = (str = "", separator = "") => {
    let resultSring = [];
    let arrayFromStr = str.split(' ');

    arrayFromStr.forEach(element => {
        let str = element.split('').join(`${separator}`);
        resultSring.push(str);
    });

    return resultSring.join(' ');
};
