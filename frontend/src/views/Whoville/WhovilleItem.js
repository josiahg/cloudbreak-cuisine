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

class WhovilleItem extends Component {

  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.state = {
      libraryItem: {},
      libraryItemStack: [],
      libraryItemInput: [],
      libraryItemRecipes: [],
      libraryItemContent: [],
      activeTab: new Array(4).fill('1'),
      bundleId: '',
      primary: false,
      confirm: false
    }
  }
  togglePrimary() {
    this.setState({
      primary: !this.state.primary,
    });
  }

  loadData() {

    fetch('http://localhost:4000/api/whoville/item/' + this.props.match.params.id)
      .then(response => response.json())
      .then(data => {
        this.setState({
          libraryItem: data,
          bundleId: this.props.match.params.id
        })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  loadStackData() {
    fetch('http://localhost:4000/api/whoville/item/' + this.props.match.params.id + '/dependencies/stack')
      .then(response => response.json())
      .then(data => {
        this.setState({ libraryItemStack: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }
  loadRecipesData() {
    fetch('http://localhost:4000/api/whoville/item/' + this.props.match.params.id + '/dependencies/recipes')
      .then(response => response.json())
      .then(data => {
        this.setState({ libraryItemRecipes: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  loadInputData() {
    fetch('http://localhost:4000/api/whoville/item/' + this.props.match.params.id + '/dependencies/input')
      .then(response => response.json())
      .then(data => {
        this.setState({ libraryItemInput: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }
  loadBundleContent() {
    fetch('http://localhost:4000/api/whoville/item/' + this.props.match.params.id + '/contents')
      .then(response => response.json())
      .then(data => {
        this.setState({ libraryItemContent: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  componentDidMount() {
    this.loadData()
    this.loadStackData()
    this.loadInputData()
    this.loadRecipesData()
    this.loadBundleContent()
  }

  confirmDeploy = (e) => {
    this.setState({
      confirm: !this.state.confirm,
    });

  }


  deployWhoville = (e) => {
    this.setState({
      confirm: !this.state.confirm,
      primary: !this.state.primary
    });
     fetch('http://localhost:4000/api/whoville/deploy/' + e.target.id)
       .then(response => response.json())
       .catch(err => console.error(this.props.url, err.toString()))

   
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
              <Card className="card-accent-primary">
                <CardBody >
                <Modal isOpen={this.state.confirm} toggle={() => { this.setState({ confirm: !this.state.confirm }); }}
                       className={'modal-primary ' + this.props.className}>
                  <ModalHeader toggle={() => { this.setState({ confirm: !this.state.confirm}); }}>Deploy Confirmation</ModalHeader>
                  <ModalBody>
                  <h3>Are you sure you want to deploy this bundle?</h3>
                  </ModalBody>
                  <ModalFooter>
                  <Button color='secondary' onClick={() => { this.setState({ confirm: !this.state.confirm}); }}><i className="icon-ban"></i>&nbsp; Cancel</Button>
                  <Button color='primary' id={this.state.bundleId}  onClick={this.deployWhoville.bind(this)}><i className="fa fa-upload"></i>&nbsp; Deploy</Button>
                   </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
                       className={'modal-primary ' + this.props.className}>
                  {/* <ModalHeader toggle={this.togglePrimary}>Deploying to Cloudbreak</ModalHeader> */}
                  <ModalBody>
                  <h3>{this.state.libraryItem.name} is being deployed ... <i className='fa fa-spinner fa-spin'></i></h3>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" href="#/dashboard">Go to Dashboard <i className="fa fa-long-arrow-right"></i></Button>
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
                          <Button outline color="primary" href="#/whoville">
                            <i className="fa fa-long-arrow-left" ></i>&nbsp;Back
                    </Button>
                        </td>
                        <td align="center" width="33%">
                          <Button id={this.state.bundleId} color="primary" onClick={this.confirmDeploy.bind(this)}>
                            <i className="fa fa-upload"></i>&nbsp;Deploy
                    </Button>
                        </td>
                        <td align="center" width="33%">
                          <Button color="danger" disabled>
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
                        <Label htmlFor="description">Associated Recipes</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-cog"></i></InputGroupText>
                          </InputGroupAddon>

                          <Input type="textarea" rows={this.state.libraryItemRecipes ? "2" : "1"} id="bundleRecipes" name="bundleRecipes" value={this.state.libraryItemRecipes ? this.state.libraryItemRecipes.map((recipe) => {
                            return " " + recipe.dep_desc
                          }) : "N/A"} className="bg-white" disabled/>
                        </InputGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="name">Custom Stack</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-server"></i></InputGroupText>
                          </InputGroupAddon>
                          <Input type="textarea" rows={this.state.libraryItemStack.dep_desc ? "4" : "1"} id="bundleCluster" name="bundleCluster" value={this.state.libraryItemStack.dep_desc ? Base64.decode(this.state.libraryItemStack.dep_desc) : "N/A"} className="bg-white" disabled/>
                        </InputGroup>
                      </Col>
                    </FormGroup>


                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="description">Custom Input</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                          </InputGroupAddon>

                          <Input type="textarea" rows={this.state.libraryItemInput.dep_desc ? "5" : "1"} id="bundleInput" name="bundleInput" value={this.state.libraryItemInput.dep_desc ? Base64.decode(this.state.libraryItemInput.dep_desc) : "N/A"} className="bg-white" disabled/>
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
                                return content.content
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
                                return content.content
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

export default WhovilleItem;
