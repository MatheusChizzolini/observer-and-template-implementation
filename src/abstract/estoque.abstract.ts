import type { PoolConnection } from "mysql2/promise";
import { Entrada } from "../model/entrada.model.js";
import { Saida } from "../model/saida.model.js";
import type { Produto } from "../model/produto.model.js";
import { Singleton } from "../database/singleton.js";

export abstract class Estoque {
  protected constructor() {}

  public async registrarPrincipal(produto: Produto, entrada: Entrada | null, saida: Saida | null) {
    const db = await Singleton.getInstance().getConnection();
    await this.atualizarQuantidade(db, produto);
    if (entrada) {
      await this.registrar(db, entrada, null, produto);
    }
    else {
      await this.registrar(db, null, saida, produto);
    }
  }

  public async atualizarQuantidade(db: PoolConnection, produto: Produto): Promise<boolean> {
    const [result]: any = await db.query(
      "UPDATE produto SET quantidade = ? WHERE idProduto = ?",
      [produto.getQuantidade(), produto.getId()]
    );
    return result.affectedRows > 0;
  }

  protected abstract registrar(db: PoolConnection, entrada: Entrada | null, saida: Saida | null, produto: Produto): Promise<boolean>
}
