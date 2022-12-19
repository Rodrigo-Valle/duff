import { beerStyleRoutes, playlistRoutes } from "@/main/routes";

import { Express, Router } from "express";

export const setupRoutes = (app: Express): void => {
  const routes = Router();

  routes.use("/api", beerStyleRoutes);
  routes.use("/api", playlistRoutes);

  app.use(routes);
};
