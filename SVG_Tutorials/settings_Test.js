class Dictionary{
    constructor(){
        this.dict = new Set(wordsArray);
    }

    isInDict(word){
        return this.dict.has(word);
    }
}

const test = new Dictionary(['cat','bill','ray']);
console.log(test.isInDict('ray')); // true
console.log(test.isInDict('loyce')); // false