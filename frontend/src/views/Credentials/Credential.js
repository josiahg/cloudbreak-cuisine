import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import credentialsData from './CredentialsDetailsData'

class Credential extends Component {

  render() {

    const credential = credentialsData.find( credential => credential.id.toString() === this.props.match.params.id)

    const credentialDetails = credential ? Object.entries(credential) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]

    return (
      <div className="animated fadeIn">
      <Row>
                    <Col>
                        <h1>Credential Details</h1>
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
                        credentialDetails.map(([key, value]) => {
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

export default Credential;
