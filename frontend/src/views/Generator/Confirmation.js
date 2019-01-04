import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Progress, Row, Col, Button,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
     } from 'reactstrap';

class Confirmation extends Component{
    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render(){
        const {values: { clusterType, clusterVersion, clusterId, services, recipes, dataPlaneApplications }} = this.props;
        const serviceList = services.filter((service) => (service.display == 1));
        const recipesList = recipes.filter((recipe) => recipe.id);
        const applicationList = dataPlaneApplications.filter((application) => application.id);

        return(
            <div className="animated fadeIn align-items-center">
                <Row>
                    <Col>
                        <h1>Step 5: Save Bundle to Library</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    
                        &nbsp; 
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Progress animated value='100' color="dark" text-align="center" size="lg"></Progress>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        &nbsp; 
                    </Col>
                </Row>
                <Row>
                </Row>
                <Row>
                <Col>
                    <Card className="border-primary">
                        <CardHeader className="text-white bg-primary">
                            <h2>Configuration Summary</h2>
                        </CardHeader>
                        <CardBody>
                            <table>
                                <tbody>
                                    <tr height="30px">
                                        <td width="30%">
                                            <strong>Cluster Type</strong>
                                        </td>
                                        <td width="70%">
                                            {clusterType}
                                        </td>
                                    </tr>
                                    <tr height="30px">
                                        <td width="30%">
                                            <strong>Cluster Version</strong>
                                        </td>
                                        <td width="70%">
                                            {clusterVersion}
                                        </td>
                                    </tr>
                                    <tr height="40px">
                                        <td width="30%">
                                            <strong>Services</strong>
                                        </td>
                                        <td width="70%">
                                        {serviceList.map((service, index, arr) => {
                                            return index === arr.length - 1 ? service.name : service.name + ", "
                                        })}
                                        </td>
                                    </tr>
                                    <tr height="40px">
                                        <td width="30%">
                                            <strong>Add-Ons</strong>
                                        </td>
                                        <td width="70%">
                                        {recipesList.map((recipe, index, arr) => {
                                            return index === arr.length - 1 ? recipe.name + " ("+recipe.addon_type+")" : recipe.name + " ("+recipe.addon_type+"), "
                                            }
                                        )}
                                        </td>
                                    </tr>
                                    <tr height="35px">
                                        <td width="30%">
                                            <strong>DataPlane Apps</strong>
                                        </td>
                                        <td width="70%">
                                        {dataPlaneApplications.map((application, index, arr) => {
                                            return index === arr.length - 1 ? application.name : application.name + ", "
                                        }
                                        )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                <Card className="border-success">
                        <CardHeader className="text-white bg-success">
                            <h2>Details</h2>
                        </CardHeader>
                        <CardBody>
                        <Form>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-folder"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="bundleName" name="bundleName" placeholder="Bundle Name" autoComplete="name"/>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-align-justify"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="textarea" id="bundleDescription" name="bundleDescription" placeholder="Bundle Description"/>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-file-image-o"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="bundleImg" name="bundleImg" placeholder="Bundle Image (enter URL or upload via Browse Button)"/>
                    
                    <InputGroupAddon addonType="append">
                        <Button >Browse</Button>
                    </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                </Form>
                        </CardBody>
                    </Card>
              

                </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="chart-wrapper" align="left">
                            <Button size="lg" outline color="primary"  onClick={this.back}>
                                <i className="fa fa-long-arrow-left"></i> Back  
                            </Button>
                        </div>
                    </Col>
                    <Col>
                        <div className="chart-wrapper" align="right">
                            <Button size="lg" color="primary" disabled>
                            <i className="fa fa-save"></i> Save to Library  
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Confirmation;