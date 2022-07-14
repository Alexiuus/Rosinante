const PREFIX = "rs!";
const FLAG = "-l";

class jsonReq{
    #date;
    #isMod
    
    constructor(date, mod){
        this.#date = date;
        this.#isMod = mod;
    }
    getDates(){
        return this.#date;
    }
    getPathVal(value){
        if(this.#isMod === false){
            return (!!this.#date.find(obj => obj.Season === value));
        }else{
            return value <= this.#date.length;
        }
    }
    
    getElem(pos){
        if(this.#isMod === false){
            return this.#date.find(obj => obj.Season === pos);
        }else{
            return this.#date[pos];
        }
    }
}

class DataResponde{
    #request;
    #dates;
    #isRequest;

    constructor(message, date){
        const value = message.content.split(" ");
        if(value[0] === PREFIX){
            this.#isRequest = true;
            if (value.length > 1 && value[0] === PREFIX && value[1] === FLAG){
                this.#dates = new jsonReq(date, true);
                this.#request = value.splice(2, value.length - 2);     
            } 
            else if (value[0] === PREFIX){
                this.#dates = new jsonReq(date,false);
                this.#request = ((value.length <= 1)? "" : value[1]).split("/");
            }
            
        }else{
            this.#isRequest = false;
        }
    }
    
    getRequest(){
        return this.#request;
    }

    getisRequest(){
        return this.#isRequest;
    }
    getDates(){
        return this.#dates.getDates();
    }
    getPathValid(elem){
        return this.#dates.getPathVal(elem);
    }
    getPos(elem){
        return this.#dates.getElem(elem);
    }
}

module.exports = {
    DataResponde
}