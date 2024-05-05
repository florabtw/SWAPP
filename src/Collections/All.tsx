import "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import useWindowSize from "hooks/useWindowSize";
import { ListItem, ListWrapper } from "./List";
import { collectionKeys, collectionNames, RouteParams } from "constants";

export default function All() {
  const windowSize = useWindowSize();
  const { collection, id } = useParams<RouteParams>();

  if (windowSize.width < 800 && collection) return;
  if (windowSize.width < 1200 && id) return;

  return (
    <ListWrapper>
      {collectionKeys.map((name) => (
        <CollectionItem key={name} selected={name === collection}>
          <Link to={`/${name}`}>{collectionNames[name]}</Link>
        </CollectionItem>
      ))}
    </ListWrapper>
  );
}

const CollectionItem = styled(ListItem)`
  background: #547497;
  letter-spacing: 0.125rem;
  text-transform: uppercase;
`;
