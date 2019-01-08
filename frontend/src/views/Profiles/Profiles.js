import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';

import profilesData from './ProfilesData'

function ProfileRow(props) {
  const profile = props.profile
  const profileLink = `/profiles/${profile.id}`
  const editProfileLink = `/editprofiles/${profile.id}`

  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  }

  
  return (
    <tr key={profile.id.toString()}>
      <td>{profile.id}</td>
      <td>{profile.profile_type}</td>
      <td>{profile.name}</td>
      <td><a href={'#/users/'+ profile.associated_user_id}>{profile.associated_user_name}</a></td>
      <td>{profile.base_url}</td>
      <td><img src={profile.cloud_type_img} height="50px"/></td>
      <td><a href={profile.profile_file_location}>{profile.profile_file}</a></td>
      <td>{profile.registered}</td>
      <td><Badge color={getBadge(profile.status)}>{profile.status}</Badge></td>
      <td><Link to={profileLink}><Button size="sm" color="primary">
                                        <i className="icon-eyeglass"></i>&nbsp;View
                                    </Button></Link>
                                    &nbsp;
                                    <Link to={editProfileLink}><Button size="sm" color="warning">
                                        <i className="icon-note"></i>&nbsp;Edit
                                    </Button></Link>
                                    &nbsp;
                                    <Button size="sm" color="danger" disabled>
                                        <i className="fa fa-remove"></i>&nbsp;Delete
                                    </Button></td>
    </tr>
  )
}

class Profiles extends Component {

  render() {

    const profileList = profilesData.filter((profile) => profile.id )

    return (
      <div className="animated fadeIn">
      <Row>
                    <Col>
                        <h1>Cuisine Profiles</h1>
                        </Col>
                        <Col align="right" > 
                        <div >
                            <Button size="lg" color="success" href="#/AddProfile">
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
                      <th scope="col">Type</th>
                      <th scope="col">Name</th>
                      <th scope="col">Associated User</th>
                      <th scope="col">Base URL</th>
                      <th scope="col">Cloud Type</th>
                      <th scope="col">Profile File</th>
                      <th scope="col">Registered</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profileList.map((profile, index) =>
                      <ProfileRow key={index} profile={profile}/>
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

export default Profiles;
