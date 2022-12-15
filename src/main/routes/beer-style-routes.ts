import { Router } from "express";
import { adaptRoute } from "@/main/adapters/express-route-adapter";
import { makeAddBeerStyleController, makeGetAllBeerStyleController } from "@/main/factories";

const beerStyleRoutes = Router();

beerStyleRoutes.post("/beer", adaptRoute(makeAddBeerStyleController()));
beerStyleRoutes.get("/beer", adaptRoute(makeGetAllBeerStyleController()));

export default beerStyleRoutes;
