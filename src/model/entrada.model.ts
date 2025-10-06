import { Produto } from "./produto.model.js";

export class Entrada {
  private idMovEntrada: number;
  private quantidade: number;
  private descricao: string;
  private produto: Produto;

  constructor(
    idMovEntrada: number,
    quantidade: number,
    descricao: string,
    produto: Produto
  ) {
    this.idMovEntrada = idMovEntrada;
    this.quantidade = quantidade;
    this.descricao = descricao;
    this.produto = produto;
  }

  public getIdMovEntrada(): number {
    return this.idMovEntrada;
  }

  public setIdMovEntrada(idMovEntrada: number): void {
    this.idMovEntrada = idMovEntrada;
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
