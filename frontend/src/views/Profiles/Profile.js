import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import profilesData from './ProfilesDetailsData'

class Profile extends Component {

  render() {

    const profile = profilesData.find( profile => profile.id.toString() === this.props.match.params.id)

    const profileDetails = profile ? Object.entries(profile) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]

    return (
      <div className="animated fadeIn">
      <Row>
                    <Col>
                        <h1>Profile Details</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    
                        &nbsp; 
                    </Col>
                </Row>
        <Row></Row>
        <Row>
          <Col>
            <Card>
              <CardBody>
                  <Table responsive striped hover>
                    <tbody>
                      {
                        profileDetails.map(([key, value]) => {
                          return (
                            <tr key={key}>
                              <td>{`${key}:`}</td>
                              <td><strong>{value}</strong></td>
                            </tr>
                          )
                        })
                      }
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

export default Profile;
