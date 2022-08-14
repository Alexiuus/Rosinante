
module.exports = {
    READY_CONSOLE : "[Activo] Bot a iniciado como",
    DEFAULTCOLOR : "YELLOW",
    GIF_HELP : "https://drive.google.com/uc?id=1eu4rblpU5R0q1D8LCxIWFQAFy4s7DbHQ",
    
    HELP_TITLE : ':white_check_mark: Rosinante Guide :blush:',
    HELP_TITLE_FIELD : 'How to use Rosinante:grey_question:',
    
    HELP_COMMENT : ":one: If you use **/rs seasons** Rosinante will respond with \`Sky seasons\`.\
    \n\n :two: If you use **/rs** \`<season> <traveler>\` (<season> is the season you want to see \
    Rosinante and <traveler> is the traveler you want to see) Rosinante will reply with her \
    props in a photo. \n\n :three: if you use **/rs** \`<area>\` (<area> is the area you want to see. \
    Example: /rs Valley_of_Triumph) Rosinante will respond with photos of travelers in the area \
    (the location). \n\nUpcoming implantations: \n:o: Command to show the location of the \
    traveler. \n:o: More worked editions. \n:o: Translation to Spanish. \
    \n\n Drawing: \`AdryOroz#1953\`. \n For any suggestion: \`Alexis77#8213\`. \
    \n bot link: https://discord.bots.gg/bots/836088384375619584 ",
    
    SEASONOP_TITLE : '☆｡Sky Seasons｡☆',
    SEASONOP_TITLE_FIELD : (y) => `:sparkles:${y.Name}`,
    SEASONOP_COMMENT : (x) => `:stars:\`Travellers:\` ${x.Travelers.length} \n:yellow_square:\`Date:\` ${x.Date}`,
    
    ART_TITLE : (x,y) => `:sparkles:${x[0]}-:stars:${x[1]}: ${y}`,
    ART_IMAGE : (x) => `attachment://${x}`,
    
    ARTs_TITLE : (x) => `:sparkles: ${x[0]}: :stars:${x[1]}`,
    ARTs_TITLE_FIELD : (x) => `:stars:${x}`,
    ARTs_COMMENT : (x) => `\`\`\` \n${x.reduce(
                                    (prev, curr, ind) => {
                                        return prev + `${ind}-` + curr.Name + "\n";
                                    }, "")
                                }\`\`\``,
    TRAVs_TITLE : (x) => `:sparkles: ${x}`,
    TRAVs_TITLE_FIELD : (x,y) => `:stars:${x}-${y}`,
    TRAVs_COMMAND : (x) => `:coin:: (${x})`,
    
    HOME : ['isle_of_dawn', 'daylight_prairie', 'hidden_forest', 'valley_of_triumph', 
            'golden_wasteland', 'vault_of_knowledge'],
    HELP : 'help',
    SEASONS : 'seasons',
    DESTINY : 'destiny',
    COMMAND : 'rs',
    DESCRIPTION_HELP : 'How to use the Rosinante bot?',
    DESCRIPTION_SEASONS : 'Season of the Sky',
    DESCRIPTION_DESTINY : '<Season>/<traveler>/<articule>',
    DESCRIPTION_COMMAND : 'Rosinante',
    
    HOME_TITLE : (x,y) => `:sparkles:${x}: :stars:${y.Name}`
}