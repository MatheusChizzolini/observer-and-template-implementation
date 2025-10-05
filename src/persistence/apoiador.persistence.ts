import { Apoiador } from "../model/apoiador.model.js";
import type { PoolConnection } from "mysql2/promise";

export class ApoiadorPersistence {
  public async consultarNotificados(db: PoolConnection): Promise<Apoiador[]> {
    const [rows]: any[] = await db.query(
      "SELECT * FROM apoiador WHERE notificar = ?",
      [true]
    );
    return rows.map(
      (r: any) =>
        new Apoiador(
          r.idApoiador,
          r.nome,
          r.email,
          r.endereco,
          r.telefone,
          Boolean(r.notificar)
        )
    );
  }

  public async atualizarNotificados(
    db: PoolConnection,
    apoiador: Apoiador
  ): Promise<boolean> {
    const [result]: any = await db.query(
      "UPDATE apoiador SET notificar = ? WHERE idApoiador = ?",
      [apoiador.getNotificar(), apoiador.getId()]
    );
    return result.affectedRows > 0;
  }
}
