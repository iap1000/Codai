const nome = "Igor Abrahão";
console.log(nome);
let nome2 = "Igor"
console.log(nome2);
nome2 = "Rogi";
console.log(nome2);
let pessoa = ["nome","idade","trabalho"];
let pessoaDefault = {
    nome: "Igor Abrahão",
    idade: "41",
    trabalho: "engenheiro"
}

function alterarNome(){
    nome2 = "Maria Silva";
    console.log("Valor alterado");
    console.log(nome2);
}

alterarNome();

function recebeEAlteraNome(novoNome){
    nome2 = novoNome;
    console.log("Valor alterado");
    console.log(nome2);
}

recebeEAlteraNome("Frederico");
console.log(pessoaDefault);

function imprimirPessoa(index){
    switch(index){
        case 1: console.log("Nome é"); console.log(pessoa.nome); break;
        case 2: console.log("Idade é"); console.log(pessoa.idade); break;
        case 3: console.log("Trabalho é"); console.log(pessoa.trabalho); break;
    }
}

imprimirPessoa(1);
imprimirPessoa(2);
imprimirPessoa(3);

let nomes = ["Fulano de Tal", "Ciclano de Tal", "Beutrano de Tal"];
let pessoas = [pessoa];

console.log(nomes);
console.log(nomes[1]);

pessoas[0] = [nomes[0],"12","trabalho1"];
pessoas[1] = [nomes[1],"33","trabalho2"];

console.log(pessoas);
console.log(pessoas[1]);

let trab = pessoas[1][2];
console.log(trab);

function adicionarPessoa(pessoa){
    pessoas.push(pessoa);
}
adicionarPessoa(["Pedro Silva","55","Corretor imoveis"])
console.log(pessoas[pessoas.length-1]);

function imprimirPessoas(){
    pessoas.forEach((item) => {
        console.log("Nome: ");
        console.log(item[0]);
        console.log("Idade: ");
        console.log(item[1]);
        console.log("Trabalho: ");
        console.log(item[2]);
        //console.log(item);
    })
}

imprimirPessoas();