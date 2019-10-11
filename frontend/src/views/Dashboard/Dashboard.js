import React, { Component } from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row, Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';

var hn = window.location.hostname

function DirectorProgressClassName(state) {
  var class_name = "progress-xs my-3 bg-info"



  if ((state.toString() === "READY")){
    class_name = "progress-xs my-3 bg-light-gray"
  } else if ((state.toString() === "BOOTSTRAPPING") || (state.toString() === "UPDATING")) {
    class_name = "progress-xs my-3 bg-light-blue"
  } else if ((state.toString() === "BOOTSTRAP_FAILED") || (state.toString() === "UPDATE_FAILED") || (state.toString() === "TERMINATE_FAILED") ) {
    class_name = "progress-xs my-3 bg-red"
  } else if ((state.toString() === "UNKNOWN") || (state.toString() === "TERMINATED")) {
    class_name = "progress-xs my-3 bg-light-gray"
  } else if ((state.toString() === "TERMINATING")) {
    class_name = "progress-xs my-3 bg-yellow"
  }


  return (
    class_name
  )
}


function ProgressClassName(state) {
  var class_name = "progress-xs my-3 bg-info"

  if (state.toString() === "AVAILABLE") {
    class_name = "progress-xs my-3 bg-info"
  } else if ((state.toString() === "UPDATE_IN_PROGRESS") || (state.toString() === "CREATE_IN_PROGRESS") || (state.toString() === "START_IN_PROGRESS") || (state.toString() === "REQUESTED" )) {
    class_name = "progress-xs my-3 bg-light-blue"
  } else if ((state.toString() === "CREATE_FAILED") || (state.toString() === "UPDATE_FAILED")) {
    class_name = "progress-xs my-3 bg-red"
  } else if ((state.toString() === "DELETE_IN_PROGRESS")) {
    class_name = "progress-xs my-3 bg-yellow"
  }


  return (
    class_name
  )
}

function DirectorDashboardClassName(state) {
  var class_name = "text-white bg-primary border-primary"


  if ((state.toString() === "READY")){
    class_name = "text-white bg-success border-success"
  } else if ((state.toString() === "BOOTSTRAPPING") || (state.toString() === "UPDATING")) {
    class_name = "text-white bg-blue border-blue"
  } else if ((state.toString() === "BOOTSTRAP_FAILED") || (state.toString() === "UPDATE_FAILED") || (state.toString() === "TERMINATE_FAILED") ) {
    //const date = dashboardItem.fail_date
    class_name = "text-white bg-danger border-danger"
  } else if ((state.toString() === "UNKNOWN") || (state.toString() === "TERMINATED")) {
    class_name = "text-white bg-secondary border-secondary"
  } else if ((state.toString() === "TERMINATING")) {
    class_name = "text-white bg-warning border-warning"
  }

  return (
    class_name
  )
}


function DashboardClassName(state) {
  var class_name = "text-white bg-primary border-primary"

  if (state.toString() === "AVAILABLE") {
    class_name = "text-white bg-success border-success"
  } else if ((state.toString() === "UPDATE_IN_PROGRESS") || (state.toString() === "CREATE_IN_PROGRESS") || (state.toString() === "START_IN_PROGRESS" || (state.toString() === "REQUESTED" ))) {
    class_name = "text-white bg-blue border-blue"
  } else if ((state.toString() === "CREATE_FAILED") || (state.toString() === "UPDATE_FAILED")) {
    class_name = "text-white bg-danger border-danger"
  } else if ((state.toString() === "DELETE_IN_PROGRESS")) {
    class_name = "text-white bg-warning border-warning"
  }


  return (
    class_name
  )
}

