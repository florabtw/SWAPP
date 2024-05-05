export const collectionNames = {
  films: "🎬 Films",
  people: "🧑 People",
  planets: "🌍 Planets",
  species: "🦣 Species",
  starships: "🚀 Starships",
  vehicles: "🏍️ Vehicles",
} as const;

export type CollectionKey = keyof typeof collectionNames;

export const collectionKeys = Object.keys(collectionNames) as CollectionKey[];

export type RouteParams = {
  collection?: CollectionKey;
  id?: string;
};
