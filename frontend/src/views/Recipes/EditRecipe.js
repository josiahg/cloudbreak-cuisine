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
  Nav, NavItem, NavLink, TabContent, TabPane
} from 'reactstrap';
import recipesData from './RecipesData'
import servicesListData from './ServicesListData'

class AddRecipe extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('3'),
      distinctServices: [],
      distinctClusters: [],
      distinctVersions: [],
      recipesDetailedData: [],
      serviceid: '',
      clusterid: '',
      recipeid: '',
      recipename: '',
      recipedescription: '',
      addon_type: '',
      recipe_type: '',
      content: '',
      service_description: '',
      cluster_type: '',
      cluster_version: ''
    };
  }

  saveRecipe = (e) => {
    fetch('http://localhost:4000/api/recipes/checkcompatibility', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cluster_type: this.state.cluster_type,
        cluster_version: this.state.cluster_version,
        service_description: this.state.service_description
      })
    }).then(response => response.json())
    .then(data => {
      
       if(data.serviceid) {
        alert('Saving...');
       } else {
        alert('Incompatible service/cluster/version combination!' )
       }
    })
    .catch(err => console.error(this.props.url, err.toString()) )

    
    
  }


  handleContentChange = (e) => {
    this.setState({ content: Base64.encode(e.target.value) });
  }

  handleNameChange = (e) => {
    this.setState({ recipename: e.target.value });
  }

  handleDescriptionChange = (e) => {
    this.setState({ recipedescription: e.target.value });
  }

  handleRecipeTypeChange = (e) => {
    this.setState({ recipe_type: e.target.value });
  }
  handleServiceChange = (e) => {
    this.setState({ service_description: e.target.value });
  }
  handleClusterTypeChange = (e) => {
    this.setState({ cluster_type: e.target.value });
  }

  handleClusterVersionChange = (e) => {
    this.setState({ cluster_version: e.target.value });
  }


  loadRecipeData() {
    fetch('http://localhost:4000/api/recipes/'+this.props.match.params.id+'/details')
      .then(response => response.json())
      .then(data => {
        this.setState({ recipeid: data.id,
                        serviceId: data.serviceid,
                        recipename: data.recipename,
                        recipedescription: data.recipedescription,
                        addon_type: data.addon_type,
                        recipe_type: data.recipe_type,
                        content: data.content,
                        service_description: data.service_description,
                        cluster_type: data.cluster_type,
                        cluster_version: data.version

                                })
      })
      .catch(err => console.error(this.props.url, err.toString()))
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

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });
  }


  componentDidMount() {
    this.loadDistinctServices()
    this.loadDistinctClusters()
    this.loadDistinctVersions()
    this.loadRecipeData()
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    const serviceList = this.state.distinctServices.filter((service) => ((service.service_description)))
    const clusterList = this.state.distinctClusters.filter((cluster) => ((cluster.cluster_type)))
    const versionList = this.state.distinctVersions.filter((version) => ((version.version)))


    return (

      <div className="animated fadeIn align-items-center">

        <Row>
          <Col>
            <Card className="border-warning">
              <CardHeader className="text-white bg-warning">
                <h2>Edit Recipe</h2>
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
                          <Input type="text" id="recipeID" name="recipeID" value={this.state.recipeid} disabled />
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
                          <Input type="text" id="recipeName" name="recipeName" value={this.state.recipename} onChange={this.handleNameChange}/>
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

                          <Input type="textarea" id="recipeDescription" name="recipeDescription" value={this.state.recipedescription} onChange={this.handleDescriptionChange}/>
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
                          <Input type="select" name="recipeType" id="recipeType" onChange={this.handleRecipeTypeChange}>
                            <option selected={this.state.recipe_type.toString() === 'Pre Ambari Start'}>Pre Ambari Start</option>
                            <option selected={this.state.recipe_type.toString() === 'Post Ambari Start'}>Post Ambari Start</option>
                            <option selected={this.state.recipe_type.toString() === 'Post Cluster Install'}>Post Cluster Install</option>
                            <option selected={this.state.recipe_type.toString() === 'Pre Termination'}>Pre Termination</option>
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
                          <Input type="select" name="service" id="service" onChange={this.handleServiceChange}>
                            {serviceList.map((service) =>
                              <option selected={this.state.service_description.toString() === service.service_description.toString()}>{service.service_description}</option>
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
                          <Input type="select" name="clusterType" id="clusterType" onChange={this.handleClusterTypeChange}>
                          {clusterList.map((cluster) =>
                              <option selected={this.state.cluster_type.toString() === cluster.cluster_type.toString()}>{cluster.cluster_type}</option>
                            )}
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
                          <Input type="select" name="clusterVersion" id="clusterVersion" onChange={this.handleClusterVersionChange}>
                          {versionList.map((version) =>
                              <option selected={this.state.cluster_version.toString() === version.version.toString()}>{version.version}</option>
                            )}
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
                        <TabPane tabId="1">
          <Button size="lg" color="success" disabled>
            <i className="fa fa-upload"></i>&nbsp;Upload
                                    </Button>
        </TabPane>
        <TabPane tabId="2">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText ><i className="fa fa-link"></i></InputGroupText>
            </InputGroupAddon>
            <Input type="text" id="recipeURL" name="recipeURL" placeholder="Enter URL" disabled />
          </InputGroup>
        </TabPane>
        <TabPane tabId="3">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText><i className="fa fa-code"></i></InputGroupText>
            </InputGroupAddon>
            <Input type="textarea" rows="20" id="recipeCode" name="recipeCode" value={Base64.decode(this.state.content)} onChange={this.handleContentChange}/>
          </InputGroup>
        </TabPane>
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
                      <Button size="lg" color="primary" onClick={this.saveRecipe.bind(this)}>
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