import React, { Component } from 'react';
import {
  Card, CardBody, CardHeader, Row, Col, Button, Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Nav, NavItem, NavLink, TabContent, TabPane
} from 'reactstrap';

class AddZeppelinNote extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
    };
  }

  lorem() {
    return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });
  }

  tabPane() {
    return (
      <>
        <TabPane tabId="1">
          <Button size="lg" color="success">
            <i className="fa fa-upload"></i>&nbsp;Upload
                                    </Button>
        </TabPane>
        <TabPane tabId="2">
          <Input type="text" id="recipeURL" name="recipeURL" placeholder="Enter URL" />
        </TabPane>
        <TabPane tabId="3">
          <Input type="textarea" id="recipeCode" name="recipeCode" placeholder="// Enter Zeppelin Note" />
        </TabPane>
      </>
    );
  }




  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    //const serviceList = servicesListData.filter((service) => ((service.name)))

    return (

      <div className="animated fadeIn align-items-center">

        <Row>
          <Col>
            <Card className="border-success">
              <CardHeader className="text-white bg-success">
                <h2>Add Zeppelin Note</h2>
              </CardHeader>
              <CardBody>
                <Form>
                  <FormGroup row>

                    <Col md="3">
                      <Label htmlFor="name">Zeppelin Note Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="fa fa-folder"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="recipeName" name="recipeName" placeholder="Enter Zeppelin Note name" autoComplete="name" />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>

                    <Col md="3">
                      <Label htmlFor="description">Zeppelin Note Description</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="fa fa-align-justify"></i></InputGroupText>
                        </InputGroupAddon>

                        <Input type="textarea" id="recipeDescription" name="recipeDescription" placeholder="Enter Zeppelin Note description" />
                      </InputGroup>
                    </Col>
                  </FormGroup>



                  <FormGroup row>

                    <Col md="3">
                      <Label htmlFor="name">Associated Cluster</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <InputGroup>
                        <Input type="select" name="clusterType" id="clusterType">
                          <option>HDP</option>
                          <option>HDP + HDF</option>
                        </Input>
                      </InputGroup>
                    </Col>
                  </FormGroup>



                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="content">Zeppelin Note</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Nav tabs>
                        <NavItem>
                          <NavLink
                            active={this.state.activeTab[0] === '1'}
                            onClick={() => { this.toggle(0, '1'); }}
                          >
                            File
                </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            active={this.state.activeTab[0] === '2'}
                            onClick={() => { this.toggle(0, '2'); }}
                          >
                            URL
                </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            active={this.state.activeTab[0] === '3'}
                            onClick={() => { this.toggle(0, '3'); }}
                          >
                            Type
                </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={this.state.activeTab[0]}>
                        {this.tabPane()}
                      </TabContent>

                    </Col>
                  </FormGroup>
                  <FormGroup row>

                    <Col md="3">
                      &nbsp;
                      </Col>
                    <Col xs="12" md="9" align="right">
                      <Button size="lg" outline color="primary" href="#/zeppelinnotes">
                        <i className="fa fa-long-arrow-left"></i> Back
                            </Button>
                      &nbsp;
                      <Button size="lg" color="primary">
                        <i className="fa fa-save"></i>&nbsp;Save
                                    </Button>
                    </Col>
                  </FormGroup>





                </Form>
              </CardBody>
            </Card>


          </Col>
        </Row>

      </div>
    )
  }
}

export default AddZeppelinNote;