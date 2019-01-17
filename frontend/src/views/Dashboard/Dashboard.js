import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import dashboardData from './DashboardData'

// Brand Card Chart
function ProgressClassName(state) {
  var class_name = "progress-xs my-3 bg-info"
  
  if(state.toString()=="AVAILABLE"){
    class_name = "progress-xs my-3 bg-info"
  } else if ((state.toString()=="UPDATE_IN_PROGRESS") || (state.toString()=="CREATE_IN_PROGRESS") || (state.toString()=="START_IN_PROGRESS") || (state.toString()=="DELETE_IN_PROGRESS")) {
    class_name = "progress-xs my-3 bg-secondary"
  } else if (state.toString()=="UPDATE_IN_PROGRESS") {
    class_name = "progress-xs my-3 bg-red"
  }

  
  return (
    class_name
  )
}
function DashboardClassName(state) {
  var class_name = "text-white bg-primary border-primary"
  
  if(state.toString()=="AVAILABLE"){
    class_name = "text-white bg-success border-success"
  } else if ((state.toString()=="UPDATE_IN_PROGRESS") || (state.toString()=="CREATE_IN_PROGRESS") || (state.toString()=="START_IN_PROGRESS") || (state.toString()=="DELETE_IN_PROGRESS")) {
    class_name = "text-white bg-gray-600 border-gray-600"
  } else if ((state.toString()=="CREATE_FAILED") || (state.toString()=="UPDATE_FAILED")) {
    class_name = "text-white bg-danger border-danger"
  }

  
  return (
    class_name
  )
}

function LibraryLink(bundle_id) {
  var link = '#/library/' + bundle_id
  return(
    link
  )
}



function DashboardItemText(props) {
  const dashboardItem = props.dashboardItem
  const state = dashboardItem.status
  var widget_text = "No creation info"
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


  if(state.toString()=="AVAILABLE"){
    const date = new Date(dashboardItem.cluster.creationFinished);
    widget_text = "Creation finished " + date.toLocaleDateString() + " "+ date.toLocaleTimeString();
  } else if ((state.toString()=="UPDATE_IN_PROGRESS") || (state.toString()=="CREATE_IN_PROGRESS") || (state.toString()=="START_IN_PROGRESS") || (state.toString()=="DELETE_IN_PROGRESS")) {
    const date = new Date(parseInt(dashboardItem.defaultTags["cb-creation-timestamp"]));
    widget_text = "Creation started " + date.toLocaleDateString()  + " "+ date.toLocaleTimeString();
  } else if ((state.toString()=="CREATE_FAILED") || (state.toString()=="UPDATE_FAILED")) {
    //const date = dashboardItem.fail_date
    widget_text = "Failed" 
  }
  
  return (
      
    <div>{widget_text.toString()}</div>
          
  )
}

function ProgressValue(state) {
  var value = '0'
  
  if(state.toString()=="AVAILABLE"){
    value = '100'
  } else if (state.toString()=="UPDATE_IN_PROGRESS") {
    value = '50'
  } else if (state.toString()=="failed") {
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

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      token : '',
      clusterData: []
    };
  }

  goToBundle = (e) => {
    var nameArray=e.target.id.split("-")

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
      this.props.history.push('whoville/'+data['id'])

    })
    .catch(err => console.error(this.props.url, err.toString()))
      
  
  
 

}

getClusterData() {
  fetch('http://localhost:4000/api/dashboard/getCB')
            .then(response => response.json())
            .then(cbData => {
              fetch('http://localhost:4000/api/dashboard/gettoken', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  user: 'admin@example.com',
                  password: 'admin-password1',
                  cb_url: cbData
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
                        cb_url: cbData
                      })
                    })
                        .then(response => response.json())
                        .then(data => {
                            this.setState({clusterData: data})
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

componentDidMount() {
    this.initData()
    this.getClusterData()
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
  refreshPage(){
    window.location.reload();
  }
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  
  render() {

    const dashboardItemList = dashboardData.filter((dashboardItem) => dashboardItem.id)
    
    const bundleList = this.state.clusterData.filter((bundle) => bundle.name);

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
          <h1>Deployed Bundles</h1>
          </Col>
                          <Col align="right" > 
                          <div >
                          <Button size="lg" color="primary" onClick={this.refreshPage.bind(this)}>
                                          <i className="fa fa-refresh"></i>&nbsp;Refresh
                              </Button>
                              &nbsp;
                              <Button size="lg" color="danger">
                                          <i className="fa fa-bomb"></i>&nbsp;Nuke
                              </Button>
                          </div>
                          </Col>
          </Row>
        <Row>
          &nbsp;
        </Row>
        <Row>

          {bundleList.map((dashboardItem, index) =>
              <Col xs="12" sm="6" lg="3">
                <Card className={DashboardClassName(dashboardItem.status)}>
                 <CardBody className="pb-0">
                   <ButtonGroup className="float-right">
                     <Dropdown id={dashboardItem.name} isOpen={this.state[dashboardItem.name]}  toggle={() => { this.setState({[dashboardItem.name]: !this.state[dashboardItem.name] }); }} >
                       <DropdownToggle caret className="p-0" color="transparent">
                         <i className="icon-settings"></i>
                       </DropdownToggle>
                       <DropdownMenu right>
                         {/* <DropdownItem><i className="icon-eyeglass"></i>&nbsp;Details</DropdownItem> */}
                         <DropdownItem id={dashboardItem.name} onClick={this.goToBundle.bind(this)}><i className="fa fa-building-o"></i>&nbsp;Whoville Bundle</DropdownItem>
                         <DropdownItem href={dashboardItem.cluster.ambariServerUrl} target="_blank"><i className="fa fa-external-link"></i>&nbsp;Go to Ambari</DropdownItem>
                         <DropdownItem><i className="fa fa-remove"></i>&nbsp;Destroy</DropdownItem>
                       </DropdownMenu>
                     </Dropdown>
                   </ButtonGroup>
                   <div className="text-value">{dashboardItem.name}</div>
                   <DashboardItemText key={index} dashboardItem={dashboardItem}/>
                 </CardBody>
                 <div className="chart-wrapper" style={{ height: '20px', margin: '20px' }}>
                   <Progress className={ProgressClassName(dashboardItem.status)} color='white' value={dashboardItem.progress} value={ProgressValue(dashboardItem.status)}/>
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
