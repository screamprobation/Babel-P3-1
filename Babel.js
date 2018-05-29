/*

Babel.js - AMD/2018

    *** REESCREVA ESTE TEXTO! ***
    
Autores: Jonas Rodrigues (49806), Joao Costa (50597)

O ficheiro "Babel.js" tem de incluir, logo nas primeiras linhas, um comentário
inicial contendo: o nome e número dos dois alunos que realizaram o projeto;
indicação de quais as partes do trabalho que foram feitas e das que não foram
feitas (para facilitar uma correção sem enganos); ainda possivelmente alertando
para alguns aspetos da implementação que possam ser menos óbvios para o avaliador.

01234567890123456789012345678901234567890123456789012345678901234567890123456789

*/

/* Global variables */

var xmlDoc, xmlSerializer, languageName;


/* Misc functions */

function play(sound) {
    const soundEnabled = true;

    var nodes = xmlDoc.getElementsByTagName("SOUNDSPREFIX");
    if ( nodes.length == 1) {
        const prefix = nodes[0].childNodes[0].nodeValue;
    }

    if( soundEnabled )
        new Audio(prefix + sound).play();
    else
        alert("SOUND: " + sound);
}

function validate(answer, solution) {
    if( answer == solution )
        play("general/right_answer.mp3");
    else
        play("general/wrong_answer.mp3");
}

/* XML */
/*       https://www.w3schools.com/xml/default.asp  */

function text2XML(text) {
    parser = new DOMParser();
    serializer = new XMLSerializer();
    xmlDoc = parser.parseFromString(text,"text/xml");
    return xmlDoc;
}

function XML2Text(xml) {
    return xmlSerializer.serializeToString(xml);
}

/* Local files */
/*        https://www.javascripture.com/FileReader */

function processLocalFile(e, processor) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
        processor(e.target.result);
    };
    reader.readAsText(file, "UTF-8");
}


/* JavaScript HTML DOMhttps://www.w3schools.com/js/js_htmldom.asp */
/*        https://www.w3schools.com/js/js_htmldom.asp */

function eventHandler(a, kind, action) {
    a[kind] = new Function(action);
    return a;
}

function h1(target, text) {
    var a = document.createElement("H1");
    var b = document.createTextNode(text);
    a.appendChild(b);
    target.appendChild(a);
    return a;
}

function hr(target) {
    var a = document.createElement("HR");
    target.appendChild(a);
    return a;
}

function p(target, style) {
    var a = document.createElement("P");
    a.style = style;
    target.appendChild(a);
    return a;
}

function br(target) {
    var a = document.createElement("BR");
    target.appendChild(a);
    return a;
}

function text(target, fsize, t) {
    var a = document.createElement('SPAN');
    var b = document.createTextNode(t);
    a.appendChild(b);
    a.style.fontSize = fsize + "px";
    target.appendChild(a);
    return a;
}

function img(target, url) {
    var a = document.createElement("IMG");
    a.src = url;
    target.appendChild(a);
    return a;
}

function inputActiveText(target, id, size, fsize, placeholder) {
    var a = document.createElement("INPUT");
    a.type = "text";
    a.id = id;
    a.value = "";
    a.placeholder = placeholder;
    a.style.fontSize = fsize + "px";
    a.size = size;
    target.appendChild(a);
    return a;
}    

function inpuButton(target, id, value, color) {
    var a = document.createElement("INPUT");
    a.type = "button";
    a.id = id;
    a.value = value;
    a.style.backgroundColor = color;
    target.appendChild(a);
    return a;
}

function inpuFile(target, id, ) {
    var a = document.createElement("INPUT");
    a.type = "file";
    a.id = id;
    target.appendChild(a);
    return a;
}

function div(target, style) {
    var a = document.createElement("DIV");
    a.style = style;
    target.appendChild(a);
    return a;    
}

function screen0() {
    var body = document.body;
// start with a blank page
    body.innerHTML = '';

// load the language XML
    var f = inpuFile(body, "file-input");
    eventHandler(f, "onchange", "processLocalFile(event, runLanguage);");
}

