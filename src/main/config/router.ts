import { beerStyleRoutes, playlistRoutes } from "@/main/routes";

import { Express, Router } from "express";

export const setupRoutes = (app: Express): void => {
  const routes = Router();

  routes.use("/status", (req, res) => {
    res.json({
      message: "application is running"
    });
  });
  routes.use("/api", beerStyleRoutes);
  routes.use("/api", playlistRoutes);

  app.use(routes);
};
