import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkText = styled.li`
  font-family: Helvetica;
  font-weight: 500;
  display: inline-block;
  font-size: 1.5em;
  padding-left: 0.25em;
  &:after {
    content: " - ";
  }
  &:last-child:after {
    content: "";
  }
`;

export const InlineList = styled.ul`
  opacity: 1;
  padding: 0;
  padding-left: 0.5em;
  list-style: none;
  & * {
    color: #fff;
  }
`;

export const NavItems = [
  {
    link: "/",
    name: "Home"
  },
  {
    link: "/report",
    name: "Report"
  }
];

class NavButtons extends Component {
  render() {
    return (
      <InlineList className="desktopOnlyInline">
        {NavItems.map(item => (
          <LinkText key={item.name}>
            <Link to={item.link}>
              {item.name}
            </Link>
          </LinkText>
        ))}
      </InlineList>
    );
  }
}

export default NavButtons;
