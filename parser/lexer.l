%%
\s+                    /* Ignorar espacios en blanco */
"anfang"               return 'ANFANG';
"ende"                 return 'ENDE';
"wert"                 return 'WERT';
"symbole"              return 'SYMBOLE';
"="                    return 'ASSIGN';
[0-9]+                 { yylval = { val: Number(yytext) }; return 'INT'; }
"farbe"                return 'FARBE';
"pos"                  return 'POS';
"rec"                  return 'REC';
"lin"                  return 'LIN';
"ube"                  return 'UBE';
"unt"                  return 'UNT';
"rojo"                 return 'ROJO';
"azul"                 return 'AZUL';
"amarillo"             return 'AMARILLO';
"verde"                return 'VERDE';
"blanco"               return 'BLANCO';
[A-Z][0-9]             return 'ID'; // Identificadores genéricos
"("                    return '(';
")"                    return ')';
","                    return ',';
<<EOF>>                return 'EOF';

%% 
