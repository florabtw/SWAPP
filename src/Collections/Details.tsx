import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import { CollectionKey, RouteParams } from "constants";
import client from "client";
import React from "react";

type DetailData = {
  properties: Record<string, string | string[]>;
};

const hideKeys = ["url", "created", "edited"];

export default function Details() {
  const [data, setData] = React.useState<DetailData | null>(null);
  const { collection, id } = useParams<RouteParams>();

  React.useEffect(() => {
    if (!collection || !id) {
      setData(null);
      return;
    }

    client[collection].fetch(id).then((d) => setData(d));
  }, [collection, id]);

  if (!id) return;
  /* return empty div so it takes up space before data loads */
  if (!data) return <div />;

  const keys = Object.keys(data.properties)
    .filter((k) => !hideKeys.includes(k))
    .sort();

  return (
    <ListWrapper>
      {keys.map((prop: string) => (
        <DetailItem key={prop} prop={prop} value={data.properties[prop]} />
      ))}
    </ListWrapper>
  );
}

const resourceReferences: Record<string, CollectionKey> = {
  characters: "people",
  films: "films",
  homeworld: "planets",
  people: "people",
  pilots: "people",
  planets: "planets",
  species: "species",
  starships: "starships",
  vehicles: "vehicles",
};

interface DetailItemProps {
  prop: string;
  value: string | string[];
}

function DetailItem({ prop, value }: DetailItemProps) {
  // hacky, but functional. would prefer a key:value map for more customization
  const title = prop.replace(/_/g, " ");

  return (
    <ListItem>
      <ListTitle>{title}</ListTitle>
      <ListValue>
        {prop in resourceReferences ? (
          <Resources collection={resourceReferences[prop]} value={value} />
        ) : (
          value
        )}
      </ListValue>
    </ListItem>
  );
}

const ListWrapper = styled.ul`
  color: white;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  background: #ac866c;
  border-radius: 0.5rem;
  color: black;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
  padding: 1rem;
`;

const ListTitle = styled.div`
  font-weight: bold;
  text-align: center;
  text-transform: capitalize;
  margin-bottom: 0.5rem;
`;

const ListValue = styled.div`
  text-align: center;

  a {
    text-decoration: underline;
  }
`;

interface ResourceListProps {
  collection: CollectionKey;
  value: string | string[];
}

/* Take a list of SWAPI urls and render them as links with descriptive text */
function Resources({ collection, value }: ResourceListProps) {
  const values = Array.isArray(value) ? value : [value];

  /* Is there a better way to add commas? Maybe.
   * Do I know it right now? No */
  return values
    .flatMap((url) => [
      <Resource collection={collection} key={url} url={url} />,
      ", ",
    ])
    .slice(0, -1);
}

function Resource({
  collection,
  url,
}: {
  collection: CollectionKey;
  url: string;
}) {
  const [data, setData] = React.useState<Record<string, any>>();

  React.useEffect(() => {
    client.getByUrl(url).then((result) => setData(result));
  }, []);

  /* This causes a bit of visual noise, but I'm not that upset about it given
   * the tradeoffs. */
  if (!data) {
    const path = url.split("/").slice(-2).join("/");
    return <Link to={"/" + path}>{path}</Link>;
  }

  const title =
    collection === "films" ? data.properties.title : data.properties.name;

  return <Link to={`/${collection}/${data.uid}`}>{title}</Link>;
}
