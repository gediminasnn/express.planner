import express from "express";
import log4js from "log4js";

export default class Bootstrap {
  public app: express.Application;
  private port = process.env.API_PORT || 1338;
  private logger: log4js.Logger = log4js.getLogger();

  constructor() {
    this.app = express();

    this.logger.level = "debug";
    this.logger.debug("This is debug line");
    this.logger.info("This is info line");
    this.logger.fatal("This is fatal line");
    this.logger.error("This is error line");

    this.config();
    this.mount();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private mount(): void {
    this.app.get("/", (_, res: express.Response) => res.send("Hello World!"));
  }

  listen(): void {
    this.app.listen(this.port, () => {
      return console.log(
        `Example app listening at http://localhost:${this.port}`
      );
    });
  }
}
