import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeGetPlaylistByTemperatureController } from "../factories/playlist";

const playlistRoutes = Router();

playlistRoutes.get("/playlist", adaptRoute(makeGetPlaylistByTemperatureController()));

export { playlistRoutes };
