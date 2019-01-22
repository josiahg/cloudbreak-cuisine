import React, { Component } from 'react';
import {
    Card, CardBody, CardHeader, Progress, Row, Col, Button, 
} from 'reactstrap';
import { AppSwitch } from '@coreui/react'

import dataPlaneApplicationsData from './DataPlaneApplicationsData'


class DataPlaneApplications extends Component {
    constructor(props) {
        super(props);
        this.changeSwitch = this.changeSwitch.bind(this);
        this.state = { firstLoad: true }
    }

    saveAndContinue = (e) => {
        var applications = [];

        // Selected Services
        const applicationList = dataPlaneApplicationsData.filter((application) => application.id);
        applicationList.map((application) => {
            if (this.state[application.id]) {
                applications.push(JSON.parse(JSON.stringify({ id: application.id, name: application.description, img: application.img })));
            }
        })

        this.props.setDataPlaneApplicationList(applications);
        e.preventDefault();
        this.props.nextStep();
    }

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    changeSwitch = (e) => {
        const applicationId = e.target.id;
        const isChecked = this.state[applicationId];

        if (!isChecked) {
            this.setState({
                [applicationId]: !this.state[applicationId],
                ["cardHeaderClass" + applicationId]: 'text-white bg-success',
                ["cardClass" + applicationId]: 'border-success'
            });
        } else {
            this.setState({
                [applicationId]: !this.state[applicationId],
                ["cardHeaderClass" + applicationId]: 'bg-white',
                ["cardClass" + applicationId]: ''
            });
        }
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    render() {
        const applicationList = dataPlaneApplicationsData.filter((application) => application.id);

        if (this.state.firstLoad) {
            applicationList.map((application) => {
                this.setState({
                    ["cardClass" + application.id]: '',
                    ["cardHeaderClass" + application.id]: 'bg-white',
                    [application.id]: false
                })
            }
            )
            this.setState({ firstLoad: false })
        }

        return (
            <div className="animated fadeIn align-items-center">
                <Row>
                    <Col>
                        <h1>Step 4: Select Data Plane Services</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        &nbsp;
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Progress animated value='80' color="dark" text-align="center" size="lg"></Progress>
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
                    {applicationList.map((application) => {
                        return <Col md="3">
                            <Card className={this.state["cardClass" + application.id]}>
                                <CardHeader className={this.state["cardHeaderClass" + application.id]}>
                                    {application.description}
                                    <div className="card-header-actions">
                                        <AppSwitch id={application.id} className={'mx-1'} variant={'pill'} color={'success'} outline={'alt'} checked={this.state[application.id]} onChange={this.changeSwitch} />
                                    </div>
                                </CardHeader>
                                <CardBody className="align-items-center">
                                    <div align="center"><img alt='' src={application.img} height="150px" width="150px" /></div>
                                </CardBody>
                            </Card>
                        </Col>


                    }
                    )
                    }
                </Row>
                <Row>
                    <Col>
                        <div className="chart-wrapper" align="left">
                            <Button size="lg" outline color="primary" onClick={this.back}>
                                <i className="fa fa-long-arrow-left"></i> Back
                            </Button>
                        </div>
                    </Col>
                    <Col>
                        <div className="chart-wrapper" align="right">
                            <Button id={this.state.clusterType} size="lg" color="primary" onClick={this.saveAndContinue} disabled={this.state.nextDisabled}>
                                Next  <i className="fa fa-long-arrow-right"></i>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default DataPlaneApplications;