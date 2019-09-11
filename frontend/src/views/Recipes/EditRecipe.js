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
  Nav, NavItem, NavLink, TabContent, TabPane, Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';
import recipesData from './RecipesData'
import servicesListData from './ServicesListData'

var hn = window.location.hostname

class EditRecipe extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('3'),
      distinctServices: [],
      distinctClusters: [],
      distinctVersions: [],
      recipesDetailedData: [],
      recipeNodesData: [],
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
      cluster_version: '',
      modal: false,
      confirm: false,
      confirmed: false,
      mandatory: '',
      display: '',
      delete: false,
      deleted: false,
      appliesToMaster: false,
      appliesToWorker: false,
      appliesToCompute: false,
      appliesToCDSW: false
    };
  }

  containsNode(nodeList, nodeType) {
    var containNodeType = false;
    for(var key in nodeList) {
      if(nodeList[key].node_type.toString() === nodeType.toString()) containNodeType= true;
    }
    return containNodeType;
  }

  deleteRecipe = async event => {
    
    const deleteRecipeNodes = await fetch('http://' + hn + ':4000/api/recipes/delete/nodes/' + this.state.recipeid)
    const respDeleteRecipeNodes = await deleteRecipeNodes.json()

    const deleteRecipe = await fetch('http://' + hn + ':4000/api/recipes/delete/' + this.state.recipeid)
    const respDeleteRecipe = await deleteRecipe.json()


      this.setState({ delete: !this.state.delete,
        deleted: !this.state.deleted})

  }

  saveRecipe = async event => {

    const checkcompatibility = await fetch('http://' + hn + ':4000/api/recipes/checkcompatibility', {
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
    })


    const respCheck = await checkcompatibility.json()

      
       if(respCheck.serviceid) {

        this.setState({ serviceid: respCheck.serviceid,
          confirm: !this.state.confirm});
       } else {
        this.setState({ modal: !this.state.modal});
       }

  }

  insertRecipe = async event => {


    const updRecipe = await fetch('http://' + hn + ':4000/api/recipes/update_recipe', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.recipeid,
        serviceid: this.state.serviceid,
        clusterid: this.state.clusterid,
        recipeid: this.state.recipeid,
        recipename: this.state.recipename,
        recipedescription: this.state.recipedescription,
        addon_type: this.state.addon_type,
        recipe_type: this.state.recipe_type,
        content: this.state.content,
        service_description: this.state.service_description,
        cluster_type: this.state.cluster_type,
        cluster_version: this.state.cluster_version,
        mandatory: this.state.mandatory,
        display: this.state.display
      })
    })
    const respUpd = updRecipe.json()
    
    const deleteRecipeNodes = await fetch('http://' + hn + ':4000/api/recipes/delete/nodes/' + this.state.recipeid)
    const respDeleteRecipeNodes = await deleteRecipeNodes.json()

    if(this.state.appliesToMaster){
      const insertNode = await fetch('http://' + hn + ':4000/api/recipes/insert_recipe/nodes', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipe_id: this.state.recipeid,
          node_type: 'MASTER'
        })
      })
      const respNode = await insertNode.json()
    }

    if(this.state.appliesToWorker){
      const insertNode = await fetch('http://' + hn + ':4000/api/recipes/insert_recipe/nodes', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipe_id: this.state.recipeid,
          node_type: 'WORKER'
        })
      })
      const respNode = await insertNode.json()
    }

    if(this.state.appliesToCompute){
      const insertNode = await fetch('http://' + hn + ':4000/api/recipes/insert_recipe/nodes', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipe_id: this.state.recipeid,
          node_type: 'COMPUTE'
        })
      })
      const respNode = await insertNode.json()
    }

    if(this.state.appliesToCDSW){
      var insertNode = await fetch('http://' + hn + ':4000/api/recipes/insert_recipe/nodes', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipe_id: this.state.recipeid,
          node_type: 'CDSW'
        })
      })
      var respNode = await insertNode.json()
    }

    




    this.setState({ confirm: !this.state.confirm,
      confirmed: !this.state.confirmed})
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

  handleMasterNodeChange = (e) => {
    this.setState({ appliesToMaster: !this.state.appliesToMaster });
  }

  handleWorkerNodeChange = (e) => {
    this.setState({ appliesToWorker: !this.state.appliesToWorker });
  }

  handleComputeNodeChange = (e) => {
    this.setState({ appliesToCompute: !this.state.appliesToCompute });
  }

  handleCDSWNodeChange = (e) => {
    this.setState({ appliesToCDSW: !this.state.appliesToCDSW });
  }


  loadRecipeData() {
    fetch('http://' + hn + ':4000/api/recipes/'+this.props.match.params.id+'/details')
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
                        cluster_version: data.version,
                        mandatory: data.mandatory,
                        display: data.display

                                })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  loadDistinctServices() {
    fetch('http://' + hn + ':4000/api/services/distinctnames')
      .then(response => response.json())
      .then(data => {
        this.setState({ distinctServices: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  loadDistinctClusters() {
    fetch('http://' + hn + ':4000/api/clusters/distincttypes')
      .then(response => response.json())
      .then(data => {
        this.setState({ distinctClusters: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  loadDistinctVersions() {
    fetch('http://' + hn + ':4000/api/clusters/distinctversions')
      .then(response => response.json())
      .then(data => {
        this.setState({ distinctVersions: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }
  loadRecipeNodes() {
    fetch('http://' + hn + ':4000/api/recipes/nodes/'+this.props.match.params.id)
      .then(response => response.json())
      .then(data => {
          if(this.containsNode(data, "MASTER")) this.setState({ appliesToMaster: true });
          if(this.containsNode(data, "WORKER")) this.setState({ appliesToWorker: true });
          if(this.containsNode(data, "COMPUTE")) this.setState({ appliesToCompute: true });
          if(this.containsNode(data, "CDSW")) this.setState({ appliesToCDSW: true });
      
        
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
    this.loadRecipeNodes()
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    const serviceList = this.state.distinctServices.filter((service) => ((service.service_description)))
    const clusterList = this.state.distinctClusters.filter((cluster) => ((cluster.cluster_type)))
    const versionList = this.state.distinctVersions.filter((version) => ((version.version)))
    const nodeList = this.state.recipeNodesData.filter((node) => (node.recipe_id.toString() === this.props.match.params.id))

    return (

      <div className="animated fadeIn align-items-center">

        <Row>
          <Col>
            <Card className="border-warning">
            <Modal isOpen={this.state.delete} toggle={() => { this.setState({ delete: !this.state.delete }); }}
                       className={'modal-danger ' + this.props.className}>
                  <ModalHeader toggle={() => { this.setState({ delete: !this.state.delete}); }}>Delete Confirmation</ModalHeader>
                  <ModalBody>
                  <h3>Are you sure you want to delete this recipe?</h3>
                  </ModalBody>
                  <ModalFooter>
                  <Button color='secondary' onClick={() => { this.setState({ delete: !this.state.delete}); }}><i className="icon-ban"></i>&nbsp; Cancel</Button>
                  <Button color='danger' name={this.state.recipeid} onClick={this.deleteRecipe.bind(this)}><i className="fa fa-remove"></i>&nbsp; Delete</Button>
                   </ModalFooter>
                </Modal>
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
                <Modal isOpen={this.state.confirm} toggle={() => { this.setState({ confirm: !this.state.confirm }); }}
                       className={'modal-primary ' + this.props.className}>
                  <ModalHeader toggle={() => { this.setState({ confirm: !this.state.confirm}); }}>Confirmation</ModalHeader>
                  <ModalBody>
                  <h3>Are you sure you want to save?</h3>
                  </ModalBody>
                  <ModalFooter>
                  <Button color='secondary' onClick={() => { this.setState({ confirm: !this.state.confirm}); }}><i className="icon-ban"></i>&nbsp; Cancel</Button>
                  <Button color='primary' onClick={this.insertRecipe.bind(this)}><i className="fa fa-check"></i>&nbsp; Yes</Button>
                   </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.deleted} toggle={() => { this.setState({ deleted: !this.state.deleted }); }}
                       className={'modal-sucess ' + this.props.className}>
                  
                  <ModalBody>
                  <h3>Recipe deleted!</h3>
                  </ModalBody>
                  <ModalFooter>
                  <Button color='success' href="#/recipes">OK <i className="fa fa-long-arrow-right"></i></Button>
                   </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.confirmed} toggle={() => { this.setState({ confirmed: !this.state.confirmed }); }}
                       className={'modal-sucess ' + this.props.className}>
                  
                  <ModalBody>
                  <h3>Recipe saved!</h3>
                  </ModalBody>
                  <ModalFooter>
                  <Button color='success' href="#/recipes">OK <i className="fa fa-long-arrow-right"></i></Button>
                   </ModalFooter>
                </Modal>
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
                          <Input type="text" id="recipeName" name="recipeName" value={this.state.recipename} onChange={this.handleNameChange.bind(this)}/>
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

                          <Input type="textarea" id="recipeDescription" name="recipeDescription" value={this.state.recipedescription} onChange={this.handleDescriptionChange.bind(this)}/>
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
                          <Input type="select" name="recipeType" id="recipeType" onChange={this.handleRecipeTypeChange.bind(this)}>
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
                          <Input type="select" name="service" id="service" onChange={this.handleServiceChange.bind(this)}>
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
                          <Input type="select" name="clusterType" id="clusterType" onChange={this.handleClusterTypeChange.bind(this)}>
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
                          <Input type="select" name="clusterVersion" id="clusterVersion" onChange={this.handleClusterVersionChange.bind(this)}>
                          {versionList.map((version) =>
                              <option selected={this.state.cluster_version.toString() === version.version.toString()}>{version.version}</option>
                            )}
                          </Input>
                        </InputGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                    <Col md="3">
                      <Label>Applies to Nodes</Label>
                    </Col>
                    <Col md="9">
                      <FormGroup check inline>
                        <Input className="form-check-input" type="checkbox" id="inline-checkbox1" name="inline-checkbox1" value="Master"  checked={this.state.appliesToMaster} onClick={this.handleMasterNodeChange.bind(this)}/>
                        <Label className="form-check-label" check htmlFor="inline-checkbox1">Master</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="checkbox" id="inline-checkbox2" name="inline-checkbox2" value="Worker"  checked={this.state.appliesToWorker} onClick={this.handleWorkerNodeChange.bind(this)}/>
                        <Label className="form-check-label" check htmlFor="inline-checkbox2">Worker</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="checkbox" id="inline-checkbox3" name="inline-checkbox3" value="Compute"  checked={this.state.appliesToCompute} onClick={this.handleComputeNodeChange.bind(this)}/>
                        <Label className="form-check-label" check htmlFor="inline-checkbox3">Compute</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="checkbox" id="inline-checkbox3" name="inline-checkbox3" value="CDSW"  checked={this.state.appliesToCDSW} onClick={this.handleCDSWNodeChange.bind(this)}/>
                        <Label className="form-check-label" check htmlFor="inline-checkbox3">CDSW</Label>
                      </FormGroup>
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
            <Input type="textarea" rows="20" id="recipeCode" name="recipeCode" value={Base64.decode(this.state.content)} onChange={this.handleContentChange.bind(this)}/>
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
                        &nbsp;
                      <Button size="lg" color="danger" onClick={() => { this.setState({ delete: !this.state.delete}); }}>
                          <i className="fa fa-remove"></i>&nbsp;Delete
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

export default EditRecipe;