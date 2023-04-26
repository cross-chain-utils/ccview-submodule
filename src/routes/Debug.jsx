import React from "react";
import { Helmet } from "react-helmet-async";
import QueueTestButton from "../components/HostLaneQueue/QueueTestButton";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import QData from "../components/HostLaneQueue/QData";

import QDataBadlist from "../components/QDataViews/QDataBadlist";

const Debug = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Debug</title>
      </Helmet>
      <Container>
        <Row>
          <Col xs={3}></Col>
          <Col xs={6}>
            <Card style={{ marginTop: 90, padding: 20 }}>
              <Stack gap={3}>
                <QueueTestButton />
                <a href={process.env.SESSION_SERVER_SOFT_LOGOUT}>Soft Logout</a>
                <QData
                  url={`${
                    process.env.API_ROOT
                  }/proxy_api/wax_lists?pubkey=${encodeURIComponent(
                    process.env.CLIENT_PUBKEY
                  )}`}
                >
                  <QDataBadlist />
                </QData>
              </Stack>
            </Card>
            <Col xs={3}></Col>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Debug;
