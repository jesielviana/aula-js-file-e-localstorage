// Função para cadastrar um livro
async function cadastrarLivro() {
  let titulo = prompt("Digite o título do livro:");
  let autor = prompt("Digite o autor do livro:");
  let ano = prompt("Digite o ano de publicação do livro:");

  // Cria um objeto livro e adiciona ao array
  let livro = {
    titulo: titulo,
    autor: autor,
    ano: ano
  };

  const file = Bun.file("livros.json");
  const fileExist = await file.exists();

  let livros = [];
  if (fileExist) {
    livros = await file.json();
  }
  livros.push(livro);
  await Bun.write("livros.json", JSON.stringify(livros));

  console.log("Livro cadastrado com sucesso!");
}

// Função para listar os livros cadastrados
async function listarLivros() {

  const file = Bun.file("livros.json");
  const fileExist = await file.exists();
  let livros = [];
  if (fileExist) {
    livros = await file.json();
  }

  if (livros.length === 0) {
    console.log("Nenhum livro cadastrado.");
  } else {
    console.log("\n \nLivros cadastrados:");
    livros.forEach((livro, index) => {
      console.log(`*********** Livro ${index + 1} ************`);
      console.log(`Título: ${livro.titulo}`);
      console.log(`Autor: ${livro.autor}`);
      console.log(`Ano: ${livro.ano}`);
    });
    console.log(`*********************** \n \n`);
  }
}

// Função para exibir o menu e processar a escolha do usuário
async function exibirMenu() {
  while (true) {
    let opcao = prompt(
      "Escolha uma opção:\n" +
      "0 - Sair\n" +
      "1 - Cadastrar livro\n" +
      "2 - Listar livros cadastrados\n" +
      "Digite o número da opção:"
    );

    switch (opcao) {
      case "0":
        console.log("Saindo...");
        return; // Sai do loop e encerra o programa
      case "1":
        await cadastrarLivro();
        break;
      case "2":
        await listarLivros();
        break;
      default:
        console.log("Opção inválida. Tente novamente.");
    }
  }
}

// Inicia o programa exibindo o menu
await exibirMenu();