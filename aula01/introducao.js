console.log("OIEEEE");

var Variavel101 = "oi,";

let Variavel102 = "Tudo bem?";

const Variavel103 = "Vocês são lindos";

// Concatenação de variaveis
console.log (Variavel101 + Variavel102 ); // Sem espaços
console.log(Variavel101, Variavel102); // insere espaços

Variavel101 = "Olá! ";
console.log(Variavel101, Variavel102);

// Variavel103 = "Oiiiiiii"
// Variaveis do tipo constante não podem 
// receber um novo valor que sobreescreva 
// o original

let Teste = "texto"
console.log(typeof(Teste));
Teste = 2;
console.log(typeof(Teste));
Teste = {nome: "Isabelly", idade: 16};
console.log("O tipo agora é: ", typeof(Teste));
Teste = [1, 2];
console.log("O resultado do tipo de array é", typeof(Teste));