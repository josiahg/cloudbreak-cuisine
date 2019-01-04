import React, { Component } from 'react';
import { Card, CardBody, CardColumns, CardHeader, Row, Col, Container, Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import libraryData from './LibraryData'



class LibraryItem extends Component {


  render() {
    const libraryItem = libraryData.find( libraryItem => libraryItem.id.toString() === this.props.match.params.id)

    return (
      <div className="animated fadeIn">
      <Row>
          <Col  xs={6} md={4}>

            <div className="chart-wrapper" align="center" >
              <p><img src={libraryItem.image}/></p>
            </div>


        </Col>
        <Col  xs={12} md={8}>
        <Card>
        <CardHeader className="text-white bg-success">
        <h2>{libraryItem.name.toString()} Bundle</h2>
  
          </CardHeader>
          <CardBody >
            <div className="chart-wrapper" align="left">
              <h2>Stack Version</h2>
              <p>{libraryItem.version.toString()}</p>
              <h2>Description</h2>
              <p>{libraryItem.description.toString()}</p>
            </div>
          </CardBody>
        </Card>
        <Card>
        <CardHeader className="text-white bg-primary">
            <h2>Actions</h2>
          </CardHeader>
          <CardBody  className="text-white bg-white">
            <div className="chart-wrapper" align="middle">
            <table width="100%">
              <tbody>
              <tr>
              <td align="center" width="33%">
            <Button size="lg" color="primary">
                  <i className="fa fa-download"></i>&nbsp;Download
                </Button>
                </td>
                <td align="center" width="33%"> 
                <Button size="lg" color="primary">
                  <i className="fa fa-upload"></i>&nbsp;Deploy
                </Button>
                </td>
                <td align="center" width="33%">
                <Button size="lg" color="danger">
                  <i className="fa fa-remove"></i>&nbsp;Delete
                </Button>
                </td>
                </tr>
                </tbody>
                </table>
            </div>
          </CardBody>
        </Card>
        </Col>
        </Row>
    </div>
    )
  }
}

export default LibraryItem;
