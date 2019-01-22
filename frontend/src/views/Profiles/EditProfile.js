import React, { Component } from 'react';
import Base64 from 'base-64';
import {
  Card, CardBody, CardHeader, Row, Col, Button, Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Nav, NavItem, NavLink, TabContent, TabPane
} from 'reactstrap';

//import profilesData from './ProfilesData'

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('3'),
      profilesData: [],
      nextId: [],
      userList: [],
      profileId: 0,
      profileType: 'Cloudbreak',
      profileName: '',
      associatedUser: '',
      baseURL: '',
      cloudType: 'AWS',
      status: 'Active',
      file: ''
    };
  }


  loadData() {
    fetch('http://localhost:4000/api/profiles/')
      .then(response => response.json())
      .then(data => {
        data.map((profile) => this.setState({
          profileId: profile.id,
          profileType: profile.profile_type,
          profileName: profile.name,
          associatedUser: profile.user_name,
          baseURL: profile.base_url,
          cloudType: profile.cloud_type,
          status: profile.status,
          file: profile.profile_file
        }))
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  loadUserData() {
    fetch('http://localhost:4000/api/users')
      .then(response => response.json())
      .then(data => {
        this.setState({ userList: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  componentDidMount() {
    this.loadData()
    this.loadUserData()
  }

  deleteProfile = (e) => {
    fetch('http://localhost:4000/api/profiles/del/' + e.target.id, {
      method: 'POST',
      headers: {},
      body: JSON.stringify({})
    })
    this.props.history.push('profiles')

  }

  handlefileEntryChange = (e) => {
    this.setState({ file: Base64.encode(e.target.value) });
  }

  handleassociatedUserChange = (e) => {
    this.setState({ associatedUser: e.target.value });
  }

  handlestatusChange = (e) => {
    this.setState({ status: e.target.value });
  }
  handlebaseURLChange = (e) => {
    this.setState({ baseURL: e.target.value });
  }

  handleprofileTypeChange = (e) => {
    this.setState({ profileType: e.target.value });
  }

  handleprofileNameChange = (e) => {
    this.setState({ profileName: e.target.value });
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });
  }


  render() {


    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card className="border-warning">
              <CardHeader className="text-white bg-warning">
                <h2>Edit Profile</h2>
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
                        <Input type="text" id="profileID" name="profileID" value={this.state.profileId} disabled />
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
                        <Input type="select" id="profileType" name="profileType" onChange={this.handleprofileTypeChange}>
                          <option selected={this.state.profileType.toString() === 'Cloudbreak'}>Cloudbreak</option>
                          <option selected={this.state.profileType.toString() === 'Director'}>Director</option>
                          <option selected={this.state.profileType.toString() === 'Whoville'}>Whoville</option>
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
                        <Input type="text" id="profileName" name="profileName" value={this.state.profileName} onChange={this.handleprofileNameChange} required />
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
                        <Input type="select" id="associatedUserName" name="associatedUserName" onChange={this.handleassociatedUserChange}>
                          <option>{this.state.associatedUser}</option>
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
                        <Input type="text" id="baseURL" name="baseURL" value={this.state.baseURL} onChange={this.handlebaseURLChange} required />
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
                          <option selected={this.state.cloudType.toString() === 'GCP'}>GCP</option>
                          <option selected={this.state.cloudType.toString() === 'AWS'}>AWS</option>
                          <option selected={this.state.cloudType.toString() === 'Azure'}>Azure</option>
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
                          <option selected={this.state.status.toString() === 'Active'}>Active</option>
                          <option selected={this.state.status.toString() === 'Inactive'}>Inactive</option>
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
                        <TabPane tabId="1">
                          <Button size="lg" color="success" disabled>
                            <i className="fa fa-upload"></i>&nbsp;Upload
                                </Button>
                        </TabPane>
                        <TabPane tabId="2">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-link"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="recipeURL" name="recipeURL" placeholder="Enter URL" disabled />
                          </InputGroup>
                        </TabPane>
                        <TabPane tabId="3">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-code"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="textarea" rows="20" id="recipeCode" name="recipeCode" value={Base64.decode(this.state.file)} />
                          </InputGroup>
                        </TabPane>
                      </TabContent>

                    </Col>
                  </FormGroup>
                  <FormGroup row>

                    <Col md="3">
                      &nbsp;
                 </Col>
                    <Col xs="12" md="9" align="right">
                      <Button size="lg" outline color="primary" href="#/profiles">
                        <i className="fa fa-long-arrow-left"></i> Back
                            </Button>
                      &nbsp;
                 <Button size="lg" color="primary">
                        <i className="fa fa-save"></i>&nbsp;Save
                               </Button>
                      &nbsp;
                              <Button size="lg" color="danger" onClick={this.deleteProfile.bind(this)} disabled={this.state.profileId < 2}>
                        <i className="fa fa-remove" ></i>&nbsp;Delete
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

export default EditProfile;
