import { beerStyleRoutes } from "@/main/routes";

import { Express, Router } from "express";

export const setupRoutes = (app: Express): void => {
  const routes = Router();

  routes.use("/api", beerStyleRoutes);

  app.use(routes);
};
