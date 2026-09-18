interface Livro {
    titulo: string;
    autor: string;
    anoPublicacao: number;
}

let livro: Livro = {
    titulo: 'O Pequeno Príncipe',
    autor: 'Antoine de Saint-Exupéry',
    anoPublicacao: 1943
};

function exibirLivro(livro: Livro): void {
    console.log(`Título: ${livro.titulo}`);
    console.log(`Autor: ${livro.autor}`);
    console.log(`Ano de publicação: ${livro.anoPublicacao}`);
}

exibirLivro(livro);
