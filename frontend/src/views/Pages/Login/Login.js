import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Login extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container className="mw-100 p-0 border-0 ">
          <Row >
            <Col>
              <CardGroup>
                <Card className="text-white bg-img py-5 d-md-down-none border-0 rounded-0" width="30%">
                  <CardBody className="text-center">

                    <div border-left="1px solid white">
                      <img alt=''src="../../assets/img/cuisine/hwx_logo_white.png" height="232px" width="300px" />

                      <span ><img alt='' className="img-border-left" src="../../assets/img/brand/long_logo.png" height="75px" width="340px" border-left="1px solid white" /></span>
                    </div>

                  </CardBody>
                </Card>
                <Card className="text-white bg-gray-700 py-5 d-md-down-none border-0 rounded-0" width="70%">
                  <CardBody>
                    <Form>
                      <h4>Sign In</h4>

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="success" className="px-4" href="#/dashboard">Login</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>

              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
