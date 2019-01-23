import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {  Card, CardBody, Col, Row, Table, Button } from 'reactstrap';


class Users extends Component {

  constructor(props) {
    super(props)
      this.state = { usersData: [] }
  }
  deleteProfile = (e) => {
    fetch('http://localhost:4000/api/users/del/'+e.target.id, {
      method: 'POST',
      headers: {},
      body: JSON.stringify({})
    }).then(this.loadData())
    
}

  loadData() {
    fetch('http://localhost:4000/api/users')
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

    const userList = this.state.usersData.filter((user) => user.id )

    return (
      <div className="animated fadeIn">
      <Row>
                    <Col>
                        <h1>Cuisine Users</h1>
                        </Col>
                        <Col align="right" > 
                        <div >
                            <Button size="lg" color="success" href="#/AddUser" disabled>
                                        <i className="fa fa-plus"></i>&nbsp;Add New
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    
                        &nbsp; 
                    </Col>
                </Row>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Table responsive hover className="table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Username</th>
                      <th scope="col">e-mail</th>
                      <th scope="col">Role</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, index) =>
                      {
                        const userLink = `/users/${user.id}`

                      return <tr key={user.id.toString()}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td><Link to={userLink}><Button size="sm" color="primary">
                                                        <i className="icon-eyeglass"></i>&nbsp;View
                                                    </Button></Link>
                                                    &nbsp;
                                                    <Link to={userLink}><Button size="sm" color="warning" disabled>
                                                        <i className="icon-note"></i>&nbsp;Edit
                                                    </Button></Link>
                                                   </td>
                    </tr>}
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Users;
