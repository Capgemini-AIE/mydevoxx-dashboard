/**
 * Created by dan on 05/04/2017.
 */
/**
 * Created by dan on 04/04/2017.
 */
import React, { Component } from 'react';
import styled from 'styled-components';
import {Col, Row} from 'react-flexbox-grid';

import DefaultImg from '../images/default-profile.png';

/**
 *  Styled Components
 */

const ReviewText = styled.p`
  font-family: Helvetica;
  font-weight: 500;
  font-size: 1em;
  margin: 0;
  opacity: 0.6;
`;

const Name = styled.h3`
  font-family: Helvetica;
  font-weight: 500;
  font-size: 1.25em;
  margin: 0;
  opacity: 0.6;
`;

const ProfileImg = styled.img`
  border-radius: 50%;
  height: 30px;
  width: 30px;
  border: solid white 3px;
`;

class Review extends Component {
  render() {
    try {
      let {image, name, comment} = this.props.review;
      return (
        <Row start="xs">
          <Col>
            <ProfileImg src={ image } />
          </Col>
          <Col xs>
            <Name>{name}</Name>
            <ReviewText>{comment}</ReviewText>
          </Col>
        </Row>
      );
    } catch (error) {
      return (<Row></Row>)
    }
  }
}

export default Review;
