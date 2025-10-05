import type { Observador } from "../interface/observer.interface.js";

export class Apoiador implements Observador {
  private id: number;
  private nome: string;
  private email: string;
  private endereco: string;
  private telefone: string;
  private notificar: boolean;

  constructor(
    id: number = 0,
    nome: string = "",
    email: string = "",
    endereco: string = "",
    telefone: string = "",
    notificar: boolean = false
  ) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.endereco = endereco;
    this.telefone = telefone;
    this.notificar = notificar;
  }

  public getId(): number {
    return this.id;
  }

  public getNome(): string {
    return this.nome;
  }

  public getEmail(): string {
    return this.email;
  }

  public getEndereco(): string {
    return this.endereco;
  }

  public getTelefone(): string {
    return this.telefone;
  }

  public getNotificar(): boolean {
    return this.notificar;
  }

  public setNotificar(v: boolean): void {
    this.notificar = v;
  }

  public atualizar(mensagem: string): void {
    console.log(`${this.nome} (${this.email}) recebeu notificação: ${mensagem}`);
  }
}
