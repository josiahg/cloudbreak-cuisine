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

function ProfileDetails(props) {
  const profile = props.profile

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
            <Input type="text" id="profileID" name="profileID" value={profile.id} disabled/>
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
                  <option selected={profile.profile_type.toString() === 'Cloudbreak'}>Cloudbreak</option>
                  <option selected={profile.profile_type.toString() === 'Director'}>Director</option>
                  <option selected={profile.profile_type.toString() === 'Whoville'}>Whoville</option>
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
            <Input type="text" id="profileName" name="profileName" value={profile.name}/>
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
                  <option>{profile.associated_user_name}</option>
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
            <Input type="text" id="baseURL" name="baseURL" value={profile.base_url}/>
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
                  <option selected={profile.cloud_type.toString() === 'GCP'}>GCP</option>
                  <option selected={profile.cloud_type.toString() === 'AWS'}>AWS</option>
                  <option selected={profile.cloud_type.toString() === 'Azure'}>Azure</option>
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
            <Input type="text" id="baseURL" name="baseURL" value={profile.profile_file_location}/>
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
                  <option selected={profile.status.toString() === 'Active'}>Active</option>
                  <option selected={profile.status.toString() === 'Inactive'}>Inactive</option>
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



class EditProfile extends Component {

  render() {

    const profileList = profilesData.filter((profile) => (profile.id.toString() === this.props.match.params.id));
    
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
          <Card className="border-warning">
            <CardHeader className="text-white bg-warning">
              <h2>Edit Profile</h2>
            </CardHeader>
            
              {profileList.map((profile) =>
                  <ProfileDetails profile={profile}/>
              )}
             
            </Card>
          </Col>
          
        </Row>
      </div>
    )
  }
}

export default EditProfile;
