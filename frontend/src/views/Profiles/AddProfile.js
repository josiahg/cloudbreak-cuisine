import React, { Component } from 'react';
import Base64 from 'base-64';
import {
  Card, CardBody, CardHeader, Row, Col, Button, Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label, Nav, NavItem, NavLink, TabContent, TabPane
} from 'reactstrap';





class AddProfile extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('3'),
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
  saveData = (e) => {
    // First, we check that every field is entered 
    if (this.state.baseURL && this.state.profileName && this.state.file) {


      fetch('http://localhost:4000/api/profiles/set', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profileId: this.state.profileId,
          profileType: this.state.profileType,
          profileName: this.state.profileName,
          associatedUser: this.state.associatedUser,
          baseURL: this.state.baseURL,
          file: this.state.file,
          status: this.state.status

        })
      })
      this.props.history.push('profiles')


    }
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



  loadIdData() {
    fetch('http://localhost:4000/api/profiles/nextid')
      .then(response => response.json())
      .then(data => {
        data.map((id) => this.setState({ profileId: id.id }))

      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  loadUserData() {
    fetch('http://localhost:4000/api/users')
      .then(response => response.json())
      .then(data => {
        this.setState({ userList: data })
        data.map((user) => this.setState({ associatedUser: user.username }))
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }



  componentDidMount() {
    this.loadIdData()
    this.loadUserData()
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
                        <Input type="select" id="profileType" name="profileType" value={this.state.profileType} onChange={this.handleprofileTypeChange}>
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
                        <Input type="text" className="form-control-warning" id="profileName" name="profileName" placeholder="Enter a name for your profile" value={this.state.profileName} onChange={this.handleprofileNameChange} required />
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
                        <Input type="select" id="associatedUserName" name="associatedUserName" value={this.state.associatedUser} onChange={this.handleassociatedUserChange}>
                          {this.state.userList.map((user) => {
                            return <option selected={this.state.associatedUser.toString() === user.username.toString()}>{user.username}</option>
                          }
                          )}
                        </Input>
                      </InputGroup>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="name">Base URL</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <InputGroup >
                        <InputGroupAddon addonType="prepend" >
                          <InputGroupText><i className="fa fa-link"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" className="form-control-warning" id="baseURL" name="baseURL" placeholder="Enter the base URL your profile" value={this.state.baseURL} onChange={this.handlebaseURLChange} required />
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
                          <option>GCP</option>
                          <option selected>AWS</option>
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
                        <Input type="select" id="status" name="status" value={this.state.status} onChange={this.handlestatusChange}>
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
                            <Input className="form-control-warning" type="textarea" id="recipeCode" name="recipeCode" placeholder="Enter profile file code" value={Base64.decode(this.state.file)} onChange={this.handlefileEntryChange} required />
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
   <Button size="lg" color="primary" type="submit" onClick={this.saveData}>
                        <i className="fa fa-save"></i>&nbsp;Save
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
