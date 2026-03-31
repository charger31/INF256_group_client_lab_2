export interface Config {
  server: Server;
}

interface Server {
  host: string;
  port: number;
}
