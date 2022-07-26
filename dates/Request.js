
class RequestInteraction{
    #group;
    #subcommand;
    #hoistedOp;
    constructor(interaction){
        this.#group = interaction.options._group;
        this.#subcommand = interaction.options._subcommand;
        this.#hoistedOp = interaction.options._hoistedOptions[0];
    }
    getGroup(){
        return this.#group;
    }
    getSubCommand(){
        return this.#subcommand;
    }
    getHoistedOpName(){
        return (!this.#hoistedOp)? null : this.#hoistedOp.name;
    }
    getHoistedOpValue(){
        return (!this.#hoistedOp)? null : this.#hoistedOp.value;
    }
    getlisDir(){
        return [this.#group, this.#subcommand, this.getHoistedOpValue()];
    }
}

module.exports = {
    RequestInteraction
}