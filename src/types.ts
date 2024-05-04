interface Film {
  uid: string;
  properties: {
    title: string;
    episode_id: string;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    species: string[];
    starships: string[];
    vehicles: string[];
    characters: string[];
    planets: string[];
    url: string;
  };
}
