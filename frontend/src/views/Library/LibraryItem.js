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

var hn = window.location.hostname

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
      deleted: false,
      confirmPush: false,
      saving: false,
      saved: false,
      preparingDownload: false,
      downloadReady: false,
      destination: '',
      cb_url: '',
      downloadLink: '',
      thePush: ''
    }
  }
  confirmPushBundle() {
    this.setState({confirmPush: !this.state.confirmPush})

  }
  confirmDelete() {
    this.setState({delete: !this.state.delete})

  }

  cloudbreakRecipeType(recipe_type) {
    if(recipe_type === 'Pre Ambari Start') {
      return 'PRE_AMBARI_START';
    } else if(recipe_type === 'Post Ambari Start') {
      return 'POST_AMBARI_START';
    } else if(recipe_type === 'Post Cluster Install') {
      return 'POST_CLUSTER_INSTALL';
    } else {
      return 'PRE_TERMINATION';
    }


  }

  recipePrefix(recipe_type) {
    if(recipe_type === 'Pre Ambari Start') {
      return 'pras-';
    } else if(recipe_type === 'Post Ambari Start') {
      return 'poas-';
    } else if(recipe_type === 'Post Cluster Install') {
      return 'poci-';
    } else {
      return 'prte-';
    }


  }

  downloadBundle = async event => {

    this.setState({preparingDownload: !this.state.preparingDownload})

    // First, we prepare the folder
    var folder = "/bundle-" + (this.state.libraryItem.name.toString()).replace(/ /g, "-").toLowerCase()

  

    const initFolder = await fetch('http://' + hn + ':4000/api/library/item/download/create/folder', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        folderName: folder
      })
    })
    const resInit = await initFolder.json()
    
    


    // Then we add the files in folder

    // BLUEPRINT & LAYOUT
    const retrieveContents = await fetch('http://' + hn + ':4000/api/library/item/'+this.state.libraryItem.id+'/contents');
    const respContents = await retrieveContents.json()

    var bpContent ='';
    var bpFileName = "/bp-" + (this.state.libraryItem.name.toString()).replace(/ /g, "-").toLowerCase() + ".json";
    var lyContent='';
    var lyFileName = "/layout-" + (this.state.libraryItem.name.toString()).replace(/ /g, "-").toLowerCase() + ".json";

    for(var key in respContents){
      if(respContents[key].type.toString() === 'BLUEPRINT'){
        bpContent = respContents[key].content;
      } else if(respContents[key].type.toString() === 'LAYOUT'){
        lyContent = respContents[key].content;
      }
    }

    const createBP = await fetch('http://' + hn + ':4000/api/library/item/download/create/file', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName: folder + bpFileName,
        content: bpContent
      })
    })
    const resBP = await createBP.json()

   


    const createLY = await fetch('http://' + hn + ':4000/api/library/item/download/create/file', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName: folder + lyFileName,
        content: lyContent
      })
    })
    const resLY = await createLY.json()

  
    // RECIPES
    const retrieveRecipes = await fetch('http://' + hn + ':4000/api/library/item/'+this.state.libraryItem.id+'/dependencies/recipes');
    const respRecipes = await retrieveRecipes.json()

    for(var key in respRecipes){
      var recipeFileName = "/" + this.recipePrefix(respRecipes[key].recipe_type) + (respRecipes[key].recipename.toString()).replace(/ /g, "-").toLowerCase() + ".sh";
      var recipeContent = respRecipes[key].content;

      var createRP = await fetch('http://' + hn + ':4000/api/library/item/download/create/file', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName: folder + recipeFileName,
        content: recipeContent
      })
    })
    const resRP = await createRP.json()
   

    }

    // Finally we create the Zip and update the link

    var zipFileName = 'cuisine-bundle-' + (this.state.libraryItem.name.toString()).replace(/ /g, "-").toLowerCase()  + '.zip'
    // var createZIP = await fetch('http://' + hn + ':4000/api/library/item/download/create/zip', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     fileName: zipFileName,
    //     folderName: folder
    //   })
    // })
    // const resZIP = await createZIP.json()

    this.setState({downloadLink: 'http://' + hn + ':4000/api/library/item/download/zip?folderName=' + folder + '&fileName='+zipFileName,
                  downloadReady: !this.state.downloadReady})
  }

  pushBundle = async event => {
    this.setState({confirmPush: !this.state.confirmPush,
                  saving: !this.state.saving,
                  destination: event.target.name})
    if (event.target.name.toString() === 'Cloudbreak') {
    const initWhoville = await fetch('http://' + hn + ':4000/api/whoville/refresh')
    const resWhoville = await initWhoville.json()
    const initProfile = await fetch('http://' + hn + ':4000/api/whoville/refreshprofile')
    const resProfile = await initProfile.json()
    
    const initWhovilleProfile = await fetch('http://' + hn + ':4000/api/profiles/whoville');
    const whovilleProfile = await initWhovilleProfile.json()

    this.setState({cb_url: 'http://'+whovilleProfile[0].cb_url.toString()})
    const initCBToken = await fetch('http://' + hn + ':4000/api/dashboard/gettoken', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: whovilleProfile[0].default_email.toString(),
        password: whovilleProfile[0].default_pwd.toString(),
        cb_url: whovilleProfile[0].cb_url.toString()
      })
    })
    const CBToken = await initCBToken.json()

    // Pushing Blueprint
    var content=this.state.libraryItemContent.filter((content) => (content.type.toString() === 'BLUEPRINT'))
    .map((content) => {
      return content.content
    })
    var base64BP=Base64.encode(Base64.decode(content))
    const CBpushBundle = await fetch('http://' + hn + ':4000/api/cloudbreak/push/bundle', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: CBToken,
        cb_url: whovilleProfile[0].cb_url.toString(),
        description: 'Blueprint for Cuisine Bundle ' + this.state.libraryItem.name,
        name: 'bp-' + (this.state.libraryItem.name.toString()).replace(/ /g, "-").toLowerCase(),
        blueprint: base64BP
        
      })
    })
    const pushCBBundle = await CBpushBundle.json()
   

    for(var key in this.state.libraryItemRecipes) {
      
      var currentRecipe=this.state.libraryItemRecipes[key];
      var base64Recipe=Base64.encode(Base64.decode(currentRecipe.content))
      var recipeType=''
      var prefix=''
     

      if(currentRecipe.recipe_type === 'Pre Ambari Start') {
        recipeType='PRE_AMBARI_START';
        prefix='pras-';
      } else if(currentRecipe.recipe_type === 'Post Ambari Start') {
        recipeType='POST_AMBARI_START';
        prefix='poas-';
      } else if(currentRecipe.recipe_type === 'Post Cluster Install') {
        recipeType='POST_CLUSTER_INSTALL';
        prefix='poci-';
      } else {
        recipeType='PRE_TERMINATION';
        prefix='prte-';
      }
     
      var delRecipe = await fetch('http://' + hn + ':4000/api/cloudbreak/delete/recipe', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: CBToken,
        cb_url: whovilleProfile[0].cb_url.toString(),
        name: prefix + (currentRecipe.recipename).replace(/ /g, "-").toLowerCase()
        
      })
    })
    var delCBRecipe = await delRecipe.json()
    

      var CBpushRecipe = await fetch('http://' + hn + ':4000/api/cloudbreak/push/recipe', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: CBToken,
        cb_url: whovilleProfile[0].cb_url.toString(),
        name: prefix  + (currentRecipe.recipename).replace(/ /g, "-").toLowerCase(),
        description: currentRecipe.recipedescription + '(' + currentRecipe.recipe_type +')',
        recipeType: recipeType,
        content: base64Recipe
        
      })
    })
    var pushCBRecipe = await CBpushRecipe.json()
   
  }
 


    
    this.setState({saved: !this.state.saved})

  } else {


    //PUSHING TO WHOVILLE
    const initWhoville = await fetch('http://' + hn + ':4000/api/whoville/refresh')
    const resWhoville = await initWhoville.json()
    const initProfile = await fetch('http://' + hn + ':4000/api/whoville/refreshprofile')
    const resProfile = await initProfile.json()

    // GENERATING DATA
    var whovilleDataPush = '{ "blueprint": ';

    // BLUEPRINT
    var content=this.state.libraryItemContent.filter((content) => (content.type.toString() === 'BLUEPRINT'))
    .map((content) => {
      return content.content
    })

    whovilleDataPush = whovilleDataPush + Base64.decode(content) +',';

    // RECIPES

    whovilleDataPush = whovilleDataPush + '"recipes": [';
    var getNodes = await fetch('http://' + hn + ':4000/api/recipes/nodes')
    var resNodes = await getNodes.json()

    this.state.libraryItemRecipes.map((recipe) => {

      whovilleDataPush = whovilleDataPush + '{';
      whovilleDataPush = whovilleDataPush + '"name" : "' + this.recipePrefix(recipe.recipe_type)  + (recipe.recipename).replace(/ /g, "-").toLowerCase() +'.sh", ';
      // whovilleDataPush = whovilleDataPush + '"type" : "' + this.cloudbreakRecipeType(recipe.recipe_type) +'", ';
      // whovilleDataPush = whovilleDataPush + '"nodes" : [';
      // var myNodes = resNodes.filter((nodeRecipe) => (nodeRecipe.recipe_id == recipe.id))
      // myNodes.map((nodeRecipe) => {
      //   whovilleDataPush = whovilleDataPush + '"' + nodeRecipe.node_type + '",'
      
      // })
      // whovilleDataPush = whovilleDataPush.substring(0,whovilleDataPush.length-1);
      // whovilleDataPush = whovilleDataPush + '],'

      whovilleDataPush = whovilleDataPush + '"content" : "' + recipe.content +'"},';
    })
    whovilleDataPush = whovilleDataPush.substring(0,whovilleDataPush.length-1);

    whovilleDataPush = whovilleDataPush + '], ';

    // STACK LAYOUT
    whovilleDataPush = whovilleDataPush + ' "infra": ';
    var content=this.state.libraryItemContent.filter((content) => (content.type.toString() === 'LAYOUT'))
    .map((content) => {
      return content.content
    })

    whovilleDataPush = whovilleDataPush + Base64.decode(content) +'}';
    this.setState({thePush: whovilleDataPush})

    this.setState({saved: !this.state.saved})

  }
  }


  deleteBundle = async event => {
    

    var id=event.target.id;
    var delContent = await fetch('http://' + hn + ':4000/api/generator/delete/bundle_contents/' + id)
    var confirmC = await delContent.json()
    
    var delDeps = await fetch('http://' + hn + ':4000/api/generator/delete/bundle_dependencies/' + id)
    var confirmD = await delDeps.json()


    var delB = await fetch('http://' + hn + ':4000/api/generator/delete/bundle/' +id)
    var confirmB = await delB.json()

    this.setState({delete: !this.state.delete,
      deleted: !this.state.deleted})

  }

  loadData() {
    fetch('http://' + hn + ':4000/api/library/item/' + this.props.match.params.id)
      .then(response => response.json())
      .then(data => {
        this.setState({ libraryItem: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  loadServicesData() {
    fetch('http://' + hn + ':4000/api/library/item/' + this.props.match.params.id + '/dependencies/services')
      .then(response => response.json())
      .then(data => {
        this.setState({ libraryItemServices: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  loadRecipesData() {
    fetch('http://' + hn + ':4000/api/library/item/' + this.props.match.params.id + '/dependencies/recipes')
      .then(response => response.json())
      .then(data => {
        this.setState({ libraryItemRecipes: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  loadClusterData() {
    fetch('http://' + hn + ':4000/api/library/item/' + this.props.match.params.id + '/dependencies/cluster')
      .then(response => response.json())
      .then(data => {
        this.setState({ libraryItemCluster: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  loadBundleContent() {
    fetch('http://' + hn + ':4000/api/library/item/' + this.props.match.params.id + '/contents')
      .then(response => response.json())
      .then(data => {
        this.setState({ libraryItemContent: data })
      })
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
        {/* {this.state.thePush} */}
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


                <Modal isOpen={this.state.confirmPush} toggle={() => { this.setState({ confirmPush: !this.state.confirmPush }); }}
                       className={'modal-success ' + this.props.className}>
                  <ModalHeader toggle={() => { this.setState({ confirmPush: !this.state.confirmPush}); }}>Push Confirmation</ModalHeader>
                  <ModalBody>
                  <h3>Where do you want to push your local bundle?</h3>
                  </ModalBody>
                  <ModalFooter>
                  <Button color='secondary' onClick={() => { this.setState({ confirmPush: !this.state.confirmPush}); }}><i className="icon-ban"></i>&nbsp; Cancel</Button>
                  <Button color='success' id={this.state.libraryItem.id} name="Cloudbreak" onClick={this.pushBundle.bind(this)}><i className="fa fa-cloud"></i>&nbsp; Cloudbreak</Button>
                  <Button color='success' id={this.state.libraryItem.id} name="Whoville" onClick={this.pushBundle.bind(this)}><i className="fa fa-building-o"></i>&nbsp; Whoville</Button>
                   </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.saving} toggle={this.state.saved ?  () => { this.setState({ saving: !this.state.saving, saved: !this.state.saved }); } : ''}
                       className={this.state.saved ? 'modal-success ' + this.props.className : 'modal-secondary ' + this.props.className}>
                       <ModalHeader >{this.state.saved ? 'Bundle Pushed!' : 'Pushing bundle ... '} <i className={this.state.saved ? '':'fa fa-spinner fa-spin'}></i></ModalHeader>
                  
                  <ModalBody>
                   <h3>Pushing to {this.state.destination} ... <i className={this.state.saved ? 'fa fa-check': 'fa fa-spinner fa-spin'}></i> </h3>
                  </ModalBody>
                  <ModalFooter>
                  <Button color={this.state.saved ? 'success' : 'secondary'} href={this.state.destination === "Cloudbreak" ? this.state.cb_url+'/sl' : "#/whoville"} target={this.state.destination === "Cloudbreak" ? "_blank" : ""} disabled={!this.state.saved}>Go to {this.state.destination} <i className="fa fa-long-arrow-right"></i></Button>
                   </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.preparingDownload} toggle={this.state.downloadReady ?  () => { this.setState({ preparingDownload: !this.state.preparingDownload, downloadReady: !this.state.downloadReady }); } : ''}
                       className={this.state.downloadReady ? 'modal-success ' + this.props.className : 'modal-secondary ' + this.props.className}>
                       <ModalHeader >{this.state.downloadReady ? 'Bundle Ready to Download!' : 'Preparing bundle package ... '} <i className={this.state.downloadReady ? '':'fa fa-spinner fa-spin'}></i></ModalHeader>
                  
                  <ModalBody>
                   <h3>Preparing bundle package ... <i className={this.state.downloadReady ? 'fa fa-check': 'fa fa-spinner fa-spin'}></i> </h3>
                  </ModalBody>
                  <ModalFooter>
                  <Button color={this.state.downloadReady ? 'success' : 'secondary'} href={this.state.downloadLink} disabled={!this.state.downloadReady}><i className="fa fa-download"></i>&nbsp;Download</Button>
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
                        <td align="center" width="25%">
                          <Button outline color="success" href="#/library">
                            <i className="fa fa-long-arrow-left" ></i>&nbsp;Back
                    </Button>
                        </td>
                        <td align="center">
                          <Button id={this.state.libraryItem.id} color="success" width="25%" onClick={this.downloadBundle.bind(this)}>
                            <i className="fa fa-download"></i>&nbsp;Download
                    </Button>
                        </td>
                        <td align="center" width="25%">
                          <Button  name={this.state.libraryItem.id} color="success" onClick={this.confirmPushBundle.bind(this)}>
                            <i className="fa fa-cloud-upload" ></i>&nbsp;Push
                    </Button>
                        </td>
                        <td align="center" width="25%">
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
                    onClick={() => { this.toggle(3, '3'); }} ><h3>Layout</h3>
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
                          <Input type="textarea" rows="20" id="recipeLayout" name="recipeLayout" value={
                            this.state.libraryItemContent.filter((content) => (content.type.toString() === 'LAYOUT'))
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
