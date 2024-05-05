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

export type Resource =
  | { uid: string; properties: { title: string } } /* Films */
  | { uid: string; name: string; url: string }; /* Not Films */

type ListResponse =
  | { message: string; results: Resource[] }
  | { message: string; result: Resource[] };

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

/* Also store detail responses in localstorage. We really want to minimize
 * requests to SWAPI. */
async function getByUrl(url: string) {
  const stored = storage.get(url);
  if (stored) return stored;

  const res = await fetch(url);
  const body = await res.json();
  const data = body.result;

  storage.set(url, data);

  return data;
}

const toUrl = (path: string) => `https://swapi.tech/api/${path}`;

const films = (() => {
  const fetch = (id: string) => getByUrl(toUrl(`films/${id}`));
  const list = listAll<Resource[]>({ path: "films" });

  return { fetch, list };
})();

const planets = (() => {
  const fetch = (id: string) => getByUrl(toUrl(`planets/${id}`));
  const list = listAll<Resource[]>({ path: "planets" });

  return { fetch, list };
})();

const people = (() => {
  const fetch = (id: string) => getByUrl(toUrl(`people/${id}`));
  const list = listAll<Resource[]>({ path: "people" });

  return { fetch, list };
})();

const species = (() => {
  const fetch = (id: string) => getByUrl(toUrl(`species/${id}`));
  const list = listAll<Resource[]>({ path: "species" });

  return { fetch, list };
})();

const starships = (() => {
  const fetch = (id: string) => getByUrl(toUrl(`starships/${id}`));
  const list = listAll<Resource[]>({ path: "starships" });

  return { fetch, list };
})();

const vehicles = (() => {
  const fetch = (id: string) => getByUrl(toUrl(`vehicles/${id}`));
  const list = listAll<Resource[]>({ path: "vehicles" });

  return { fetch, list };
})();

const client = {
  getByUrl,

  films,
  planets,
  people,
  species,
  starships,
  vehicles,
} as const;

export default client;
