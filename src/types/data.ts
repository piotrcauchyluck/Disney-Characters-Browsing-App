export interface Character {
    _id: number;
    films: string[];
    shortFilms: string[];
    tvShows: string[];
    videoGames: string[];
    parkAttractions: string[];
    allies: string[];
    enemies: string[];
    sourceUrl: string;
    name: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    url: string;
    __v: number;
}

export type CharactersData = Character[];

export interface InfoData {
    totalPages: number;
    count: number;
    previousPage: string | null;
    nextPage: string | null;
}

export interface DisneyData {
    info: InfoData;
    data: CharactersData;
}
