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

function ProgressClassName(state) {
  var class_name = "progress-xs my-3 bg-info"

  if (state.toString() === "AVAILABLE") {
    class_name = "progress-xs my-3 bg-info"
  } else if ((state.toString() === "UPDATE_IN_PROGRESS") || (state.toString() === "CREATE_IN_PROGRESS") || (state.toString() === "START_IN_PROGRESS")) {
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
function DashboardClassName(state) {
  var class_name = "text-white bg-primary border-primary"

  if (state.toString() === "AVAILABLE") {
    class_name = "text-white bg-success border-success"
  } else if ((state.toString() === "UPDATE_IN_PROGRESS") || (state.toString() === "CREATE_IN_PROGRESS") || (state.toString() === "START_IN_PROGRESS")) {
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

/*function LibraryLink(bundle_id) {
  var link = '#/library/' + bundle_id
  return (
    link
  )
}*/

function DashboardItemText(props) {
  const dashboardItem = props.dashboardItem
  const state = dashboardItem.status
  var widget_text = "No creation info"

  if (state.toString() === "AVAILABLE") {
    widget_text = "Status: " + state;
  } else if ((state.toString() === "UPDATE_IN_PROGRESS") || (state.toString() === "CREATE_IN_PROGRESS") || (state.toString() === "START_IN_PROGRESS") || (state.toString() === "DELETE_IN_PROGRESS")) {
    widget_text = "Status: " + state;
  } else if ((state.toString() === "CREATE_FAILED") || (state.toString() === "UPDATE_FAILED")) {
    //const date = dashboardItem.fail_date
    widget_text = "Status: " + state;
  }

  return (

    <div>{widget_text.toString()}</div>

  )
}

function ProgressValue(state) {
  var value = '0'

  if (state.toString() === "AVAILABLE") {
    value = '100'
  } else if ((state.toString() === "UPDATE_IN_PROGRESS") || (state.toString() === "DELETE_IN_PROGRESS")) {
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
      dropdownOpen: false,
      radioSelected: 2,
      token: '',
      clusterData: [],
      loading: true,
      modal: false,
      deletion: false
    };
  }

  deleteStack = (e) => {
    
    this.setState({['modal'+e.target.id]: !this.state['modal'+e.target.id]})
      fetch('http://localhost:4000/api/whoville/deletestack/' + e.target.id)
          .then(response => response.json())
          .catch(err => console.error(this.props.url, err.toString()))

      
  }

  goToBundle = (e) => {
    var nameArray = e.target.id.split("-")
    //for (i )
    fetch('http://localhost:4000/api/dashboard/getbundleid', {
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

  getClusterData() {
    fetch('http://localhost:4000/api/profiles/whoville')
      .then(response => response.json())
      .then(profileData => {
        fetch('http://localhost:4000/api/dashboard/gettoken', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: profileData[0].default_email.toString(),
            password: profileData[0].default_pwd.toString(),
            cb_url: profileData[0].cb_url.toString()
          })
        })
          .then(response => response.json())
          .then(data => {
            fetch('http://localhost:4000/api/dashboard/getclusters', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                token: data,
                cb_url: profileData[0].cb_url.toString()
              })
            })
              .then(response => response.json())
              .then(data => {
                this.setState({ clusterData: data })
              })
              .catch(err => console.error(this.props.url, err.toString()))
          })
          .catch(err => console.error(this.props.url, err.toString()))
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  initData() {
    fetch('http://localhost:4000/api/whoville/refresh')
      .then(response => response.json())
      .catch(err => console.error(this.props.url, err.toString()))
  }

  initProfileData() {
    fetch('http://localhost:4000/api/whoville/refreshprofile')
      .then(response => response.json())
      .catch(err => console.error(this.props.url, err.toString()))
  }

  async componentDidMount(){
    const initWhoville = await fetch('http://localhost:4000/api/whoville/refresh')
    const resWhoville = await initWhoville.json()
    const initProfile = await fetch('http://localhost:4000/api/whoville/refreshprofile')
    const resProfile = await initProfile.json()
    
    const initWhovilleProfile = await fetch('http://localhost:4000/api/profiles/whoville');
    const whovilleProfile = await initWhovilleProfile.json()

    const initCBToken = await fetch('http://localhost:4000/api/dashboard/gettoken', {
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
   
    const initClusterData = await fetch('http://localhost:4000/api/dashboard/getclusters', {
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
    this.setState({ clusterData: fetchedClusterData, loading: false})

    // fetch('http://localhost:4000/api/profiles/whoville')
    // .then(response => response.json())
    // .then(profileData => {
    //   fetch('http://localhost:4000/api/dashboard/gettoken', {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       user: profileData[0].default_email.toString(),
    //       password: profileData[0].default_pwd.toString(),
    //       cb_url: profileData[0].cb_url.toString()
    //     })
    //   })
    //     .then(response => response.json())
    //     .then(data => {
    //       fetch('http://localhost:4000/api/dashboard/getclusters', {
    //         method: 'POST',
    //         headers: {
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           token: data,
    //           cb_url: profileData[0].cb_url.toString()
    //         })
    //       })
    //         .then(response => response.json())
    //         .then(data => {
    //           this.setState({ clusterData: data })
    //         })
    //     })
    // }).then( this.setState({loading: false}))
    // .catch(err => console.error(this.props.url, err.toString()))
    //const initCbData = await cbData.json()
   
  
    
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
    //const dashboardItemList = dashboardData.filter((dashboardItem) => dashboardItem.id)
    const bundleList = this.state.clusterData.filter((bundle) => bundle.name);

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
                              <Button size="lg" color="danger" disabled>
                <i className="fa fa-bomb"></i>&nbsp;Nuke
                              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
          <h1><i className={isLoading ? 'fa fa-spinner fa-spin' : ''}></i></h1>
          </Col>
        </Row>
        <Row>
          
          {bundleList.map((dashboardItem, index) =>
            <Col xs="12" sm="6" lg="3">
              <Card className={DashboardClassName(dashboardItem.status)}>

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
                        <DropdownItem name={dashboardItem.name} id={dashboardItem.status} onClick={() => { this.setState({ ['modal'+dashboardItem.name]: !this.state['modal'+dashboardItem.name] }); }}><i className="fa fa-remove"></i>&nbsp;Terminate</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </ButtonGroup>
                  <div className="text-value">{dashboardItem.name}</div>
                  <DashboardItemText key={index} dashboardItem={dashboardItem} />
                  <Modal isOpen={this.state['modal'+dashboardItem.name]} toggle={() => { this.setState({ ['modal'+dashboardItem.name]: !this.state['modal'+dashboardItem.name] }); }}
                       className={'modal-'+(dashboardItem.status.toString() === 'AVAILABLE' ? 'danger ' : 'warning ')+' ' + this.props.className}>
                  <ModalHeader toggle={() => { this.setState({ ['modal'+dashboardItem.name]: !this.state['modal'+dashboardItem.name] }); }}>Deleting Stack</ModalHeader>
                  <ModalBody>
                  <h3>{dashboardItem.status.toString() === 'AVAILABLE' ? 'Are you sure you want to terminate this stack?' : "You can only delete stacks when they are in status AVAILABLE"} </h3>
                  </ModalBody>
                  <ModalFooter>
                  <Button color='secondary' onClick={() => { this.setState({ ['modal'+dashboardItem.name]: !this.state['modal'+dashboardItem.name] }); }}><i className="icon-ban"></i>&nbsp; Cancel</Button>
                    <Button id={dashboardItem.name} color={dashboardItem.status.toString() === 'AVAILABLE' ? 'danger' : 'warning'} onClick={this.deleteStack.bind(this)} disabled={!(dashboardItem.status.toString() === 'AVAILABLE')}><i className="fa fa-remove"></i>&nbsp; Terminate Stack</Button>
                  </ModalFooter>
                </Modal>
                </CardBody>
                <div className="chart-wrapper" style={{ height: '20px', margin: '20px' }}>
                  <Progress className={ProgressClassName(dashboardItem.status)} color='white' value={dashboardItem.progress} value={ProgressValue(dashboardItem.status)} />
                </div>
              </Card>
            </Col>

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
    );
  }

}

export default Dashboard;
