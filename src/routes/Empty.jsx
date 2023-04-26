import React from "react";
import { Helmet } from "react-helmet-async";
import Card from "react-bootstrap/Card";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Empty = () => {
  return (
    <Container>
      <Helmet>
        <title>Gallery</title>
      </Helmet>
      <Row>
        <Col xg={12}>
          <Card style={{ marginTop: 90, padding: 20 }}> </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Empty;
