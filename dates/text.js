READY_CONSOLE = "[Activo] Bot a iniciado como";
DEFAULTCOLOR = "YELLOW";
GIF_HELP = "https://drive.google.com/uc?id=11CfJSCKKlA7pfF07yHjh5Ktz1K4HW3SD";

HELP_TITLE = ':white_check_mark: Rosinante Guide :blush:';
HELP_TITLE_FIELD = 'How to use Rosinante:grey_question:';
HELP_COMMENT = ":one: If you use **/rs seasons** Rosinante will respond with \`Sky seasons\`.\
\n\n :two: If you use **/rs** \`<season> <traveler>\` (<season> is the season you want to watch \
Rosinante and <traveler> is the traveler you want to watch) Rosinante will respond with your \
accessories with a photo. \n\n Drawing: \`AdryOroz#1953\`. \n For any suggestion: \`Alexis77#8213\`.";

SEASONOP_TITLE = '☆｡Sky Seasons｡☆';
SEASONOP_TITLE_FIELD = (x,y) => `:sparkles: ${x}-${y.Name}`;
SEASONOP_COMMENT = (x) => `:stars:\`Travellers:${x.Travelers.length}\``;

ART_TITLE = (x,y) => `:sparkles:${x[0]}-:stars:${x[1]}: ${y}`;
ART_IMAGE = (x) => `attachment://${x}`;

ARTs_TITLE = (x) => `:sparkles: ${x[0]}: :stars:${x[1]}`;
ARTs_TITLE_FIELD = (x) => `:stars:${x}`;
ARTs_COMMENT = (x) => `\`\`\` \n${x.reduce(
                                (prev, curr, ind) => {
                                    return prev + `${ind}-` + curr.Name + "\n";
                                }, "")
                            }\`\`\``;
TRAVs_TITLE = (x) => `:sparkles: ${x}`;
TRAVs_TITLE_FIELD = (x,y) => `:stars:${x}-${y}`;
TRAVs_COMMAND = (x) => `:coin:: (${x})`;

HELP = 'help';
SEASONS = 'seasons';
DESTINY = 'destiny';
COMMAND = 'rs';
DESCRIPTION_HELP = 'How to use the Rosinante bot?';
DESCRIPTION_SEASONS = 'Season of the Sky';
DESCRIPTION_DESTINY = '<Season>/<traveler>/<articule>';
DESCRIPTION_COMMAND = 'Rosinante';

module.exports = {
    READY_CONSOLE,
    DEFAULTCOLOR,
    GIF_HELP,
    HELP_TITLE,
    HELP_TITLE_FIELD,
    HELP_COMMENT,
    
    SEASONOP_TITLE,
    SEASONOP_TITLE_FIELD,
    SEASONOP_COMMENT,
    
    ART_TITLE,
    ART_IMAGE,
    
    ARTs_TITLE,
    ARTs_TITLE_FIELD,
    ARTs_COMMENT,
    TRAVs_TITLE,
    TRAVs_TITLE_FIELD,
    TRAVs_COMMAND,
    
    HELP,
    SEASONS,
    DESTINY,
    COMMAND,
    DESCRIPTION_HELP,
    DESCRIPTION_SEASONS,
    DESCRIPTION_DESTINY,
    DESCRIPTION_COMMAND
}