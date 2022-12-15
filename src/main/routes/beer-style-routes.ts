import { Router } from "express";
import { adaptRoute } from "@/main/adapters/express-route-adapter";
import {
  makeAddBeerStyleController,
  makeGetAllBeerStyleController,
  makeGetBeerStyleController,
  makeUpdateBeerStyleController,
  makeDeleteBeerStyleController
} from "@/main/factories";

const beerStyleRoutes = Router();

beerStyleRoutes.post("/beer", adaptRoute(makeAddBeerStyleController()));
beerStyleRoutes.get("/beer", adaptRoute(makeGetAllBeerStyleController()));
beerStyleRoutes.get("/beer/:id", adaptRoute(makeGetBeerStyleController()));
beerStyleRoutes.patch("/beer/:id", adaptRoute(makeUpdateBeerStyleController()));
beerStyleRoutes.delete("/beer/:id", adaptRoute(makeDeleteBeerStyleController()));

export default beerStyleRoutes;
