import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';

import credentialsData from './CredentialsData'

function CredentialRow(props) {
  const credential = props.credential
  const credentialLink = `/credentials/${credential.id}`

  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  }

  return (
    <tr key={credential.id.toString()}>
      <td>{credential.id}</td>
      <td>{credential.name}</td>
      <td>{credential.registered}</td>
      <td><img src={credential.img } height="50px"/></td>
      <td><Badge color={getBadge(credential.status)}>{credential.status}</Badge></td>
      <td><Link to={credentialLink}><Button size="sm" color="primary">
                                        <i className="icon-eyeglass"></i>&nbsp;View
                                    </Button></Link>
                                    &nbsp;
                                    <Link to={credentialLink}><Button size="sm" color="warning">
                                        <i className="icon-note"></i>&nbsp;Edit
                                    </Button></Link>
                                    &nbsp;
                                    <Button size="sm" color="danger">
                                        <i className="fa fa-remove"></i>&nbsp;Delete
                                    </Button></td>
    </tr>
  )
}

class Credentials extends Component {

  render() {

    const credentialList = credentialsData.filter((credential) => credential.id )

    return (
      <div className="animated fadeIn">
      <Row>
                    <Col>
                        <h1>Cuisine credentials</h1>
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
                    {credentialList.map((credential, index) =>
                      <CredentialRow key={index} credential={credential}/>
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

export default Credentials;
