/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var compiled_grammar = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,9],$V1=[1,13],$V2=[1,14],$V3=[1,19],$V4=[1,20],$V5=[1,21],$V6=[1,22],$V7=[6,7],$V8=[6,7,12,23,26,28,29,30,31],$V9=[1,40],$Va=[1,41],$Vb=[1,43],$Vc=[1,44],$Vd=[1,45],$Ve=[1,46],$Vf=[1,47],$Vg=[6,7,12,23,25,26,27,28,29,30,31];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"PROG":3,"ANFANG":4,"MULTI_INST":5,"ENDE":6,"EOF":7,"SYMBOLE":8,"INST":9,"DECL":10,"PROC":11,"WERT":12,"ID":13,"ASSIGN":14,"DATO":15,"PROC_FARBE":16,"PROC_POS":17,"MOV":18,"MOV_REC":19,"MOV_LIN":20,"MOV_UBE":21,"MOV_UNT":22,"FARBE":23,"(":24,")":25,"POS":26,",":27,"REC":28,"LIN":29,"UBE":30,"UNT":31,"INT":32,"COLOR":33,"ROJO":34,"AZUL":35,"AMARILLO":36,"VERDE":37,"BLANCO":38,"$accept":0,"$end":1},
terminals_: {2:"error",4:"ANFANG",6:"ENDE",7:"EOF",8:"SYMBOLE",12:"WERT",13:"ID",14:"ASSIGN",23:"FARBE",24:"(",25:")",26:"POS",27:",",28:"REC",29:"LIN",30:"UBE",31:"UNT",32:"INT",34:"ROJO",35:"AZUL",36:"AMARILLO",37:"VERDE",38:"BLANCO"},
productions_: [0,[3,3],[3,2],[3,3],[3,2],[3,2],[3,2],[5,1],[5,2],[9,1],[9,1],[10,4],[11,1],[11,1],[11,1],[18,1],[18,1],[18,1],[18,1],[16,4],[17,6],[19,4],[20,4],[21,4],[22,4],[15,1],[15,1],[15,1],[33,1],[33,1],[33,1],[33,1],[33,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 
        return stateInstance.checkAction(Actions.BEGIN) 
    
break;
case 2:
 
        var isValid = stateInstance.checkAction(Actions.BEGIN)
        if (isValid.constructor !== Error) stateInstance = new ActiveState()
        return isValid
    
break;
case 3:
 
        var isValid = stateInstance.checkAction(Actions.BEGIN).constructor
        if (isValid.constructor !== Error) stateInstance = new ActiveState()
        return isValid
    
break;
case 4:
 
        return stateInstance.checkAction(Actions.INST)
    
break;
case 5:
 
        var isValid = stateInstance.checkAction(Actions.END)
        if (isValid.constructor !== Error) stateInstance = new InactiveState()
        return isValid
    
break;
case 6:
 return stateInstance.TS 
break;
case 11:

        if (stateInstance.constructor === ActiveState)
            stateInstance.TS[$$[$0-2]] = $$[$0]; // Asignamos DATO.place al ID
    
break;
case 19:

        if ($$[$0-1].type !== 'c') return console.log("POS debe recibir números como argumento");
        cambiarColor($$[$0-1].val);
    
break;
case 20:

        const error1 = validarPosicion($$[$0-3].type, $$[$0-3].val);
        const error2 = validarPosicion($$[$0-1].type, $$[$0-1].val);
        if (error1 || error2) return console.log(error1 || error2);
        cambiarPosicion($$[$0-3].val, $$[$0-1].val);
    
break;
case 21:

        if ($$[$0-1].type !== 'i') return console.log("POS debe recibir números como argumento");
        moverRec($$[$0-1].val);
    
break;
case 22:

        if ($$[$0-1].type !== 'i') return console.log("POS debe recibir números como argumento");
        moverLin($$[$0-1].val);
    
break;
case 23:

        if ($$[$0-1].type !== 'i') return console.log("POS debe recibir números como argumento");
        moverUbe($$[$0-1].val);
    
break;
case 24:

        if ($$[$0-1].type !== 'i') return console.log("POS debe recibir números como argumento");
        moverUnt($$[$0-1].val);
    
break;
case 25:

        if (stateInstance.constructor === ActiveState)
            this.$ = stateInstance.TS[$$[$0]] ?? (stateInstance.TS[$$[$0]] = new ElementoTS(null, null));
    
break;
case 26:
this.$ = new ElementoTS('i', Number($$[$0]))
break;
case 27:
this.$ = new ElementoTS('c', $$[$0])
break;
case 28:
 this.$ = "rojo"; 
break;
case 29:
 this.$ = "azul"; 
break;
case 30:
 this.$ = "amarillo"; 
break;
case 31:
 this.$ = "verde"; 
break;
case 32:
 this.$ = "blanco"; 
break;
}
},
table: [{3:1,4:[1,2],5:3,6:[1,4],8:[1,5],9:6,10:7,11:8,12:$V0,16:10,17:11,18:12,19:15,20:16,21:17,22:18,23:$V1,26:$V2,28:$V3,29:$V4,30:$V5,31:$V6},{1:[3]},{5:23,7:[1,24],9:6,10:7,11:8,12:$V0,16:10,17:11,18:12,19:15,20:16,21:17,22:18,23:$V1,26:$V2,28:$V3,29:$V4,30:$V5,31:$V6},{7:[1,25]},{7:[1,26]},{7:[1,27]},o($V7,[2,7],{9:6,10:7,11:8,16:10,17:11,18:12,19:15,20:16,21:17,22:18,5:28,12:$V0,23:$V1,26:$V2,28:$V3,29:$V4,30:$V5,31:$V6}),o($V8,[2,9]),o($V8,[2,10]),{13:[1,29]},o($V8,[2,12]),o($V8,[2,13]),o($V8,[2,14]),{24:[1,30]},{24:[1,31]},o($V8,[2,15]),o($V8,[2,16]),o($V8,[2,17]),o($V8,[2,18]),{24:[1,32]},{24:[1,33]},{24:[1,34]},{24:[1,35]},{6:[1,36],7:[1,37]},{1:[2,2]},{1:[2,4]},{1:[2,5]},{1:[2,6]},o($V7,[2,8]),{14:[1,38]},{13:$V9,15:39,32:$Va,33:42,34:$Vb,35:$Vc,36:$Vd,37:$Ve,38:$Vf},{13:$V9,15:48,32:$Va,33:42,34:$Vb,35:$Vc,36:$Vd,37:$Ve,38:$Vf},{13:$V9,15:49,32:$Va,33:42,34:$Vb,35:$Vc,36:$Vd,37:$Ve,38:$Vf},{13:$V9,15:50,32:$Va,33:42,34:$Vb,35:$Vc,36:$Vd,37:$Ve,38:$Vf},{13:$V9,15:51,32:$Va,33:42,34:$Vb,35:$Vc,36:$Vd,37:$Ve,38:$Vf},{13:$V9,15:52,32:$Va,33:42,34:$Vb,35:$Vc,36:$Vd,37:$Ve,38:$Vf},{1:[2,1]},{1:[2,3]},{13:$V9,15:53,32:$Va,33:42,34:$Vb,35:$Vc,36:$Vd,37:$Ve,38:$Vf},{25:[1,54]},o($Vg,[2,25]),o($Vg,[2,26]),o($Vg,[2,27]),o($Vg,[2,28]),o($Vg,[2,29]),o($Vg,[2,30]),o($Vg,[2,31]),o($Vg,[2,32]),{27:[1,55]},{25:[1,56]},{25:[1,57]},{25:[1,58]},{25:[1,59]},o($V8,[2,11]),o($V8,[2,19]),{13:$V9,15:60,32:$Va,33:42,34:$Vb,35:$Vc,36:$Vd,37:$Ve,38:$Vf},o($V8,[2,21]),o($V8,[2,22]),o($V8,[2,23]),o($V8,[2,24]),{25:[1,61]},o($V8,[2,20])],
defaultActions: {24:[2,2],25:[2,4],26:[2,5],27:[2,6],36:[2,1],37:[2,3]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
    
/* Definiciones */
const { 
    validarPosicion, 
    cambiarColor, 
    cambiarPosicion, 
    moverRec, 
    moverLin, 
    moverUbe, 
    moverUnt 
} = require('../src/instrucciones.js')
const { Actions } = require('../src/StateHandler/ActionEnum.js')
const { ElementoTS } = require('../src/StateHandler/ElementoTS.js')
const { ActiveState } = require('../src/StateHandler/ActiveState.js')
const { InactiveState } = require('../src/StateHandler/InactiveState.js')

let stateInstance = new InactiveState()



/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* Ignorar espacios en blanco */
break;
case 1:return 4;
break;
case 2:return 6;
break;
case 3:return 12;
break;
case 4:return 8;
break;
case 5:return 14;
break;
case 6: yylval = { val: Number(yy_.yytext) }; return 32; 
break;
case 7:return 23;
break;
case 8:return 26;
break;
case 9:return 28;
break;
case 10:return 29;
break;
case 11:return 30;
break;
case 12:return 31;
break;
case 13:return 34;
break;
case 14:return 35;
break;
case 15:return 36;
break;
case 16:return 37;
break;
case 17:return 38;
break;
case 18:return 13; // Identificadores genéricos
break;
case 19:return 24;
break;
case 20:return 25;
break;
case 21:return 27;
break;
case 22:return 7;
break;
}
},
rules: [/^(?:\s+)/,/^(?:anfang\b)/,/^(?:ende\b)/,/^(?:wert\b)/,/^(?:symbole\b)/,/^(?:=)/,/^(?:[0-9]+)/,/^(?:farbe\b)/,/^(?:pos\b)/,/^(?:rec\b)/,/^(?:lin\b)/,/^(?:ube\b)/,/^(?:unt\b)/,/^(?:rojo\b)/,/^(?:azul\b)/,/^(?:amarillo\b)/,/^(?:verde\b)/,/^(?:blanco\b)/,/^(?:[A-Z][0-9])/,/^(?:\()/,/^(?:\))/,/^(?:,)/,/^(?:$)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = compiled_grammar;
exports.Parser = compiled_grammar.Parser;
exports.parse = function () { return compiled_grammar.parse.apply(compiled_grammar, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}