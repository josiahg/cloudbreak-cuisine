import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Progress, Row, Col, Button, Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Table, Badge, Nav, NavItem, NavLink, TabContent, TabPane  } from 'reactstrap';

import profilesData from './ProfilesData'





class AddProfile extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
    };
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
        <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText><i className="fa fa-link"></i></InputGroupText>
        </InputGroupAddon>
        <Input type="text" id="recipeURL" name="recipeURL" placeholder="Enter URL"/>
        </InputGroup>
        </TabPane>
        <TabPane tabId="3">
        <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText><i className="fa fa-code"></i></InputGroupText>
        </InputGroupAddon>
        <Input type="textarea" id="recipeCode" name="recipeCode" placeholder="Enter profile file code"/>
        </InputGroup>
        </TabPane>
      </>
    );
  }
  render() {

    
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
          <Card className="border-success">
            <CardHeader className="text-white bg-success">
              <h2>Add Profile</h2>
            </CardHeader>
            
            <CardBody>
    <Form>
      <FormGroup row>
        <Col md="3">
          <Label htmlFor="name">Profile ID</Label>
        </Col>   
        <Col xs="12" md="9">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText><i className="fa fa-bullseye"></i></InputGroupText>
            </InputGroupAddon>
            <Input type="text" id="profileID" name="profileID" value='2' disabled/>
          </InputGroup>
        </Col>     
      </FormGroup>

      <FormGroup row>
        <Col md="3">
          <Label htmlFor="name">Profile Type</Label>
        </Col>   
        <Col xs="12" md="9">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText><i className="fa fa-cloud"></i></InputGroupText>
            </InputGroupAddon>
              <Input type="select" id="profileType" name="profileType">
                  <option>Cloudbreak</option>
                  <option>Director</option>
                  <option>Whoville</option>
              </Input>
          </InputGroup>
        </Col>     
      </FormGroup>

      <FormGroup row>
        <Col md="3">
          <Label htmlFor="name">Profile Name</Label>
        </Col>   
        <Col xs="12" md="9">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText><i className="fa fa-align-justify"></i></InputGroupText>
            </InputGroupAddon>
            <Input type="text" id="profileName" name="profileName" placeholder="Enter a name for your profile"/>
          </InputGroup>
        </Col>     
      </FormGroup>


      <FormGroup row>
        <Col md="3">
          <Label htmlFor="name">Associated User</Label>
        </Col>   
        <Col xs="12" md="9">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText><i className="fa fa-user"></i></InputGroupText>
            </InputGroupAddon>
            <Input type="select" id="associatedUserName" name="associatedUserName">
                  <option>admin</option>
              </Input>
          </InputGroup>
        </Col>     
      </FormGroup>

      <FormGroup row>
        <Col md="3">
          <Label htmlFor="name">Base URL</Label>
        </Col>   
        <Col xs="12" md="9">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText><i className="fa fa-link"></i></InputGroupText>
            </InputGroupAddon>
            <Input type="text" id="baseURL" name="baseURL" placeholder="Enter the base URL your profile"/>
          </InputGroup>
        </Col>     
      </FormGroup>

      <FormGroup row>
        <Col md="3">
          <Label htmlFor="name">Cloud Type</Label>
        </Col>   
        <Col xs="12" md="9">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText><i className="fa fa-cloud-upload"></i></InputGroupText>
            </InputGroupAddon>
            <Input type="select" id="cloudType" name="cloudType">
                  <option>GCP</option>
                  <option>AWS</option>
                  <option>Azure</option>
              </Input>
          </InputGroup>
        </Col>     
      </FormGroup>
     


      <FormGroup row>
        <Col md="3">
          <Label htmlFor="name">Status</Label>
        </Col>   
        <Col xs="12" md="9">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText><i className="fa fa-times"></i></InputGroupText>
            </InputGroupAddon>
            <Input type="select" id="status" name="status">
                  <option>Active</option>
                  <option>Inactive</option>
              </Input>
          </InputGroup>
        </Col>     
      </FormGroup>
      <FormGroup row>
                                  <Col md="3">
                                    <Label htmlFor="content">Profile File</Label>
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
                            {this.tabPane()}
                          </TabContent>
              
                                  </Col>
                                </FormGroup>
 <FormGroup row>

 <Col md="3">
   &nbsp;
   </Col>
   <Col xs="12" md="9" align="right">
  
   <Button size="lg" color="primary">
                     <i className="fa fa-save"></i>&nbsp;Save
                 </Button>
                 &nbsp;
                <Button size="lg" color="danger" href ="#/profiles">
                     <i className="fa fa-ban" ></i>&nbsp;Cancel
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

export default AddProfile;
