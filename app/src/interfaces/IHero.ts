export interface Hero {
  name: string,
  class: Class
}

export enum Class {
  WARRIOR = 'warrior',
  MASKMAN = 'maskman',
  MAGE = 'mage'
}

export interface HeroModel extends Hero {
  id: number
}

export interface HeroResponse {
  heroes?: HeroModel[],
  errors?: unknown
}

export interface UpdateHero {
  name?: string,
  class?: Class;
}