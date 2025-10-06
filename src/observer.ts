import readline from "readline/promises";
import { stdin as input, stdout as output, exit } from "process";
import { Singleton } from "./database/singleton.js";

import { ProdutoPersistence } from "./persistence/produto.persistence.js";
import { ApoiadorPersistence } from "./persistence/apoiador.persistence.js";
import { Apoiador } from "./model/apoiador.model.js";
import type { PoolConnection } from "mysql2/promise";

const rl = readline.createInterface({ input, output });

async function main() {
  const db = Singleton.getInstance();
  const conn = await db.getConnection();

  const produtoRepo = new ProdutoPersistence();
  const apoiadorRepo = new ApoiadorPersistence();

  console.log("\nObserver - Projeto Latido");

  let continuar = true;
  while (continuar) {
    console.log(`
-------------------------------
[1] Gerenciar notificações
[2] Atualizar estoque
[3] Visualizar produtos
[4] Encerrar sistema
-------------------------------
`);

    const opcao = await rl.question("Escolha uma opção: ");

    switch (opcao.trim()) {
      case "1":
        await menuNotificacoes(conn, apoiadorRepo);
        break;
      case "2":
        await menuEstoque(conn, produtoRepo, apoiadorRepo);
        break;
      case "3":
        await listarProdutos(conn, produtoRepo);
        break;
      case "4":
        continuar = false;
        console.log("\nEncerrando sistema...");
        break;
      default:
        console.log("Opção inválida, tente novamente.\n");
    }
  }

  conn.release();
  rl.close();
  exit(0);
}

async function menuNotificacoes(
  conn: PoolConnection,
  repo: ApoiadorPersistence
) {
  let sair = false;
  while (!sair) {
    console.log(`
===== Configurações de Notificação =====
[1] Ativar notificação para apoiador
[2] Desativar notificação para apoiador
[3] Voltar ao menu principal
----------------------------------------
`);
    const opcao = await rl.question("Escolha uma ação: ");

    switch (opcao.trim()) {
      case "1":
      case "2": {
        const id = parseInt(await rl.question("ID do apoiador: "));
        const status = opcao === "1";
        const apoiador = new Apoiador(id, "", "", "", "", status);
        const ok = await repo.atualizarNotificados(conn, apoiador);

        if (ok) {
          console.log(
            status
              ? "Apoiador agora receberá notificações."
              : "Notificações desativadas para este apoiador."
          );
        } else {
          console.log("Ocorreu um erro ao alterar as configurações.");
        }
        break;
      }
      case "3":
        sair = true;
        break;
      default:
        console.log("Opção inválida, tente novamente.\n");
    }
  }
}

async function menuEstoque(
  conn: PoolConnection,
  produtoRepo: ProdutoPersistence,
  apoiadorRepo: ApoiadorPersistence
) {
  console.log("\n===== Atualização de Estoque =====");

  const produtos = await produtoRepo.consultarTodos(conn);
  if (produtos.length === 0) {
    console.log("Nenhum produto cadastrado.");
  } else {
    console.log("\nLista de produtos:");
    produtos.forEach((p) => {
      console.log(
        `• [${p.getId()}] ${p.getDescricao()} (${p.getQuantidade()} unidades)`
      );
    });

    const idProd = parseInt(
      await rl.question("\nInforme o ID do produto a alterar: ")
    );
    const produto = produtos.find((p) => p.getId() === idProd);
    if (!produto) {
      console.log("Produto não encontrado.");
      return;
    }

    const valor = parseInt(await rl.question("Quantidade a alterar: "));
    const operacao = (
      await rl.question("Deseja adicionar (A) ou retirar (R) estoque? ")
    ).toLowerCase();

    if (operacao === "r" && produto.getQuantidade() - valor < 0) {
      console.log(
        "Não é possível realizar a operação, quantidade do estoque se torna negativa."
      );
    } else {
      produto.alterarQuantidade(valor, operacao);
      const ok = await produtoRepo.atualizarQuantidade(conn, produto);
      if (ok) {
        console.log(
          `Estoque de "${produto.getDescricao()}" atualizado para ${produto.getQuantidade()} unidades.`
        );

        if (produto.getQuantidade() <= 0) {
          console.log(
            `Estoque zerado para "${produto.getDescricao()}". Preparando notificações...`
          );
          const apoiadores = await apoiadorRepo.consultarNotificados(conn);
          apoiadores.forEach((a) => produto.adicionarObservador(a));
          produto.notificarObservadores();
        }
      } else {
        console.log("Erro ao atualizar estoque no banco de dados.");
      }
    }
  }
}

async function listarProdutos(conn: PoolConnection, repo: ProdutoPersistence) {
  console.log("\n===== Lista de Produtos =====");
  const produtos = await repo.consultarTodos(conn);

  if (produtos.length === 0) {
    console.log("Nenhum produto encontrado.");
  } else {
    for (const p of produtos) {
      console.log(
        `ID: ${p.getId()} | ${p.getDescricao()} (${p.getMarca()}) - ${p.getQuantidade()} unidade(s)`
      );
    }
  }
}

main();
