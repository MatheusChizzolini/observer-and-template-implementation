import type { Observador } from "../interface/observer.interface.js";
import type { Sujeito } from "../interface/subject.interface.js";

export class Produto implements Sujeito {
  private observadores: Observador[] = [];

  constructor(
    private idProduto: number,
    private descricao: string,
    private marca: string,
    private quantidade: number
  ) {}

  public getId(): number {
    return this.idProduto;
  }
  public getDescricao(): string {
    return this.descricao;
  }
  public getMarca(): string {
    return this.marca;
  }
  public getQuantidade(): number {
    return this.quantidade;
  }

  public adicionarObservador(obs: Observador): void {
    this.observadores.push(obs);
  }

  public removerObservador(obs: Observador): void {
    this.observadores = this.observadores.filter((o) => o !== obs);
  }

  public notificarObservadores(): void {
    const msg = `O produto "${this.descricao}" está em falta no estoque!`;
    console.log(`\nNotificando apoiadores: ${msg}`);
    this.observadores.forEach((o) => o.atualizar(msg));
  }

  public alterarQuantidade(qtd: number, op: string): void {
    if (op === "a")
      this.quantidade += qtd;
    else
      this.quantidade -= qtd;
  }
}