//************************************E APENAS EXEMPLO, DEPOIS E PARA REMOVER     ************************************
function screen1() {
    var body = document.body;
// start with a blank page
    body.innerHTML = '';

    h1(body, "Babel   (" + languageName + ")");
    hr(body);

// a div, only because we want a border
    var d = div(body, "border:3px solid black; display:table; padding:20px; margin-left:40px");
    h1(d, "Write this in English");

// first line
    var p1 = p(d, "padding-left:40px; word-spacing:50px;");
    var i = img(p1, "http://icons.iconarchive.com/icons/icons8/ios7/32/Media-Controls-High-Volume-icon.png");
    eventHandler(i, "onclick", "play('japanese/sentences/何時ですか.mp3');");
    text(p1, 16, " ");
    text(p1, 32, "何時ですか");

// second line
    var p2 = p(d, "padding-left:20px;");
    var i = inputActiveText(p2, "answer", 40, 24, "Type this in English");
    eventHandler(i, "onkeydown", "if(event.keyCode == 13) document.getElementById('check').click();");
    text(p2, 16, " ");
    var b1 = inpuButton(p2, "check", "Check", "lime");
    eventHandler(b1, "onclick", "validate(document.getElementById('answer').value, 'What time is it?');");

    hr(body);
}

//----------OUR CODE---------
//-----Funcoes auxiliares-----
function getNumberOfChildElements(parent, elementName) {
    var nodes = parent.getElementsByTagName(elementName);
    return nodes.length;
}

//--------Classes----------

class Startup {
    static start() {

        console.log("start()");

        var language = new LanguageExtraAlphabets();
        var page = new DynamicHTML(language);

        page.addLessonsButtons(language.getNLessons());
    }
}

class DynamicHTML {
    constructor(language) {
        this.body = document.body;
        this.body.innerHTML = '';
        h1(this.body, "Babel   (" + languageName + ")");
        hr(this.body);
        this.nav = div(this.body, "display:table; margin-bottom:20px;");
        this.language = language;
    }

    addLessonsButtons(nLessons) {
        this.buttons = [];
        console.log("addLessonsButtons=" + nLessons);
        for (var i = 1; i <= nLessons;i++) {
            console.log("button");
            this.buttons[i] = inpuButton(this.nav,"button" + i,"Lesson" + i, "red");
            eventHandler(this.buttons[i],"onclick","showKeyboardScreen(" + i +");");
        }
    }

    removeLessonButtons() {
        //TODO ??? Talvez nao necessario
    }

    //TODO HARDCODED PARA TESTAR
    static showKeyboardScreen(lessonID) {
        console.log("showKeyboardScreen(i)");
        var screen = this.language.initLesson(lessonID); //USAR ISTO SUBSTITUIR EM BAIXO PELO RESPETIVO

        //PARTE HARDCODED
        var d = div(this.body, "border:3px solid black; display:table; padding:20px; margin-left:40px");
        h1(d, "Write this in English");

        var p1 = p(d, "padding-left:40px; word-spacing:50px;");
        var i = img(p1, "http://icons.iconarchive.com/icons/icons8/ios7/32/Media-Controls-High-Volume-icon.png");
        eventHandler(i, "onclick", "play('japanese/sentences/何時ですか.mp3');");
        text(p1, 16, " ");
        text(p1, 32, "何時ですか");

        var p2 = p(d, "padding-left:20px;");
        var i = inputActiveText(p2, "answer", 40, 24, "Type this in English");
        eventHandler(i, "onkeydown", "if(event.keyCode == 13) document.getElementById('check').click();");

        text(p2, 16, " ");
        var b1 = inpuButton(p2, "check", "Check", "lime");
        eventHandler(b1, "onclick", "validate(document.getElementById('answer').value, 'What time is it?');");
    }

    showPairsScreen(lesson) {

    }

    showBlocksScreens(lesson) {

    }

    showSymbolsScreen(lesson) {

    }
}

class Language {
    constructor(page) {
        this.nLessons = getNumberOfChildElements(xmlDoc, "LESSON");
        this.currLesson = null;
    }

    initLesson(id) {
        this.currLesson = new Lesson(id);
        return this.nextScreen();
    }

    nextScreen() {
        if(this.currLesson.hasNextScreen()) {
            return this.currLesson.nextScreen();
        }
    }

    getCurrentLesson(){
        return this.currLesson;
    }

    getNLessons() {
        return this.nLessons;
    }
}

//TODO
class LanguageExtraAlphabets extends Language {
    constructor() {
        super();
    }

}

class Lesson {
    //GUARDAR SCREENS AQUI e fazer a gestão da interação ao longo da lição
    constructor(id) {
        this.screens = [];
        this.currentScreenNumber = 0;
        this.lessonXML = xmlDoc.getElementsByTagName("LESSON")[id-1];
        this.nScreens = this.lessonXML.childNodes.length;
        this.currScreen = null;
    }

    hasNextScreen() {
        return this.currentScreenNumber < this.nScreens;
    }

