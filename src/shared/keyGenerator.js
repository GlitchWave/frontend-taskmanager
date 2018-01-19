function generateKey(len) {
    if(typeof len !== 'number') {
        let err = new Error('You need to pass in this function only number data type');
        throw err;
    }

    let keys = [];
    for(let i = 0; i < len; i++) {
        let firstStep = Math.random() * 10000000000;
        let secondStep = String(firstStep).split('.');
        secondStep.length = 1;
        let thirdStep = secondStep[0].split('', 7);
        let key = Number(thirdStep.join(''));
        keys.push(key);
    }
    return keys;
}


export default generateKey;