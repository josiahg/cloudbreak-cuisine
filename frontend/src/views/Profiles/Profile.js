import React,  { Component } from 'react';
import Base64 from 'base-64';
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
                  <option>{profile.user_name}</option>
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
            <Input type="textarea" rows="20" id="profileFile" name="profileFile" value={Base64.decode(profile.profile_file)} disabled/>
          </InputGroup>
        </Col>     
      </FormGroup>

      <FormGroup row>
                    
                    <Col md="3">
                      &nbsp;
                      </Col>
                      <Col xs="12" md="9" align="right">
                     
                      <Button size="lg" color="warning" href ={"#/editprofiles/"+profile.id} disabled>
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
  constructor(props) {
    super(props)
      this.state = { profilesData: [] }
  }

  loadData() {
    fetch('http://localhost:4000/api/profiles/')
        .then(response => response.json())
        .then(data => {
            this.setState({profilesData: data})
        })
        .catch(err => console.error(this.props.url, err.toString()))
}

componentDidMount() {
    this.loadData()
}


  render() {
    
    const profileList = this.state.profilesData.filter((profile) => (profile.id.toString() === this.props.match.params.id) );

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
