import express from "express";

export default class Bootstrap {
  public app: express.Application;
  private port = process.env.API_PORT || 1338;

  constructor() {
    this.app = express();

    this.config();
    this.mount();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private mount(): void {
    console.log(this.port);
    this.app.get("/", (_, res: express.Response) => res.send("Hello World!"));
  }

  listen(): void {
    this.app.listen(this.port, () =>
      console.log(`Example app listening at http://localhost:${this.port}`)
    );
  }
}
