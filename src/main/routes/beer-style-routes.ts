import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeAddBeerStyleController } from "../factories/add-beer-style-factory";

const beerStyleRoutes = Router();

beerStyleRoutes.post("/beer", adaptRoute(makeAddBeerStyleController()));

export default beerStyleRoutes;
