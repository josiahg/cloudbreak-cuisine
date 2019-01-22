import React, { Component } from 'react';
import {
  Card, CardBody, Row, Col, Button, Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label, Nav, NavItem, NavLink, TabContent, TabPane, CardFooter
} from 'reactstrap';

class Profile extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      profilesData: [],
      profilesTagsData: [],
      profilesCredentialsData: [],
      whovilleData: []
    }
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });
  }


  loadData() {
    fetch('http://localhost:4000/api/profiles/')
      .then(response => response.json())
      .then(data => {
        this.setState({ profilesData: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }
  loadWhovilleData() {
    fetch('http://localhost:4000/api/profiles/whoville')
      .then(response => response.json())
      .then(data => {
        this.setState({ whovilleData: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }


  loadProfileTagData() {
    fetch('http://localhost:4000/api/profiles/tags/')
      .then(response => response.json())
      .then(data => {
        this.setState({ profilesTagsData: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }


  loadProfileCredentialData() {
    fetch('http://localhost:4000/api/profiles/credentials/')
      .then(response => response.json())
      .then(data => {
        this.setState({ profilesCredentialsData: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  componentDidMount() {
    this.loadData()
    this.loadWhovilleData()
    this.loadProfileTagData()
    this.loadProfileCredentialData()
  }


  render() {

    const profileList = this.state.profilesData.filter((profile) => (profile.id.toString() === this.props.match.params.id));
    const whovilleProfile = this.state.whovilleData.filter((whoville) => (whoville.profile_id.toString() === this.props.match.params.id))
    const whovilleProfileID = whovilleProfile.map((whoville) => whoville.id);
    const tagData = this.state.profilesTagsData.filter((tags) => (tags.whoville_profile_id.toString() === whovilleProfileID.toString()));
    const credentialData = this.state.profilesCredentialsData.filter((credentials) => (credentials.whoville_profile_id.toString() === whovilleProfileID.toString()));

    return (
      <div className="animated fadeIn">


        {profileList.map((profile) =>
          <Row>
            <Col xs={6} md={4}>
              <Card className="card-accent-secondary">
                <CardBody >
                  <div className="chart-wrapper" align="center" >
                    <p><img alt='' src={profile.img} height="300px" width="300px" /></p>
                  </div>
                </CardBody>
                <CardFooter className="bg-white">
                  <table width="100%">
                    <tbody>
                      <tr>
                        <td align="center" width="33%">
                          <Button outline color="secondary" href="#/profiles">
                            <i className="fa fa-long-arrow-left" ></i>&nbsp;Back
                           </Button>
                        </td>
                        <td align="center" width="33%">
                          <Button color="warning" disabled>
                            <i className="icon-note"></i>&nbsp;Edit
                           </Button>
                        </td>
                        <td align="center" width="33%">
                          <Button color="danger" disabled>
                            <i className="fa fa-remove"></i>&nbsp;Delete
                           </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </CardFooter>
              </Card>

            </Col>
            <Col xs={12} md={8}>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab[3] === '1'}
                    onClick={() => { this.toggle(3, '1'); }}
                  ><h3>Overview</h3></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab[3] === '2'}
                    onClick={() => { this.toggle(3, '2'); }}
                  ><h3>Whoville</h3>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab[3] === '3'}
                    onClick={() => { this.toggle(3, '3'); }} ><h3>Tags</h3>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab[3] === '4'}
                    onClick={() => { this.toggle(3, '4'); }} ><h3>Credentials</h3>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab[3]}>
                <TabPane tabId="1">
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
                          <Input type="text" id="profileID" name="profileID" value={profile.id} />
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
                          <Input type="text" id="profileName" name="profileName" value={profile.name} />
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
                            <option>{profile.user_name}</option>
                          </Input>
                        </InputGroup>
                      </Col>
                    </FormGroup>

                  </Form>

                </TabPane>
                <TabPane tabId="2">
                  {whovilleProfile.map((whoville) => {
                    return <Form>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="name">Whoville Profile ID</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-bullseye"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="whovilleProfileID" name="whovilleProfileID" value={whoville.id} />
                          </InputGroup>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="name">Namespace</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-tasks"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="whovilleNamespace" name="whovilleNamespace" value={whoville.namespace} />
                          </InputGroup>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="name">User Mode</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="icon-wrench"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="whovilleUserMode" name="whovilleUserMode" value={whoville.user_mode} />
                          </InputGroup>
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="name">Cloudbreak URL</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-link"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="whovilleCBURL" name="whovilleCBURL" value={whoville.cb_url} />
                          </InputGroup>
                        </Col>
                      </FormGroup>


                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="name">Default User</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="whovilleDefaultUser" name="whovilleDefaultUser" value={whoville.default_user} />
                          </InputGroup>
                        </Col>
                      </FormGroup>


                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="name">Default Email</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-envelope"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="whovilleDefaultEmail" name="whovilleDefaultEmail" value={whoville.default_email} />
                          </InputGroup>
                        </Col>
                      </FormGroup>


                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="name">Default Password</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="icon-lock"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="whovilleDefaultPassword" name="whovilleDefaultPassowrd" value={whoville.default_pwd} />
                          </InputGroup>
                        </Col>
                      </FormGroup>
                    </Form>

                  }
                  )}

                </TabPane>
                <TabPane tabId="3">
                  {tagData.map((tags) => {
                    return <Form>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="name">Tag ID</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-bullseye"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="tagId" name="tagId" value={tags.id} />
                          </InputGroup>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="name">Tag Name</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-align-justify"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="tagName" name="tagName" value={tags.tag_name} />
                          </InputGroup>
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="name">Tag Value</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-code"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="tagValue" name="tagValue" value={tags.tag_value} />
                          </InputGroup>
                        </Col>
                      </FormGroup>

                      <br />
                    </Form>

                  }
                  )}
                </TabPane>
                <TabPane tabId="4">
                  {credentialData.map((credentials) => {
                    return <Form>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="name">Credential ID</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-bullseye"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="credID" name="credID" value={credentials.id} />
                          </InputGroup>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="name">Credential type</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-cloud"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="credType" name="credType" value={credentials.type} />
                          </InputGroup>
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="name">Provider</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-amazon"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="credProvider" name="credProvider" value={credentials.provider} />
                          </InputGroup>
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="name">Region</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-globe"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="credRegion" name="credRegion" value={credentials.region} />
                          </InputGroup>
                        </Col>
                      </FormGroup>


                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="name">Bucket</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-folder-open-o"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="credBucket" name="credBucket" value={credentials.bucket} />
                          </InputGroup>
                        </Col>
                      </FormGroup>


                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="name">Bucket Role</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="icon-wrench"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="credBucketRole" name="credBucketRole" value={credentials.bucket_role} />
                          </InputGroup>
                        </Col>
                      </FormGroup>
                    </Form>

                  }
                  )}
                </TabPane>
              </TabContent>

            </Col>
          </Row>
        )}
      </div>
    )
  }
}

export default Profile;
