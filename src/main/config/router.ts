import { Express, Router } from "express";
import beerStyle from "@/main/routes/beer-style-routes";

export const setupRoutes = (app: Express): void => {
  const routes = Router();

  routes.use("/api", beerStyle);

  app.use(routes);
};
