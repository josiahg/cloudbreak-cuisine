import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';

import usersData from './UsersData'

function UserRow(props) {
  const user = props.user
  const userLink = `/users/${user.id}`

  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  }

  return (
    <tr key={user.id.toString()}>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.registered}</td>
      <td>{user.role}</td>
      <td><Badge color={getBadge(user.status)}>{user.status}</Badge></td>
      <td><Link to={userLink}><Button size="sm" color="primary">
                                        <i className="icon-eyeglass"></i>&nbsp;View
                                    </Button></Link>
                                    &nbsp;
                                    <Link to={userLink}><Button size="sm" color="warning">
                                        <i className="icon-note"></i>&nbsp;Edit
                                    </Button></Link>
                                    &nbsp;
                                    <Button size="sm" color="danger">
                                        <i className="fa fa-remove"></i>&nbsp;Delete
                                    </Button></td>
    </tr>
  )
}

class Users extends Component {

  render() {

    const userList = usersData.filter((user) => user.id )

    return (
      <div className="animated fadeIn">
      <Row>
                    <Col>
                        <h1>Cuisine Users</h1>
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
                      <th scope="col">Registered</th>
                      <th scope="col">Role</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, index) =>
                      <UserRow key={index} user={user}/>
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
