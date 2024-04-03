export interface Hero {
    name: string,
    class: Class
}

enum Class {
    WARRIOR = 'warrior',
    MASKMAN = 'maskman',
    MAGE = 'mage'
}

export interface HeroModel extends Hero {
    id: number
}

export interface HeroPayload {
    heroes: HeroModel[]
}