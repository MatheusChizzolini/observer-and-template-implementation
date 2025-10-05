import { Produto } from "../model/produto.model.js";
import type { PoolConnection } from "mysql2/promise";

export class ProdutoPersistence {
  public async consultarTodos(db: PoolConnection): Promise<Produto[]> {
    const [rows]: any[] = await db.query("SELECT * FROM produto");
    return rows.map(
      (r: any) => new Produto(r.idProduto, r.descricao, r.marca, r.quantidade)
    );
  }

  public async atualizarQuantidade(db: PoolConnection, produto: Produto): Promise<boolean> {
    const [result]: any = await db.query(
      "UPDATE produto SET quantidade = ? WHERE idProduto = ?",
      [produto.getQuantidade(), produto.getId()]
    );
    return result.affectedRows > 0;
  }
}
