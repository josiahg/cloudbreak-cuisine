import React, { Component } from 'react';
import {
  Card, CardBody, Row, Col, Button,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label, Nav, NavItem, NavLink, TabContent, TabPane, CardFooter
} from 'reactstrap';


class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: new Array(4).fill('1'),
      usersData: []
    }
  }

  loadData() {
    fetch('http://localhost:4000/api/users/')
      .then(response => response.json())
      .then(data => {
        this.setState({ usersData: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  componentDidMount() {
    this.loadData()
  }


  render() {

    const userList = this.state.usersData.filter((user) => (user.id.toString() === this.props.match.params.id));

    return (
      <div className="animated fadeIn">

        {userList.map((user) => (

          <Row>
            <Col xs={6} md={4}>
              <Card className="card-accent-secondary">
                <CardBody >
                  <div className="chart-wrapper" align="center" >
                    <p><img alt='' src={user.img} height="300px" width="300px" /></p>
                  </div>
                </CardBody>
                <CardFooter className="bg-white">
                  <table width="100%">
                    <tbody>
                      <tr>
                        <td align="center" width="33%">
                          <Button outline color="secondary" href="#/users">
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
                    active

                  ><h3>User Details</h3></NavLink>
                </NavItem>

              </Nav>
              <TabContent activeTab={this.state.activeTab[1]}>
                <TabPane tabId="1">
                  <br />

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="name">User ID</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="fa fa-bullseye"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="userID" name="userID" value={user.id} />
                      </InputGroup>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="name">Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="fa fa-align-justify"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="name" name="name" value={user.name} />
                      </InputGroup>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="name">Username</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="username" name="username" value={user.username} />
                      </InputGroup>
                    </Col>
                  </FormGroup>


                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="name">Password</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="icon-lock"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" id="password" name="password" value={user.password} />
                      </InputGroup>
                    </Col>
                  </FormGroup>


                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="name">e-mail</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="fa fa-envelope"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="email" name="email" value={user.email} />
                      </InputGroup>
                    </Col>
                  </FormGroup>



                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="name">Role</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="icon-wrench"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input type="select" id="role" name="role" >
                          <option>{user.role}</option>
                        </Input>
                      </InputGroup>
                    </Col>
                  </FormGroup>




                </TabPane>
              </TabContent>


            </Col>
          </Row>

        )
        )}

      </div>
    )
  }
}

export default User;
