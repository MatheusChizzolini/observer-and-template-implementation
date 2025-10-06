import type { PoolConnection } from "mysql2/promise";
import { Estoque } from "../abstract/estoque.abstract.js";
import type { Produto } from "../model/produto.model.js";
import type { Entrada } from "../model/entrada.model.js";
import type { Saida } from "../model/saida.model.js";

export class SaidaPersistence extends Estoque {
  public async registrar(
    db: PoolConnection,
    entrada: Entrada | null,
    saida: Saida,
    produto: Produto
  ): Promise<boolean> {
    const [result] = await db.execute(
      `
        INSERT INTO saida (quantidade, descricao, idProduto)
        VALUES (?, ?, ?)
      `,
      [
        saida.getQuantidade(),
        saida.getDescricao(),
        produto.getId(),
      ]
    );
    
    if (result && (result as any).affectedRows > 0) {
      return true;
    }
    return false;
  }
}