function DirectorDashboardItemText(props) {
  const dashboardItem = props.dashboardItem
  var state = dashboardItem[1].stage;

  var widget_text = "Director | No Creation Info"

  if ((state.toString() === "READY")){
    widget_text = "Director | Status: " + state;
  } else if ((state.toString() === "BOOTSTRAPPING") || (state.toString() === "UPDATING")) {
    widget_text = "Director | Status: " + state;
  } else if ((state.toString() === "BOOTSTRAP_FAILED") || (state.toString() === "UPDATE_FAILED") || (state.toString() === "TERMINATE_FAILED") ) {
    //const date = dashboardItem.fail_date
    widget_text = "Director | Status: " + state;
  } else if ((state.toString() === "UNKNOWN")  || (state.toString() === "TERMINATED")) {
    widget_text = "Director | Status: " + state;
  } else if ((state.toString() === "TERMINATING")) {
    widget_text = "Director | Status: " + state;
  }

  return (

    <div>{widget_text.toString()}</div>

  )
}


function DashboardItemText(props) {
  const dashboardItem = props.dashboardItem
  if (dashboardItem.status.toString() === 'AVAILABLE'){
    var state = dashboardItem.cluster.status
  } else {
    var state =  dashboardItem.status
  }
  var widget_text = "No creation info"

  if (state.toString() === "AVAILABLE") {
    widget_text = "Cloudbreak | Status: " + state;
  } else if ((state.toString() === "UPDATE_IN_PROGRESS") || (state.toString() === "CREATE_IN_PROGRESS") || (state.toString() === "START_IN_PROGRESS") || (state.toString() === "DELETE_IN_PROGRESS") || (state.toString() === "REQUESTED" )) {
    widget_text = "Cloudbreak | Status: " + state;
  } else if ((state.toString() === "CREATE_FAILED") || (state.toString() === "UPDATE_FAILED")) {
    //const date = dashboardItem.fail_date
    widget_text = "Cloudbreak | Status: " + state;
  }

  return (

    <div>{widget_text.toString()}</div>

  )
}
function DirectorProgressValue(dashboardItem) {

  var remainingSteps = dashboardItem[1].remainingSteps;
  var completedSteps = dashboardItem[1].completedSteps;
  var value = (completedSteps / (completedSteps+remainingSteps))*100;


  return (
    value
  )
}

