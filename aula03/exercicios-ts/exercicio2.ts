let cidades: string[] = ['São Paulo', 'Rio de Janeiro', 'Curitiba', 'Salvador', 'Recife'];

function listarCidades(cidades: string[]): void {
    cidades.forEach(cidade => console.log(cidade));
}

listarCidades(cidades);
