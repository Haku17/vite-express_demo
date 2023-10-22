export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PGDATABASE: string;
      PGUSER: string;
      PGPASSWORD: string;
      PGPORT: number;
      PORT: number;
    }
  }
}
