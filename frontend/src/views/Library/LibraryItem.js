import React, { Component } from 'react';
import Base64 from 'base-64';
import {
  Card, CardBody, CardFooter, Col, Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label, Button, Nav, NavItem, NavLink, Row, TabContent, TabPane, Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';

//import libraryData from './LibraryData'

class LibraryItem extends Component {

  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this);
    this.state = {
      libraryItem: {},
      activeTab: new Array(4).fill('1'),
      libraryItemServices: [],
      libraryItemCluster: [],
      libraryItemRecipes: [],
      libraryItemContent: [],
      delete: false,
      deleted: false
    }
  }

  confirmDelete() {
    this.setState({delete: !this.state.delete})

  }
  deleteBundle = async event => {
    

    var id=event.target.id;
    var delContent = await fetch('http://localhost:4000/api/generator/delete/bundle_contents/' + id)
    var confirmC = await delContent.json()
    
    var delDeps = await fetch('http://localhost:4000/api/generator/delete/bundle_dependencies/' + id)
    var confirmD = await delDeps.json()


    var delB = await fetch('http://localhost:4000/api/generator/delete/bundle/' +id)
    var confirmB = await delB.json()

    this.setState({delete: !this.state.delete,
      deleted: !this.state.deleted})

  }

  loadData() {
    fetch('http://localhost:4000/api/library/item/' + this.props.match.params.id)
      .then(response => response.json())
      .then(data => {
        this.setState({ libraryItem: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  loadServicesData() {
    fetch('http://localhost:4000/api/library/item/' + this.props.match.params.id + '/dependencies/services')
      .then(response => response.json())
      .then(data => {
        this.setState({ libraryItemServices: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  loadRecipesData() {
    fetch('http://localhost:4000/api/library/item/' + this.props.match.params.id + '/dependencies/recipes')
      .then(response => response.json())
      .then(data => {
        this.setState({ libraryItemRecipes: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  loadClusterData() {
    fetch('http://localhost:4000/api/library/item/' + this.props.match.params.id + '/dependencies/cluster')
      .then(response => response.json())
      .then(data => {
        this.setState({ libraryItemCluster: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  loadBundleContent() {
    fetch('http://localhost:4000/api/library/item/' + this.props.match.params.id + '/contents')
      .then(response => response.json())
      .then(data => {
        this.setState({ libraryItemContent: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  downloadBundle = (e) => {
    fetch('http://localhost:4000/api/library/item/' + e.target.id + '/download')
      .then(response => response.json())
      .catch(err => console.error(this.props.url, err.toString()))
  }

  componentDidMount() {
    this.loadData()
    this.loadServicesData()
    this.loadClusterData()
    this.loadRecipesData()
    this.loadBundleContent()
  }


  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });
  }


  render() {
    // Wait to render until data has been loaded
    if (this.state.libraryItem.name === undefined) {
      return (null)
    }
    else {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs={6} md={4}>
              <Card className="card-accent-success">
                <CardBody >
                <Modal isOpen={this.state.delete} toggle={() => { this.setState({ delete: !this.state.delete }); }}
                       className={'modal-danger ' + this.props.className}>
                  <ModalHeader toggle={() => { this.setState({ delete: !this.state.delete}); }}>Delete Confirmation</ModalHeader>
                  <ModalBody>
                  <h3>Are you sure you want to delete this bundle?</h3>
                  </ModalBody>
                  <ModalFooter>
                  <Button color='secondary' onClick={() => { this.setState({ delete: !this.state.delete}); }}><i className="icon-ban"></i>&nbsp; Cancel</Button>
                  <Button color='danger' id={this.state.libraryItem.id} onClick={this.deleteBundle.bind(this)}><i className="fa fa-remove"></i>&nbsp; Delete</Button>
                   </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.deleted} toggle={() => { this.setState({ deleted: !this.state.deleted }); }}
                       className={'modal-sucess ' + this.props.className}>
                  
                  <ModalBody>
                  <h3>Bundle deleted!</h3>
                  </ModalBody>
                  <ModalFooter>
                  <Button color='success' href="#/library">OK <i className="fa fa-long-arrow-right"></i></Button>
                   </ModalFooter>
                </Modal>
                  <div className="chart-wrapper" align="center" >
                    <p><img alt='' src={this.state.libraryItem.image} height="400px" width="400px" /></p>
                    <h2>{this.state.libraryItem.name}</h2>
                  </div>
                </CardBody>
                <CardFooter className="bg-white">
                  <table width="100%">
                    <tbody>
                      <tr>
                        <td align="center" width="33%">
                          <Button outline color="success" href="#/library">
                            <i className="fa fa-long-arrow-left" ></i>&nbsp;Back
                    </Button>
                        </td>
                        <td align="center">
                          <Button id={this.state.libraryItem.id} color="success" width="33%" href={'http://localhost:4000/api/library/item/' + this.state.libraryItem.id + '/download'}>
                            <i className="fa fa-download"></i>&nbsp;Download
                    </Button>
                        </td>
   
                        <td align="center" width="33%">
                          <Button  id={this.state.libraryItem.id} color="danger" disabled={this.state.libraryItem.id < 2} onClick={this.confirmDelete.bind(this)}>
                            <i className="fa fa-remove"></i>&nbsp;Delete
                    </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </CardFooter>
              </Card>

            </Col>
            <Col xs={12} md={8}>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab[3] === '1'}
                    onClick={() => { this.toggle(3, '1'); }}
                  ><h3>Overview</h3></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab[3] === '2'}
                    onClick={() => { this.toggle(3, '2'); }}
                  ><h3>Blueprint</h3>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab[3] === '3'}
                    onClick={() => { this.toggle(3, '3'); }} ><h3>Yaml</h3>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab[3]}>
                <TabPane tabId="1">
                  <br />
                  <Form>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="name">Bundle ID</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-bullseye"></i></InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" id="bundleID" name="bundleID" value={this.state.libraryItem.id} className="bg-white" disabled/>
                        </InputGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup row>

                      <Col md="3">
                        <Label htmlFor="name">Bundle Name</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-align-justify"></i></InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" id="bundleName" name="recipebundleNameName" value={this.state.libraryItem.name} className="bg-white" disabled/>
                        </InputGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>

                      <Col md="3">
                        <Label htmlFor="description">Bundle Description</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-comment"></i></InputGroupText>
                          </InputGroupAddon>

                          <Input type="textarea" rows="1" id="bundleDescription" name="bundleDescription" value={this.state.libraryItem.description} className="bg-white" disabled/>
                        </InputGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="description">Associated Services</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-cog"></i></InputGroupText>
                          </InputGroupAddon>

                          <Input type="textarea" rows="1" id="bundleServices" name="bundleServices" value={this.state.libraryItemServices.map((service) => {
                            return " " + service.service_description
                          })} className="bg-white" disabled/>
                        </InputGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="name">Associated Stack</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-server"></i></InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" id="bundleCluster" name="bundleCluster" value={this.state.libraryItemCluster.map((cluster) => {
                            return cluster.cluster_type
                          })} className="bg-white" disabled/>
                        </InputGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="name">Stack Version</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-code-fork"></i></InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" id="bundleClusterVersion" name="bundleClusterVersion" value={this.state.libraryItemCluster.map((cluster) => {
                            return cluster.version
                          })} className="bg-white" disabled/>
                        </InputGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="description">Associated Recipes</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-cog"></i></InputGroupText>
                          </InputGroupAddon>

                          <Input type="textarea" rows="1" id="bundleRecipes" name="bundleRecipes" value={this.state.libraryItemRecipes.map((recipe) => {
                            return " " + recipe.recipename + " (" + recipe.recipe_type + ")"
                          })} className="bg-white" disabled/>
                        </InputGroup>
                      </Col>
                    </FormGroup>
                  </Form>

                </TabPane>
                <TabPane tabId="2">
                  <Form>
                    <FormGroup row>
                      <Col>

                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-code"></i></InputGroupText>
                          </InputGroupAddon>
                          <Input type="textarea" rows="20" id="recipeBlueprint" name="recipeBlueprint" value={
                            this.state.libraryItemContent.filter((content) => (content.type.toString() === 'BLUEPRINT'))
                              .map((content) => {
                                return Base64.decode(content.content)
                              })
                          } className="bg-white" disabled/>
                        </InputGroup>

                      </Col>
                    </FormGroup>
                  </Form>
                </TabPane>
                <TabPane tabId="3">
                  <Form>
                    <FormGroup row>
                      <Col>

                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-code"></i></InputGroupText>
                          </InputGroupAddon>
                          <Input type="textarea" rows="20" id="recipeYAML" name="recipeYAML" value={
                            this.state.libraryItemContent.filter((content) => (content.type.toString() === 'YAML'))
                              .map((content) => {
                                return Base64.decode(content.content)
                              })
                          } className="bg-white" disabled/>
                        </InputGroup>

                      </Col>
                    </FormGroup>
                  </Form>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </div>
      )
    }
  }
}

export default LibraryItem;
