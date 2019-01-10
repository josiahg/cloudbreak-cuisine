import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';

// import profilesData from './ProfilesData'

class Profiles extends Component {

  constructor(props) {
    super(props)
      this.state = { profilesData: [] }
  }
  deleteProfile = (e) => {
      fetch('http://localhost:4000/api/profiles/del/'+e.target.id, {
        method: 'POST',
        headers: {},
        body: JSON.stringify({})
      }).then(this.loadData())
      
 }
  loadData() {
      fetch('http://localhost:4000/api/profiles')
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

    const profileList = this.state.profilesData.filter((profile) => profile.id )

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
                      <th scope="col">Registered</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profileList.map((profile, index) =>{
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
                          <td>{profile.user_name}</td>
                          <td>{profile.base_url}</td>
                          <td><img src={profile.cloud_type_img} height="50px"/></td>
                          <td>{profile.registered}</td>
                          <td><Badge color={getBadge(profile.status)}>{profile.status}</Badge></td>
                          <td><Link to={profileLink}><Button size="sm" color="primary">
                                                            <i className="icon-eyeglass"></i>&nbsp;View
                                                        </Button></Link>
                                                        &nbsp;
                                                        <Link to={editProfileLink}><Button size="sm" color="warning" disabled>
                                                            <i className="icon-note"></i>&nbsp;Edit
                                                        </Button></Link>
                                                        &nbsp;
                                                        <Button id={profile.id} size="sm" color="danger" onClick={this.deleteProfile.bind(this)} disabled={profile.id < 2}>
                                                            <i className="fa fa-remove"></i>&nbsp;Delete
                                                        </Button></td>
                        </tr>
                      )
                    }
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
