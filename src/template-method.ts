import readline from "readline/promises";
import { Singleton } from "./database/singleton.js";
import { ProdutoPersistence } from "./persistence/produto.persistence.js";
import { Entrada } from "./model/entrada.model.js";
import { Saida } from "./model/saida.model.js";
import { Estoque } from "./abstract/estoque.abstract.js";
import { EntradaPersistence } from "./persistence/entrada.persistence.js";
import { SaidaPersistence } from "./persistence/saida.persistence.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  const db = Singleton.getInstance();
  const conn = await db.getConnection();
  const produtoRepo = new ProdutoPersistence();

  console.log("\nTemplate Method - Projeto Latido");
  let continuar = true;

  while (continuar) {
    console.log(`
-------------------------------
[1] Registrar Entrada de Estoque
[2] Registrar Saída de Estoque
[3] Sair
-------------------------------
`);

    const opcao = await rl.question("Escolha uma opção: ");

    switch (opcao.trim()) {
      case "1":
        await registrarEntrada(produtoRepo);
        break;
      case "2":
        await registrarSaida(produtoRepo);
        break;
      case "3":
        continuar = false;
        console.log("Encerrando sistema...");
        break;
      default:
        console.log("Opção inválida. Tente novamente.");
    }
  }

  conn.release();
  rl.close();
  process.exit(1);
}

async function registrarEntrada(produtoRepo: ProdutoPersistence) {
  console.log("\nRegistrar Entrada de Estoque");
  const conn = await Singleton.getInstance().getConnection();

  const produtos = await produtoRepo.consultarTodos(conn);
  console.log("Produtos disponíveis para entrada:");
  produtos.forEach((p, index) => {
    console.log(
      `${index + 1}. ${p.getDescricao()} - Estoque: ${p.getQuantidade()}`
    );
  });

  const produtoIndex =
    parseInt(await rl.question("Escolha o número do produto para entrada: ")) -
    1;
  const produto = produtos[produtoIndex];

  const quantidade = parseInt(
    await rl.question("Informe a quantidade para entrada: ")
  );
  const descricao = await rl.question("Informe uma descrição para a entrada: ");

  produto!.setQuantidade(produto!.getQuantidade() + quantidade);

  const entrada = new Entrada(
    0,
    quantidade,
    descricao,
    produto!
  );

  const estoque: Estoque = new EntradaPersistence();
  await estoque.registrarPrincipal(produto!, entrada, null);

  console.log("Entrada registrada com sucesso!");
}

async function registrarSaida(produtoRepo: ProdutoPersistence) {
  console.log("\nRegistrar Saída de Estoque");
  const conn = await Singleton.getInstance().getConnection();

  const produtos = await produtoRepo.consultarTodos(conn);
  console.log("Produtos disponíveis para saída:");
  produtos.forEach((p, index) => {
    console.log(
      `${index + 1}. ${p.getDescricao()} - Estoque: ${p.getQuantidade()}`
    );
  });

  const produtoIndex =
    parseInt(await rl.question("Escolha o número do produto para saída: ")) - 1;
  const produto = produtos[produtoIndex];

  const quantidade = parseInt(
    await rl.question("Informe a quantidade para saída: ")
  );
  const descricao = await rl.question("Informe uma descrição para a saída: ");
  if (produto!.getQuantidade() - quantidade < 0) {
    console.log("Estoque não pode ser negativo.");
  } else {
    produto!.setQuantidade(produto!.getQuantidade() - quantidade);
    const saida = new Saida(
      0,
      quantidade,
      descricao,
      produto!
    );
    const estoque: Estoque = new SaidaPersistence();
    await estoque.registrarPrincipal(produto!, null, saida);
    console.log("Saída registrada com sucesso!");
  }
}

main();
