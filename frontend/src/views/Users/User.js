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

function UserDetails(props) {
  const user = props.user

  return (
    <CardBody>
      <FormGroup row>
        <Col md="3">
          <Label htmlFor="name">User ID</Label>
        </Col>   
        <Col xs="12" md="9">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText><i className="fa fa-bullseye"></i></InputGroupText>
            </InputGroupAddon>
            <Input type="text" id="userID" name="userID" value={user.id} disabled/>
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
            <Input type="text" id="name" name="name" value={user.name} disabled/>
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
            <Input type="text" id="username" name="username" value={user.username} disabled/>
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
            <Input type="password" id="password" name="password" value={user.password} disabled/>
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
            <Input type="text" id="email" name="email" value={user.email} disabled/>
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
            <Input type="select" id="role" name="role" disabled>
                  <option>{user.role}</option>
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
                  <option>{user.status}</option>
              </Input>
          </InputGroup>
        </Col>     
      </FormGroup>
      

      <FormGroup row>
                    
                    <Col md="3">
                      &nbsp;
                      </Col>
                      <Col xs="12" md="9" align="right">
                     
                      <Button size="lg" color="warning" href ={"#/editusers/"+user.id} disabled>
                                        <i className="icon-note" ></i>&nbsp;Edit
                                    </Button>
                                    &nbsp;
                                   <Button size="lg" color="danger" href ="#/users">
                                        <i className="fa fa-ban" ></i>&nbsp;Back
                                    </Button>
                      
                    </Col>
                   </FormGroup>

    </CardBody>
  )
  
}



class User extends Component {
  constructor(props) {
    super(props)
      this.state = { usersData: [] }
  }

  loadData() {
    fetch('http://localhost:4000/api/users/')
        .then(response => response.json())
        .then(data => {
            this.setState({usersData: data})
        })
        .catch(err => console.error(this.props.url, err.toString()))
}

componentDidMount() {
    this.loadData()
}


  render() {
    
    const userList = this.state.usersData.filter((user) => (user.id.toString() === this.props.match.params.id) );

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
          <Card className="border-primary">
            <CardHeader className="text-white bg-primary">
              <h2>View User</h2>
            </CardHeader>
              {userList.map((user) =>
                  <UserDetails user={user}/>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default User;
