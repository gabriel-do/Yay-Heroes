import { YAY_HEROES_ENDPOINT } from "../constants/apiEndpoints";
import { HeroPayload } from "../interfaces/IHero";
import kyInstance from "./interceptor";

export async function getHeroes(): Promise<HeroPayload> {
    const queryString: string = YAY_HEROES_ENDPOINT;
    const res = await kyInstance.get(queryString);
    return res.json();
}