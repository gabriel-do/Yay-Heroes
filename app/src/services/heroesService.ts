import {
  GET_ALL_HEROES,
  CREATE_HERO,
  GET_ONE_HERO,
  UPDATE_HERO,
  DELETE_HERO,
} from "../constants/apiEndpoints";
import { HeroResponse, Hero, UpdateHero } from "../interfaces/IHero";
import kyInstance from "./interceptor";

export async function getHeroes(): Promise<HeroResponse> {
  const queryString: string = GET_ALL_HEROES;
  const res = await kyInstance.get(queryString);
  return res.json();
}

export async function getHero(id: number): Promise<HeroResponse> {
  const queryString: string = GET_ONE_HERO;
  const res = await kyInstance.get(queryString + `?id=${id}`);
  return res.json();
}

export async function createHero(requestBody: Hero): Promise<HeroResponse> {
  const queryString: string = CREATE_HERO;
  const res = await kyInstance.post(queryString, { json: requestBody });
  return res.json();
}

export async function updateHero(
  id: number,
  hero: UpdateHero
): Promise<HeroResponse> {
  const queryString: string = UPDATE_HERO;
  const res = await kyInstance.patch(queryString + `?id=${id}`, { json: hero });
  return res.json();
}

export async function deleteHero(id: number): Promise<HeroResponse> {
  const queryString: string = DELETE_HERO;
  const res = await kyInstance.delete(queryString + `?id=${id}`);
  return res.json();
}
