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
  Table, Badge, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

import profilesData from './ProfilesData'

function ProfileDetails(props) {
  const profile = props.profile

  return (
    <CardBody>
      <FormGroup row>
        <Col md="3">
          <Label htmlFor="name">Profile ID</Label>
        </Col>   
        <Col xs="12" md="9">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText><i className="fa fa-bullseye"></i></InputGroupText>
            </InputGroupAddon>
            <Input type="text" id="profileID" name="profileID" placeholder={profile.id} disabled/>
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
              <Input type="select" id="profileType" name="profileType" disabled>
                  <option>{profile.profile_type}</option>
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
            <Input type="text" id="profileName" name="profileName" placeholder={profile.name} disabled/>
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
            <Input type="select" id="associatedUserName" name="associatedUserName" disabled>
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
            <Input type="text" id="baseURL" name="baseURL" placeholder={profile.base_url} disabled/>
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
            <Input type="select" id="cloudType" name="cloudType" disabled>
                  <option>{profile.cloud_type}</option>
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
            <Input type="text" id="baseURL" name="baseURL" placeholder={profile.profile_file_location} disabled/>
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
            <Input type="select" id="status" name="status" disabled>
                  <option>{profile.status}</option>
              </Input>
          </InputGroup>
        </Col>     
      </FormGroup>


    </CardBody>
  )
  
}



class Profile extends Component {

  render() {

    const profileList = profilesData.filter((profile) => (profile.id.toString() === this.props.match.params.id));
    
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
          <Card className="border-primary">
            <CardHeader className="text-white bg-primary">
              <h2>View Profile</h2>
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

export default Profile;