    nextScreen() {
        if(this.hasNextScreen()) {
            this.currentScreenNumber++;
            this.currScreenType = this.lessonXML.childNodes[this.currentScreenNumber - 1].tagName;
            var screenXML = this.lessonXML.childNodes[this.currentScreenNumber - 1];
            switch (this.currScreenType) {
                case "KEYBOARD":

                    var prompt = screenXML.getElementsByTagName("PROMPT")[0].firstChild.nodeValue;
                    var original = screenXML.getElementsByTagName("ORIGINAL")[0].firstChild.nodeValue;
                    var sound = screenXML.getElementsByTagName("SOUND")[0].firstChild.nodeValue;
                    var solutions = [];

                    for (var j = 0; j < getNumberOfChildElements(this.currScreen, "SOLUTION"); j++) {
                        console.log(i);
                        solutions[j] = screenXML.getElementsByTagName("SOLUTION")[j].firstChild.nodeValue;
                    }
                    this.currScreen = new Keyboard(prompt, original, solutions, sound);
                    this.screens[this.currentScreenNumber] = this.currScreen;
                    break;

                //TODO outros screens
                case "PAIRS":
                    this.screens[this.currentScreenNumber] = new Pairs();
                    break;
                case "BLOCKS":
                    this.screens[this.currentScreenNumber] = new Blocks();
                    break;
                case "SYMBOLS":
                    this.screens[this.currentScreenNumber] = new Symbols();
                    break;
            }

            return this.currScreen;
        } else {
            alert("ERRO!!");
        }
    }

    getCurrentScreen() {
        return this.currScreen;
    }

}

class Screen {
    constructor(prompt, original, solutions) {
        this.prompt = prompt;
        this.original = original;
        this.solutions = solutions;
    }

    answer(answer) {
        var nSolutions = this.solutions.length;
        for(var i = 0;i<nSolutions;i++) {
            if(answer===this.solutions[i]) {
                return true;
            }
        }
        return false;    
    }

    getPrompt() {
        return this.prompt;
    }

    getOriginal() {
        return this.original;
    }

    getSolution() {
        return this.solutions[0];
    }
}

class Keyboard extends Screen {
    constructor(prompt, original, solutions, sound) {
        super(prompt, original, solutions);
        this.sound = sound;
        //TODO som como evento ao clicar no botao chamar playsound
    }


}

//TODO
class Pairs extends Screen {

}

class Blocks extends Screen {

}

class Symbols extends Screen { //Usar para alfabetos extra apenas

}
//------------------------------

//TESTE
class Game {
    static run() {
        var body = document.body;
        body.innerHTML = '';
        h1(body, "Babel   (" + languageName + ")");
        hr(body);
        var d = div(body, "border:3px solid black; display:table; padding:20px; margin-left:40px");

        //var nLessons = getNumberOfChildElements(xmlDoc,"LESSON");
        var nScreens = 1;
        var screens = [];
        var currScreenNumber;

        var currScreen;
        var currScreenType;
        var prompt, original, solutions = [], sound;

        //STARTUP le ficheiro e sabe quantos screens e as solucoes de cada um etc
        for(var i = 1;i<=nScreens;i++) {
            currScreen = getLessonData(i,nLessons);
            currScreenType = currScreen.firstChild.tagName;
            prompt = currScreen.getElementsByTagName("PROMPT")[0].firstChild.nodeValue;
            original = currScreen.getElementsByTagName("ORIGINAL")[0].firstChild.nodeValue;

            console.log(getNumberOfChildElements(currScreen,"SOLUTION"));
            console.log(currScreen);
            console.log(prompt);
            console.log(original);

            for(var j = 0;j<getNumberOfChildElements(currScreen,"SOLUTION");j++) {
                console.log(i);
                solutions[j] = currLesson.getElementsByTagName("SOLUTION")[j].firstChild.nodeValue;
            }

            sound = currLesson.getElementsByTagName("SOUND")[0].firstChild.nodeValue

            screens[i] = new Screen(prompt, original, solutions, sound); //Usar instance of mais a frente
            //pode dar jeito para saber qe licao estamos
            console.log(currScreenType);
        }

        console.log(solutions);
        console.log(lessons[1]);
    }

    static nextLesson() {

    }

}
//------------------------------

function runLanguage(text) {
    xmlDoc = text2XML(text);  // assignement to global
    xmlSerializer = new XMLSerializer();  // assignement to global
        // https://www.w3schools.com/xml/dom_nodes_get.asp
    var nodes = xmlDoc.getElementsByTagName("LANGNAME");
    if( nodes.length == 1 ) {
        languageName = nodes[0].childNodes[0].nodeValue;  // assignement to global
        //screen1();
        Startup.start();
    }
    else {
        alert('ERROR: Not a language file!\nPLEASE, TRY AGAIN!');
        screen0();
    }
}

function onLoad() {
    screen0();
}

