import "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { collectionKeys, CollectionKey, collectionNames } from "constants";

export default function All() {
  return (
    <Wrapper>
      {collectionKeys.map((name) => (
        <Collection key={name} collection={name} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

interface CollectionProps {
  collection: CollectionKey;
}

function Collection({ collection }: CollectionProps) {
  return (
    <ListItem>
      <Link to={`/${collection}`}>{collectionNames[collection]}</Link>
    </ListItem>
  );
}

const ListItem = styled.li`
  background: #668ebb;
  color: white;
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: 1.5rem;
  letter-spacing: 0.125rem;
  text-transform: uppercase;

  a {
    display: block;
    cursor: pointer;
    padding: 1rem;
    width: 100%;
  }

  &:hover {
    transform: translateX(10px);
  }

  & + & {
    margin-top: 1.5rem;
  }
`;
