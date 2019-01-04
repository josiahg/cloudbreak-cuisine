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
  
  if(state.toString()=="creating"){
    class_name = "progress-xs my-3 bg-info"
  } else if (state.toString()=="created") {
    class_name = "progress-xs my-3 bg-info"
  } else if (state.toString()=="failed") {
    class_name = "progress-xs my-3 bg-red"
  }

  
  return (
    class_name
  )
}
function DashboardClassName(state) {
  var class_name = "text-white bg-primary border-primary"
  
  if(state.toString()=="creating"){
    class_name = "text-white bg-primary border-primary"
  } else if (state.toString()=="created") {
    class_name = "text-white bg-success border-success"
  } else if (state.toString()=="failed") {
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

function DetailsLink(cluster_id) {
  var link = '#/dashboard/' + cluster_id
  return(
    link
  )
}

function DashboardItemText(props) {
  const dashboardItem = props.dashboardItem
  const state = dashboardItem.state
  var widget_text = "No creation info"
  
  if(state.toString()=="creating"){
    const date = dashboardItem.start_date
    widget_text = "Create started " + date.toString()
  } else if (state.toString()=="created") {
    const date = dashboardItem.create_date
    widget_text = "Created " + date.toString()
  } else if (state.toString()=="failed") {
    const date = dashboardItem.fail_date
    widget_text = "Creation failed " + date.toString()
  }
  
  return (
      
    <div>{widget_text.toString()}</div>
          
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
    };
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

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  
  render() {

    const dashboardItemList = dashboardData.filter((dashboardItem) => dashboardItem.id)
    
   

    return (
      <div className="animated fadeIn">
        <h1>Deployed Bundles</h1>
        <Row>
          &nbsp;
        </Row>
        <Row>

            {dashboardItemList.map((dashboardItem, index) =>
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
                      
            )}
            
       
        </Row>
      
      </div>
    );
  }
}

export default Dashboard;
