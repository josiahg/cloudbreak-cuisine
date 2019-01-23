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

import servicesListData from './ServicesListData'

class AddRecipe extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      distinctServices: [],
      distinctClusters: [],
      distinctVersions: []
    };
  }

  loadDistinctServices() {
    fetch('http://localhost:4000/api/services/distinctnames')
      .then(response => response.json())
      .then(data => {
        this.setState({ distinctServices: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  loadDistinctClusters() {
    fetch('http://localhost:4000/api/clusters/distincttypes')
      .then(response => response.json())
      .then(data => {
        this.setState({ distinctClusters: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  loadDistinctVersions() {
    fetch('http://localhost:4000/api/clusters/distinctversions')
      .then(response => response.json())
      .then(data => {
        this.setState({ distinctVersions: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
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
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText><i className="fa fa-link"></i></InputGroupText>
            </InputGroupAddon>
            <Input type="text" id="recipeURL" name="recipeURL" placeholder="Enter URL" />
          </InputGroup>
        </TabPane>
        <TabPane tabId="3">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText><i className="fa fa-code"></i></InputGroupText>
            </InputGroupAddon>
            <Input type="textarea" id="recipeCode" name="recipeCode" placeholder="// Enter recipe code" />
          </InputGroup>
        </TabPane>
      </>
    );
  }




  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    const serviceList = servicesListData.filter((service) => ((service.name)))

    return (

      <div className="animated fadeIn align-items-center">

        <Row>
          <Col>
            <Card className="border-success">
              <CardHeader className="text-white bg-success">
                <h2>Add Recipe</h2>
              </CardHeader>
              <CardBody>
                <Form>


                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="name">Recipe ID</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="fa fa-bullseye"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="recipeID" name="recipeID" value='24' disabled />
                      </InputGroup>
                    </Col>
                  </FormGroup>

                  <FormGroup row>

                    <Col md="3">
                      <Label htmlFor="name">Recipe Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="fa fa-align-justify"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="recipeName" name="recipeName" placeholder="Enter recipe name" autoComplete="name" />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>

                    <Col md="3">
                      <Label htmlFor="description">Recipe Description</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="fa fa-comment"></i></InputGroupText>
                        </InputGroupAddon>

                        <Input type="textarea" id="recipeDescription" name="recipeDescription" placeholder="Enter recipe description" />
                      </InputGroup>
                    </Col>
                  </FormGroup>

                  <FormGroup row>

                    <Col md="3">
                      <Label htmlFor="name">Recipe Type</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="fa fa-clock-o"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input type="select" name="recipeType" id="recipeType">
                          <option>Pre Ambari Start</option>
                          <option>Post Ambari Start</option>
                          <option>Post Cluster Install</option>
                          <option>Pre Termination</option>
                        </Input>
                      </InputGroup>
                    </Col>
                  </FormGroup>


                  <FormGroup row>

                    <Col md="3">
                      <Label htmlFor="name">Associated Service</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="fa fa-cog"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input type="select" name="service" id="service">
                          {serviceList.map((service) =>
                            <option>{service.name}</option>
                          )}
                        </Input>
                      </InputGroup>
                    </Col>
                  </FormGroup>

                  <FormGroup row>

                    <Col md="3">
                      <Label htmlFor="name">Associated Cluster</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="fa fa-server"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input type="select" name="clusterType" id="clusterType">
                          <option>HDP</option>
                          <option>HDF</option>
                          <option>HDP + HDF</option>
                        </Input>
                      </InputGroup>
                    </Col>
                  </FormGroup>



                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="content">Recipe Content</Label>
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
                      <Button size="lg" outline color="primary" href="#/recipes">
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

export default AddRecipe;