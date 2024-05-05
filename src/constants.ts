export const collectionKeys = [
  "films",
  "people",
  "planets",
  "species",
  "starships",
  "vehicles",
] as const;

export type CollectionKey = (typeof collectionKeys)[number];

export type RouteParams = {
  collection?: CollectionKey;
  id?: string;
};
