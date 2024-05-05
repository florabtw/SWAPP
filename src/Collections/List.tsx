import { Link, useLoaderData, useLocation } from "react-router-dom";

import { Resource } from "client";
import styled from "styled-components";

export default function List() {
  const items = useLoaderData() as Resource[];
  const location = useLocation();

  return (
    <ListWrapper>
      {items.map((i) => (
        <ListItem key={i.uid}>
          <Link to={`${location.pathname}/${i.uid}`}>
            <span>{"properties" in i ? i.properties.title : i.name}</span>
          </Link>
        </ListItem>
      ))}
    </ListWrapper>
  );
}

const ListWrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  background: #4b596f;
  color: white;
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: 1.25rem;

  a {
    display: block;
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
