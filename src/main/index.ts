import "./config/module-alias";
import "reflect-metadata";

import { app } from "@/main/config/app";
import { PostgresDataSource } from "@/infra/database/pg-datasource";
import { env } from "@/main/config/env";

const port = env.port ?? "8000";

PostgresDataSource.initialize()
  .then(() => {
    app.listen(port, () => console.log(`server running at http://localhost:${port}`));
  })
  .catch((e) => {
    console.error(e);
  });
