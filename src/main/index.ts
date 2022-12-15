import "./config/module-alias";

import "dotenv/config";
import "reflect-metadata";

import { app } from "@/main/config/app";
import { PostgresDataSource } from "@/infra/database/pg-datasource";

const port = process.env.APP_PORT ?? "8000";

PostgresDataSource.initialize()
  .then(() => {
    app.listen(port, () => console.log(`server running at http://localhost:${port}`));
  })
  .catch((e) => {
    console.error(e);
  });

// init
