import React from "react";
import { Link, useParams } from "react-router-dom";

import client, { Resource } from "client";
import styled, { css } from "styled-components";
import useWindowSize from "hooks/useWindowSize";
import { RouteParams } from "constants";

import Saber from "./Saber";

export default function List() {
  const { collection, id } = useParams<RouteParams>();
  const [items, setItems] = React.useState<Resource[]>([]);
  const windowSize = useWindowSize();

  React.useEffect(() => {
    if (!collection) {
      setItems([]);
      return;
    }

    client[collection].list().then((is) => setItems(is));
  }, [collection]);

  if (!collection) return;
  if (windowSize.width < 800 && id) return;
  /* return empty div so it takes up space before data loads */
  if (!items.length) return <div />;

  return (
    <ListWrapper aria-label={collection}>
      {items.map((i) => {
        const name = "properties" in i ? i.properties.title : i.name;
        return (
          <ListItem key={i.uid} name={name} selected={i.uid === id}>
            <Link to={`/${collection}/${i.uid}`}>
              <span>{name}</span>
            </Link>
          </ListItem>
        );
      })}
    </ListWrapper>
  );
}

export const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  list-style: none;
  margin: 0 auto;
  min-width: 300px;
  max-width: 600px;
  padding: 0;
`;

interface ListItemProps {
  className?: string;
  children: React.ReactNode;
  name?: string;
  selected?: boolean;
}

export function ListItem({
  className,
  children,
  name,
  selected,
}: ListItemProps) {
  return (
    <ListItemWrapper
      className={className}
      selected={selected}
      aria-current={selected && "page"}
    >
      {children}
      {selected && (
        <SelectIcon aria-hidden="true">
          <Saber name={name} />
        </SelectIcon>
      )}
    </ListItemWrapper>
  );
}

const SelectIcon = styled.div`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  height: 2rem;

  svg {
    height: 100%;
    transform: rotate(25deg);
  }
`;

const ListItemWrapper = styled.li<{ selected?: boolean }>`
  background: #4b596f;
  border-radius: 0.5rem;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.5;
  overflow: hidden;
  position: relative;

  ${(props) => props.selected && selectedStyles}

  a {
    display: block;
    padding: 1rem 2rem;
    width: 100%;
  }

  &:hover {
    transform: translateX(-10px);
  }
`;

const selectedStyles = css`
  border: 2px solid white;
`;
