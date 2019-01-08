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

function ProfileDetails() {
 

  return (
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
          <Label htmlFor="name">Profile File</Label>
        </Col>   
        <Col xs="12" md="9">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText><i className="fa fa-file-code-o"></i></InputGroupText>
            </InputGroupAddon>
            <Input type="text" id="baseURL" name="baseURL" placeholder="Enter a location for profile file"/>
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

    
  )
  
}



class AddProfile extends Component {

  render() {

    
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
          <Card className="border-success">
            <CardHeader className="text-white bg-success">
              <h2>Add Profile</h2>
            </CardHeader>
            
                  <ProfileDetails />
            
             
            </Card>
          </Col>
          
        </Row>
      </div>
    )
  }
}

export default AddProfile;
