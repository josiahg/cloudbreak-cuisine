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
import { pathToFileURL } from 'url';

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
            <Input type="text" id="profileName" name="profileName" value={profile.name} disabled/>
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
            <Input type="text" id="baseURL" name="baseURL" value={profile.base_url} disabled/>
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
      <FormGroup row>
        <Col md="3">
          <Label htmlFor="name">Profile File</Label>
        </Col>   
        <Col xs="12" md="9">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText><i className="fa fa-code"></i></InputGroupText>
            </InputGroupAddon>
            <Input type="textarea" id="profileFile" name="profileFile" value={'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'} disabled/>
          </InputGroup>
        </Col>     
      </FormGroup>
      
      <FormGroup row>
                    
                    <Col md="3">
                      &nbsp;
                      </Col>
                      <Col xs="12" md="9" align="right">
                     
                      <Button size="lg" color="warning" href ={"#/editprofiles/"+profile.id}>
                                        <i className="icon-note" ></i>&nbsp;Edit
                                    </Button>
                                    &nbsp;
                                   <Button size="lg" color="danger" href ="#/profiles">
                                        <i className="fa fa-ban" ></i>&nbsp;Back
                                    </Button>
                      
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
