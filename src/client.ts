import { CollectionKey } from "constants";

/* Keep data in localStorage. Refresh if expired (default: 1 hour). This behaves
 * similar to react-swapi: https://www.npmjs.com/package/react-swapi */
const storage = (() => {
  const oneHour = 60 * 60 * 1000;

  const get = <V>(key: string) => {
    const stringified = localStorage.getItem(key);

    if (!stringified) return null;

    const { expire, value } = JSON.parse(stringified);

    if (Date.now() > expire) return null;
    else return value as V;
  };

  const set = <V>(key: string, value: V) => {
    const expire = Date.now() + oneHour;
    localStorage.setItem(key, JSON.stringify({ expire, value }));
  };

  return { get, set };
})();

export interface Resource {
  uid: string;
  name: string;
  url: string;
}

type ListResponse =
  | { message: string; results: Resource[] }
  | { message: string; result: Film[] };

/* There are currently fewer than 100 of each resource, so just fetch them
 * all, and put them in localstorage. This prevents the rate slowing:
 * https://swapi.tech/documentation#rate-slowing
 *
 * In a real-world app, I would get the limit dynamically or create a thin api
 * wrapper, rather than hardcoding limit=100.
 * */
const listAll =
  <V>({ path }: { path: CollectionKey }) =>
  async (): Promise<V> => {
    const stored = storage.get(path);
    if (stored) return stored as V;

    const url = `https://swapi.tech/api/${path}?page=1&limit=100`;
    const res = await fetch(url);
    const body = (await res.json()) as ListResponse;
    const items = "results" in body ? body.results : body.result;

    storage.set(path, items);

    return items as V;
  };

const films = (() => {
  const list = listAll<Film[]>({ path: "films" });

  return { list };
})();

const planets = (() => {
  const list = listAll<Resource[]>({ path: "planets" });

  return { list };
})();

const people = (() => {
  const list = listAll<Resource[]>({ path: "people" });

  return { list };
})();

const species = (() => {
  const list = listAll<Resource[]>({ path: "species" });

  return { list };
})();

const starships = (() => {
  const list = listAll<Resource[]>({ path: "starships" });

  return { list };
})();

const vehicles = (() => {
  const list = listAll<Resource[]>({ path: "vehicles" });

  return { list };
})();

const client = {
  films,
  planets,
  people,
  species,
  starships,
  vehicles,
} as const;

export default client;
