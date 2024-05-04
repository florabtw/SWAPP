import "react";

import styled from "styled-components";

const names = {
  films: "🎬 Films",
  people: "🧑 People",
  vehicles: "🚀 Vehicles",
} as const;

type CollectionKey = keyof typeof names;

const collectionKeys = Object.keys(names) as CollectionKey[];

interface AllProps {
  onSelect: (name: CollectionKey) => void;
}

export default function All({ onSelect }: AllProps) {
  return (
    <Wrapper>
      {collectionKeys.map((name) => (
        <Collection collection={name} onClick={onSelect} />
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
  onClick: (name: CollectionKey) => void;
}

function Collection({ collection, onClick }: CollectionProps) {
  return (
    <ListItem>
      <Anchor onClick={() => onClick(collection)}>{names[collection]}</Anchor>
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

  &:hover {
    transform: translateX(10px);
  }

  & + & {
    margin-top: 1.5rem;
  }
`;

const Anchor = styled.a`
  display: block;
  cursor: pointer;
  padding: 1rem;
  width: 100%;
`;
