const json = require('./dates/SkySeasons.json');

class choice{
    constructor(x){
        this.type = 3;
        this.name = "articule";
        this.description = "articule";
        this.required = false;
    }
}

class trav{
    constructor(x){
        this.type = 1;
        this.name = x.Name.toLowerCase();
        this.description = "traveler"; 
        this.options = [new choice(x)];
    }
}

class season{
    constructor(x){
        this.type = 2;
        this.name = json[x].Name.toLowerCase();
        this.options = [];
        this.description = "season";
        json[x].Travelers.forEach(
            y => this.options.push(new trav(y))
        );
    }
}

const comanjs = [];

json.forEach(
    (x,y) => comanjs.push(new season(y)) 
);

console.log(JSON.stringify(
    comanjs, null, '\t'
    ));