function ProgressValue(state) {
  var value = '0'

  if (state.toString() === "AVAILABLE") {
    value = '100'
  } else if ((state.toString() === "UPDATE_IN_PROGRESS") || (state.toString() === "DELETE_IN_PROGRESS") || (state.toString() === "REQUESTED" )) {
    value = '50'
  } else if (state.toString() === "failed") {
    value = '0'
  }

  return (
    value
  )
}

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      cbUrl: '',
      namespace: '',
      dropdownOpen: false,
      radioSelected: 2,
      token: '',
      clusterData: [],
      loading: true,
      modal: false,
      deletion: false,
      directorClusterData: [],
      errorLoading: false,
      profileError: false,
      cbError: false,
      confirmPurge: false,
      purging: false
    };
  }


  directorDeleteStack = async event => {

    var environment = this.state.namespace + "whoville";
    var deployment = event.target.id;
    var cluster = event.target.name;

    this.setState({['modal'+cluster]: !this.state['modal'+cluster],
                  ['modaldelete'+cluster]: !this.state['modaldelete'+cluster],
                  ['dirRefPostDelete'+cluster]: true})


    // First, we get a cookie
    const initDirectorSession = await fetch('http://' + hn + ':4000/api/director/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.default_user,
        password: this.state.default_pwd,
        di_url: this.state.cbUrl
      })
    })
    const directorCookie = await initDirectorSession.json()
  

     // Then we send a delete
     const sendDelete = await fetch('http://' + hn + ':4000/api/director/delete/cluster', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        environment: environment,
        deployment: deployment,
        cluster: cluster,
        di_url: this.state.cbUrl,
        cookie: directorCookie.toString()
      })
    })
    const deleteExecuted = await sendDelete.json()
    this.setState({['dirRefPostDelete'+cluster]: false})
  }
  
  purgeCloudbreak = (e) => {
    this.setState({
      confirmPurge: !this.state.confirmPurge,
      purging: !this.state.purging
    });
     fetch('http://' + hn + ':4000/api/whoville/purge/' + e.target.id)
       .then(response => response.json())
       .catch(err => console.error(this.props.url, err.toString()))

   
  }


  deleteStack = (e) => {
    this.setState({['modal'+e.target.name]: !this.state['modal'+e.target.name],
                  ['modaldelete'+e.target.name]: !this.state['modaldelete'+e.target.name]})


      fetch('http://' + hn + ':4000/api/whoville/deletestack/' + e.target.name)
          .then(response => response.json())
          .catch(err => console.error(this.props.url, err.toString()))
this.setState({['modaldelete'+e.target.id]: !this.state['modaldelete'+e.target.id]})
      
  }

  goToBundle = (e) => {
    var nameArray = e.target.id.split("-")
    
    fetch('http://' + hn + ':4000/api/dashboard/getbundleid', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nameArray[1].toString()
      })
    }).then(response => response.json())
      .then((data) => {
        this.props.history.push('whoville/' + data['id'])

      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

 

  async componentDidMount(){

    
    // 1. Refresh whoville

    const initWhoville = await fetch('http://' + hn + ':4000/api/whoville/refresh')
    const resWhoville = await initWhoville.json()
    
    const initProfile = await fetch('http://' + hn + ':4000/api/whoville/refreshprofile')
    const resProfile = await initProfile.json()
    
   if(!(resProfile.toString() === "refresh successful")) {
    this.setState({ errorLoading: true})

    if(resProfile.toString() === "no profile data!") {
      this.setState({ profileError: true})
    } else if(resProfile.toString() === "no CB data!") {
      this.setState({ cbError: true})
    }

    this.setState({ loading: false})

   } else {

    
    const initWhovilleProfile = await fetch('http://' + hn + ':4000/api/profiles/whoville');
    const whovilleProfile = await initWhovilleProfile.json()
    
    // 2. Get Cloudbreak data
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
    this.setState({cbUrl: whovilleProfile[0].cb_url.toString()});
   
    const initClusterData = await fetch('http://' + hn + ':4000/api/dashboard/getclusters', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: CBToken,
        cb_url: whovilleProfile[0].cb_url.toString()
      })
    })
    const fetchedClusterData = await initClusterData.json()
    this.setState({ clusterData: fetchedClusterData, default_email: whovilleProfile[0].default_email.toString(), default_user: whovilleProfile[0].default_user.toString(), default_pwd: whovilleProfile[0].default_pwd.toString()})

    // 3. Get Director data
    
    const initDirectorSession = await fetch('http://' + hn + ':4000/api/director/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: whovilleProfile[0].default_user.toString(),
        password: whovilleProfile[0].default_pwd.toString(),
        di_url: whovilleProfile[0].cb_url.toString()
      })
    })
    const directorCookie = await initDirectorSession.json()
   
    // 3.1. Get all deployments
    const getDeployments = await fetch('http://' + hn + ':4000/api/director/list/deployments', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        environment: whovilleProfile[0].namespace.toString() + "whoville",
        di_url: whovilleProfile[0].cb_url.toString(),
        cookie: directorCookie.toString()
      })
    })
    const directorDeployments = await getDeployments.json()
    
    var fetchedDirectorClusterData = []
    // 3.2. Loop through deployments
    for (var i in directorDeployments) {


      // Get deployment details
      var getDeploymentDetails= await fetch('http://' + hn + ':4000/api/director/deployment/details', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          environment: whovilleProfile[0].namespace.toString() + "whoville",
          deployment: directorDeployments[i],
          di_url: whovilleProfile[0].cb_url.toString(),
          cookie: directorCookie.toString()
        })
      })
      var deploymentDetails = await getDeploymentDetails.json()

      // Get all clusters
      var getClusters = await fetch('http://' + hn + ':4000/api/director/list/clusters', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          environment: whovilleProfile[0].namespace.toString() + "whoville",
          deployment: directorDeployments[i],
          di_url: whovilleProfile[0].cb_url.toString(),
          cookie: directorCookie.toString()
        })
      })
      var directorClusters = await getClusters.json()

      // 3.3. Loop through clusters
      for (var j in directorClusters) {
        var getClusterDetails = await fetch('http://' + hn + ':4000/api/director/cluster/status', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            environment: whovilleProfile[0].namespace.toString() + "whoville",
            deployment: directorDeployments[i],
            cluster: directorClusters[j],
            di_url: whovilleProfile[0].cb_url.toString(),
            cookie: directorCookie.toString()
          })
        })
        var directorClustersDetails= await getClusterDetails.json()
        fetchedDirectorClusterData.push([deploymentDetails,directorClustersDetails,{"clusterName": directorClusters[j]}])
      }
    }
    
    this.setState({ directorClusterData: fetchedDirectorClusterData, namespace: whovilleProfile[0].namespace.toString(), loading: false})
    
  }
  

  
  
    
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }
  refreshPage() {
    window.location.reload();
  }
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  toggleModal() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  render() {
    const isLoading = this.state.loading;
    const bundleList = this.state.clusterData.filter((bundle) => bundle.name);
    
    if(!this.state.errorLoading) {
    return (
      <div >
        <Row>
          <Col>
          <h1>Deployed Bundles </h1>
          </Col>
          <Col align="right" >
            <div >
              <Button size="lg" color="warning" onClick={this.refreshPage.bind(this)}>
              
                <i className={isLoading ? 'fa fa-refresh fa-spin' : 'fa fa-refresh'}></i>&nbsp;Refresh
                              </Button>
              &nbsp;
                              <Button size="lg" color="danger" onClick={() => { this.setState({ confirmPurge: !this.state.confirmPurge }); }} disabled={isLoading}>
                              <i class="fa fa-recycle"></i>&nbsp;Purge
                              </Button>
                              &nbsp;
              <Button size="lg" color="success" href={"https://" + this.state.cbUrl +"/sl"} target="_blank" disabled={isLoading}>
                <i className='fa fa-external-link'></i>&nbsp;Cloudbreak
                              </Button>
                              &nbsp;
                              <Button size="lg" color="success" href={"https://" + this.state.cbUrl +":7189/"} target="_blank" disabled={isLoading}>
                <i className='fa fa-external-link'></i>&nbsp;Director
                              </Button>
            </div>

            <Modal isOpen={this.state.confirmPurge} toggle={() => { this.setState({ confirmPurge: !this.state.confirmPurge }); }}
                       className={'modal-danger ' + this.props.className}>
                  <ModalHeader toggle={() => { this.setState({ confirmPurge: !this.state.confirmPurge}); }}>Purge Cloudbreak</ModalHeader>
                  <ModalBody>
                  <h3>Are you sure you want to purge Cloudbreak?</h3>
                  </ModalBody>
                  <ModalFooter>
                  <Button color='secondary' onClick={() => { this.setState({ confirmPurge: !this.state.confirmPurge}); }}><i className="icon-ban"></i>&nbsp; Cancel</Button>
                  <Button color='danger' id={this.state.bundleId} onClick={this.purgeCloudbreak.bind(this)}><i className="fa fa-recycle"></i>&nbsp; Purge</Button>
                   </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.purging} toggle={this.purging}
                       className={'modal-primary ' + this.props.className}>
                  {/* <ModalHeader toggle={this.togglePrimary}>Deploying to Cloudbreak</ModalHeader> */}
                  <ModalBody>
                  <h3>Cloudbreak is being purged ... <i className='fa fa-spinner fa-spin'></i></h3>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.refreshPage.bind(this)}>Back to Dashboard <i className="fa fa-long-arrow-right"></i></Button>
                  </ModalFooter>
                </Modal>
          </Col>
        </Row>
        <Row>
          <Col>
          <h1><i className={isLoading ? 'fa fa-spinner fa-spin' : ''}></i></h1>
          </Col>
        </Row>
        <Row>
          
          {bundleList.map((dashboardItem, index) => {
              if (dashboardItem.status.toString() === 'AVAILABLE'){
                var theStatus = dashboardItem.cluster.status
              } else {
                var theStatus =  dashboardItem.status
              }

            return <Col xs="12" sm="6" lg="3">
              <Card className={DashboardClassName(theStatus)}>
                <CardBody className="pb-0">
                  <ButtonGroup className="float-right">
                    <Dropdown id={dashboardItem.name} isOpen={this.state[dashboardItem.name]} toggle={() => { this.setState({ [dashboardItem.name]: !this.state[dashboardItem.name] }); }} >
                      <DropdownToggle caret className="p-0" color="transparent">
                        <i className="icon-settings"></i>
                      </DropdownToggle>
                      <DropdownMenu right>
                        {/* <DropdownItem><i className="icon-eyeglass"></i>&nbsp;Details</DropdownItem> */}
                        <DropdownItem id={dashboardItem.name} onClick={this.goToBundle.bind(this)}><i className="fa fa-building-o"></i>&nbsp;Whoville Bundle</DropdownItem>
                        <DropdownItem href={dashboardItem.cluster.ambariServerUrl} target="_blank"><i className="fa fa-external-link"></i>&nbsp;Go to Ambari</DropdownItem>
                        <DropdownItem name={dashboardItem.name} id={theStatus} onClick={() => { this.setState({ ['modal'+dashboardItem.name]: !this.state['modal'+dashboardItem.name] }); }}><i className="fa fa-remove"></i>&nbsp;Terminate</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </ButtonGroup>
                  <div className="text-value">{dashboardItem.name}</div>
                  <DashboardItemText key={index} dashboardItem={dashboardItem} />
                  <Modal isOpen={this.state['modaldelete'+dashboardItem.name]}
                       className={'modal-danger' + this.props.className}>
                   <ModalBody>
                  <h3>Sending delete... <i className='fa fa-spinner fa-spin'></i></h3>
                  </ModalBody>
                  <ModalFooter>
                  <Button color="primary" onClick={this.refreshPage.bind(this)}>Refresh Dashboard <i className="fa fa-long-arrow-right"></i></Button>
                  </ModalFooter>
                </Modal>

                <Modal isOpen={this.state['modal'+dashboardItem.name]} toggle={() => { this.setState({ ['modal'+dashboardItem.name]: !this.state['modal'+dashboardItem.name] }); }}
                       className={'modal-'+((theStatus.toString() === 'AVAILABLE' || theStatus.toString() === 'CREATE_FAILED') ? 'danger ' : 'warning ')+' ' + this.props.className}>
                  <ModalHeader toggle={() => { this.setState({ ['modal'+dashboardItem.name]: !this.state['modal'+dashboardItem.name] }); }}>Deleting Stack</ModalHeader>
                  <ModalBody>
                  <h3>{(theStatus.toString() === 'AVAILABLE' || theStatus.toString() === 'CREATE_FAILED')  ? 'Are you sure you want to terminate this stack?' : "You can only delete stacks when they are in status AVAILABLE or CREATE_FAILED"} </h3>
                  </ModalBody>
                  <ModalFooter>
                  <Button color='secondary' onClick={() => { this.setState({ ['modal'+dashboardItem.name]: !this.state['modal'+dashboardItem.name] }); }}><i className="icon-ban"></i>&nbsp; Cancel</Button>
                    <Button name={dashboardItem.name}  id={dashboardItem.id} color={(theStatus.toString() === 'AVAILABLE' || theStatus.toString() === 'CREATE_FAILED') ? 'danger' : 'warning'} onClick={this.deleteStack.bind(this)} disabled={!(theStatus.toString() === 'AVAILABLE' || theStatus.toString() === 'CREATE_FAILED') }><i className="fa fa-remove"></i>&nbsp; Terminate Stack</Button>
                  </ModalFooter>
                </Modal>

                </CardBody>
                <div className="chart-wrapper" style={{ height: '20px', margin: '20px' }}>
                  <Progress className={ProgressClassName(theStatus)} color='white' value={dashboardItem.progress} value={ProgressValue(theStatus)} />
                </div>
              </Card>
            </Col>

          }
          )}


          {this.state.directorClusterData.map((dashboardItem, index) => {
              var theStatus = dashboardItem[1].stage;

             return  <Col xs="12" sm="6" lg="3">
              <Card className={DirectorDashboardClassName(theStatus)}>
                <CardBody className="pb-0">
                  <ButtonGroup className="float-right">
                    <Dropdown id={dashboardItem[2].clusterName} isOpen={this.state[dashboardItem[2].clusterName]} toggle={() => { this.setState({ [dashboardItem[2].clusterName]: !this.state[dashboardItem[2].clusterName] }); }} >
                      <DropdownToggle caret className="p-0" color="transparent">
                        <i className="icon-settings"></i>
                      </DropdownToggle>
                      <DropdownMenu right>
                        {/* <DropdownItem><i className="icon-eyeglass"></i>&nbsp;Details</DropdownItem> */}
                        <DropdownItem id={dashboardItem[2].clusterName} onClick={this.goToBundle.bind(this)}><i className="fa fa-building-o"></i>&nbsp;Whoville Bundle</DropdownItem>
                        <DropdownItem href={'https://' + dashboardItem[0].managerInstance.properties.publicIpAddress + ':7180'} target="_blank"><i className="fa fa-external-link"></i>&nbsp;Go to Manager</DropdownItem>
                        <DropdownItem name={dashboardItem[2].clusterName} id={theStatus} onClick={() => { this.setState({ ['modal'+dashboardItem[2].clusterName]: !this.state['modal'+dashboardItem[2].clusterName] }); }}><i className="fa fa-remove"></i>&nbsp;Terminate</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </ButtonGroup>
                  <div className="text-value">{dashboardItem[2].clusterName}</div>
                  <DirectorDashboardItemText key={index} dashboardItem={dashboardItem} />
                  <Modal isOpen={this.state['modaldelete'+dashboardItem[2].clusterName]}
                       className={'modal-danger' + this.props.className}>
                   <ModalBody>
                  <h3>Sending delete... <i className='fa fa-spinner fa-spin'></i></h3>
                  </ModalBody>
                  <ModalFooter>
                  <Button color="primary" onClick={this.refreshPage.bind(this)} disabled={this.state['dirRefPostDelete'+dashboardItem[2].clusterName]}>Refresh Dashboard <i className="fa fa-long-arrow-right"></i></Button>
                  </ModalFooter>
                </Modal>

                  <Modal isOpen={this.state['modal'+dashboardItem[2].clusterName]} toggle={() => { this.setState({ ['modal'+dashboardItem[2].clusterName]: !this.state['modal'+dashboardItem[2].clusterName] }); }}
                       className={'modal-'+((theStatus.toString() === 'READY' || theStatus.toString() === 'BOOTSTRAP_FAILED') ? 'danger ' : 'warning ')+' ' + this.props.className}>
                  <ModalHeader toggle={() => { this.setState({ ['modal'+dashboardItem[2].clusterName]: !this.state['modal'+dashboardItem[2].clusterName] }); }}>Deleting Stack</ModalHeader>
                  <ModalBody>
                  <h3>{(theStatus.toString() === 'READY' || theStatus.toString() === 'BOOTSTRAP_FAILED')  ? 'Are you sure you want to terminate this stack?' : "You can only delete stacks when they are in status READY or BOOTSTRAP_FAILED"} </h3>
                  </ModalBody>
                  <ModalFooter>
                  <Button color='secondary' onClick={() => { this.setState({ ['modal'+dashboardItem[2].clusterName]: !this.state['modal'+dashboardItem[2].clusterName] }); }}><i className="icon-ban"></i>&nbsp; Cancel</Button>
                    <Button name={dashboardItem[2].clusterName}  id={dashboardItem[0].name} color={(theStatus.toString() === 'READY' || theStatus.toString() === 'BOOTSTRAP_FAILED') ? 'danger' : 'warning'} onClick={this.directorDeleteStack.bind(this)} disabled={!(theStatus.toString() === 'READY' || theStatus.toString() === 'BOOTSTRAP_FAILED') }><i className="fa fa-remove"></i>&nbsp; Terminate Stack</Button>
                  </ModalFooter>
                </Modal>


                </CardBody>
                <div className="chart-wrapper" style={{ height: '20px', margin: '20px' }}>
                  <Progress className={DirectorProgressClassName(theStatus)} color='white' value={DirectorProgressValue(dashboardItem)} />
                </div>
              </Card>
            </Col>

          }
          )}  

          {/* {dashboardItemList.map((dashboardItem, index) =>
               <Col xs="12" sm="6" lg="3">
               <Card className={DashboardClassName(dashboardItem.state)}>
                 <CardBody className="pb-0">
                   <ButtonGroup className="float-right">
                     <Dropdown id={dashboardItem.id} isOpen={this.state[dashboardItem.id]}  toggle={() => { this.setState({[dashboardItem.id]: !this.state[dashboardItem.id] }); }} >
                       <DropdownToggle caret className="p-0" color="transparent">
                         <i className="icon-settings"></i>
                       </DropdownToggle>
                       <DropdownMenu right>
                         <DropdownItem href={DetailsLink(dashboardItem.id)}>Details</DropdownItem>
                         <DropdownItem href={LibraryLink(dashboardItem.bundle_id)}>Library Bundle</DropdownItem>
                         <DropdownItem href={dashboardItem.ambari_link}>Go to Ambari</DropdownItem>
                       </DropdownMenu>
                     </Dropdown>
                   </ButtonGroup>
                   <div className="text-value">{dashboardItem.cluster_name}</div>
                   <DashboardItemText key={index} dashboardItem={dashboardItem}/>
                 </CardBody>
                 <div className="chart-wrapper" style={{ height: '20px', margin: '20px' }}>
                   <Progress className={ProgressClassName(dashboardItem.state)} color='white' value={dashboardItem.progress}/>
                 </div>
               </Card>
             </Col>
                      
            )} */}


        </Row>

      </div>
    )} else {
      if(this.state.profileError) {

        return <Row>
                  <Col>
                  <div className="chart-wrapper" align="center">
                      <img alt='' src='../../assets/img/cuisine/debugging.png' height="350" width="350"/>
                      <p>&nbsp;</p>
                      <h2>Whoville profile unavailable. Please check that whoville is up.</h2>
                      <Button size="lg" color="danger" onClick={this.refreshPage.bind(this)} ><i className='fa fa-refresh'></i>&nbsp;Refresh</Button>
                      </div>
                  </Col>
              </Row>
      } else if(this.state.cbError){
        return <Row>
                  <Col>
                  <div className="chart-wrapper" align="center">
                      <img alt='' src='../../assets/img/cuisine/broken-link.png' height="350" width="350"/>
                      <p>&nbsp;</p>
                      <h2>Cloudbreak instance unavailable. Deploy a demo first.</h2>
                      <Button size="lg" color="warning" href="#/whoville">Deploy a demo <i className="fa fa-long-arrow-right"></i></Button>
                      </div>
                  </Col>
              </Row>
      } else {
        return <Row>
                  <Col>
                  <div className="chart-wrapper" align="center">
                      <img alt='' src='../../assets/img/cuisine/debugging.png' height="350" width="350"/>
                      <p>&nbsp;</p>
                      <h2>Something is up. Please check your containers.</h2>
                      <Button size="lg" color="danger" onClick={this.refreshPage.bind(this)} ><i className='fa fa-refresh'></i>&nbsp;Refresh</Button>
                      </div>
                  </Col>
              </Row>
      }
      
    }
    
    ;
  }

}

export default Dashboard;
