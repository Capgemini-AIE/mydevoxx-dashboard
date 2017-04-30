/**
 * Created by dcotton on 30/04/2017.
 */
import React, { Component } from "react";
import styled from "styled-components";
import Card from "./Card";
import { CommaList, CommaListItem } from "./CommaList";

const Container = styled(Card)`
  padding: 0.5em 1em;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
  max-width: 520px;
  padding-right: 0.5em;
  flex-direction: column;
`;

const Header = styled.h2`
  text-align: left;
  font-size: 2em;
  font-family: helvetica;
  margin-left: 0;
  padding-left: 0;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  color: #000;
`;

const Session = styled.div`
  display: flex;
  flex-direction: row;
  & > div > h3 {
    color: #000;
    font-size: 2em;
    margin-bottom: 0;
  }
  & > div > h4 {
    color: #ff9e19;
    margin-top: 5px;
    margin-bottom: 0;
  }
  & > div > ul {
    color: #000;
    opacity: 0.5;
    margin-top: 0;
  }
  & > div {
    padding-bottom: 10px;
  }
  & > img {
    color: #000;
    text-align: right;
    margin-top: 10px;
    height: 75px;
  }
  margin-bottom: 0.75em;
  border-bottom: solid 1px #BDBDBD;
`;

class SessionsAttended extends Component {
  render() {
    return (
      <Container id="attended-sessions">
        <Header>My Sessions</Header>
        {this.props.sessions.map(session => (
          <Session key={session.title}>
            <div>
              <h3>{session.title}</h3>
              <h4>Speakers: </h4>
              <CommaList>
                {session.speakers.map(speaker => (
                  <CommaListItem key={speaker.name}>
                    {speaker.name}
                  </CommaListItem>
                ))}
              </CommaList>
            </div>
            <img
              alt={session.topTracks[0]}
              src="https://ignite.apache.org/images/java.png"
            />
          </Session>
        ))}
      </Container>
    );
  }
}

export default SessionsAttended;
