import mysql, { type Pool, type PoolConnection } from 'mysql2/promise'

export class Singleton {
  static #instance: Singleton;
  private pool: Pool;

  private constructor() {
    this.pool = mysql.createPool({
      host: 'localhost',
      database: 'es3',
      user: 'root',
      password: '',
      dateStrings: true,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  public static getInstance(): Singleton {
    if (!Singleton.#instance) {
      Singleton.#instance = new Singleton();
    }
    return Singleton.#instance;
  }

  public async getConnection(): Promise<PoolConnection> {
    return await this.pool.getConnection();
  }
}
