import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Row, Table, Button } from 'reactstrap';

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
 refreshData() {
  fetch('http://localhost:4000/api/whoville/refreshprofile')
      .then(response => response.json())
      .catch(err => console.error(this.props.url, err.toString()))
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
     this.refreshData()
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
                            <Button size="lg" color="success" href="#/AddProfile" disabled>
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
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profileList.map((profile, index) =>{
                      const profileLink = `/profiles/${profile.id}`
                      const editProfileLink = `/editprofiles/${profile.id}`
                    
             
                      
                      
                      
                      return (
                        <tr key={profile.id.toString()}>
                          <td>{profile.id}</td>
                          <td>{profile.profile_type}</td>
                          <td>{profile.name}</td>
                          <td>{profile.user_name}</td>
                  
                          <td><Link to={profileLink}><Button size="sm" color="primary">
                                                            <i className="icon-eyeglass"></i>&nbsp;View
                                                        </Button></Link>
                                                        &nbsp;
                                                        <Link to={editProfileLink}><Button size="sm" color="warning" disabled>
                                                            <i className="icon-note"></i>&nbsp;Edit
                                                        </Button></Link></td>
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
