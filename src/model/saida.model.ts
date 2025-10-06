import { Produto } from "./produto.model.js";

export class Saida {
  private idMovSaida: number;
  private quantidade: number;
  private descricao: string;
  private produto: Produto;

  constructor(
    idMovSaida: number,
    quantidade: number,
    descricao: string,
    produto: Produto
  ) {
    this.idMovSaida = idMovSaida;
    this.quantidade = quantidade;
    this.descricao = descricao;
    this.produto = produto;
  }

  public getIdMovSaida(): number {
    return this.idMovSaida;
  }

  public setIdMovSaida(idMovSaida: number): void {
    this.idMovSaida = idMovSaida;
  }

  public getQuantidade(): number {
    return this.quantidade;
  }

  public setQuantidade(quantidade: number): void {
    this.quantidade = quantidade;
  }

  public getDescricao(): string {
    return this.descricao;
  }

  public setDescricao(descricao: string): void {
    this.descricao = descricao;
  }

  public getProduto(): Produto {
    return this.produto;
  }

  public setProduto(produto: Produto): void {
    this.produto = produto;
  }
}
