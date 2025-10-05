import type { Observador } from "./observer.interface.js";

export interface Sujeito {
  adicionarObservador(obs: Observador): void;
  removerObservador(obs: Observador): void;
  notificarObservadores(): void;
}
