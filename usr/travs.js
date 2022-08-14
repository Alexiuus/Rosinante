const Sky = require('../dates/SkySeasons.json');
const options = require('./Options.js');
const arts = require('./arts.js');
const home = require('./home.js');

require('../dates/text.js');

module.exports = {
    run: (path, intr) =>{
        const SEASON = Sky.find(season => season.Name.toLowerCase() === path[0]);  

        if (!SEASON) return options.run(intr);

        const TRAVELERS = SEASON.Travelers;
        const TRAVELER = TRAVELERS.find(traveler => traveler.Name.toLowerCase() === path[1]);

        if(path.length >= 2 && path[1] !== null && !!TRAVELER) 
            return arts.run(path, TRAVELER, intr);
        else
            return options.run(intr);
    }
}