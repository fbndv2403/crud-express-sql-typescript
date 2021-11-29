import express, { Application } from "express";
import userRoutes from "../routes/usuario.routes";
import cors from "cors";

import db from "../db/connection";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    usuarios: "/api/usuarios",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8080";
    this.dbConnection();
    this.middleware();
    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("db online");
    } catch (error: any) {
      throw new Error(error);
    }
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("./src/public"));
  }

  routes() {
    this.app.use(this.apiPaths.usuarios, userRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor de typescript ${this.port}`);
    });
  }
}

export default Server;
