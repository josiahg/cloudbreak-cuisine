import React, { Component } from 'react';
import Base64 from 'base-64';
import {
  Card, CardBody, CardHeader, Row, Col, Button, Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  TabPane, Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';

class Recipe extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      recipesData: [],
      servicesData: [],
      clustersData: [],
      modal: false
    };
  }


  loadRecipeData() {
    fetch('http://localhost:4000/api/recipes')
      .then(response => response.json())
      .then(data => {
        this.setState({ recipesData: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  loadServiceData() {
    fetch('http://localhost:4000/api/services')
      .then(response => response.json())
      .then(data => {
        this.setState({ servicesData: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  loadClusterData() {
    fetch('http://localhost:4000/api/clusters')
      .then(response => response.json())
      .then(data => {
        this.setState({ clustersData: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  componentDidMount() {
    this.loadRecipeData()
    this.loadServiceData()
    this.loadClusterData()
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
          <Input type="textarea" id="recipeCode" name="recipeCode" placeholder="// Enter recipe code" />
        </TabPane>
      </>
    );
  }




  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    //const serviceList = this.state.servicesData.filter((service) => ((service.service_description)))
    const recipeList = this.state.recipesData.filter((recipe) => (recipe.id.toString() === this.props.match.params.id));



    return (

      <div className="animated fadeIn align-items-center">

        <Row>
          <Col>
            <Card className="border-primary">
            <Modal isOpen={this.state.modal} toggle={() => { this.setState({ modal: !this.state.modal }); }}
                       className={'modal-warning ' + this.props.className}>
                  <ModalHeader toggle={() => { this.setState({ modal: !this.state.modal}); }}>Warning</ModalHeader>
                  <ModalBody>
                  <h3>Incompatible service/cluster/version combination!</h3>
                  </ModalBody>
                  <ModalFooter>
                  <Button color='secondary' onClick={() => { this.setState({ modal: !this.state.modal}); }}><i className="icon-ban"></i>&nbsp; Cancel</Button>
                   </ModalFooter>
                </Modal>
              <CardHeader className="text-white bg-primary">
                <h2>View Recipe</h2>
              </CardHeader>
              {recipeList.map((recipe) =>
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
                          <Input type="text" id="recipeID" name="recipeID" value={recipe.id} className="bg-white" disabled/>
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
                          <Input type="text" id="recipeName" name="recipeName" value={recipe.recipename} autoComplete="name" className="bg-white" disabled/>
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

                          <Input type="textarea" id="recipeDescription" name="recipeDescription" value={recipe.recipedescription} className="bg-white" disabled/>
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
                          <Input type="select" name="recipeType" id="recipeType" className="bg-white" disabled>
                            <option selected={recipe.recipe_type.toString() === 'Pre Ambari Start'}>Pre Ambari Start</option>
                            <option selected={recipe.recipe_type.toString() === 'Post Ambari Start'}>Post Ambari Start</option>
                            <option selected={recipe.recipe_type.toString() === 'Post Cluster Install'}>Post Cluster Install</option>
                            <option selected={recipe.recipe_type.toString() === 'Pre Termination'}>Pre Termination</option>
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
                          <Input type="select" name="service" id="service" className="bg-white" disabled>

                            <option>{this.state.servicesData.filter((service) => (service.id === recipe.serviceid)).map((service) => {
                              return service.service_description
                            }
                            )}</option>
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
                          <Input type="select" name="clusterType" id="clusterType" className="bg-white" disabled>
                            <option>{this.state.servicesData.filter((service) => (service.id === recipe.serviceid)).map((service) => {
                              return this.state.clustersData.filter((cluster) => (cluster.id === service.cluster_id)).map((cluster) => {
                                return cluster.cluster_type
                              }
                              )
                            }
                            )}</option>
                          </Input>
                        </InputGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup row>

                      <Col md="3">
                        <Label htmlFor="name">Cluster Version</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-code-fork"></i></InputGroupText>
                          </InputGroupAddon>
                          <Input type="select" name="clusterType" id="clusterType" className="bg-white" disabled>
                            <option>{this.state.servicesData.filter((service) => (service.id === recipe.serviceid)).map((service) => {
                              return this.state.clustersData.filter((cluster) => (cluster.id === service.cluster_id)).map((cluster) => {
                                return cluster.version
                              }
                              )
                            }
                            )}</option>
                          </Input>
                        </InputGroup>
                      </Col>
                    </FormGroup>



                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="content">Recipe Content</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-code"></i></InputGroupText>
                          </InputGroupAddon>
                          <Input type="textarea" rows="20" id="recipeContent" name="recipeContent" value={Base64.decode(recipe.content)}  className="bg-white" disabled/>
                        </InputGroup>

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
                      <Button size="lg" color="warning" href={"#/editrecipes/" + recipe.id} disabled={recipe.id < 14}>
                          <i className="icon-note"></i>&nbsp;Edit
                                    </Button>
                                    &nbsp;
                                    <Button size="lg" color="danger" disabled>
                          <i className="fa fa-remove"></i>&nbsp;Edit
                                    </Button>

                      </Col>
                    </FormGroup>





                  </Form>
                </CardBody>
              )}
            </Card>


          </Col>
        </Row>

      </div>
    )
  }
}

export default Recipe;