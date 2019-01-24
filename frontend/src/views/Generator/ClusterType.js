import React, { Component } from 'react';
import {
    Card, CardBody, CardHeader, Progress, Row, Col, Button,
    FormGroup,
    Input,
    Label
} from 'reactstrap';
import { AppSwitch } from '@coreui/react'

class ClusterType extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hdpSwitch: false,
            hdfSwitch: false,
            combinedSwitch: false,
            hdpBorder: '',
            hdfBorder: '',
            combinedBorder: '',
            hdpHeader: 'bg-white',
            hdfHeader: 'bg-white',
            combinedHeader: 'bg-white',
            clusterVersion: '',
            clusterType: 'HDP',
            next: false,
            hdpVersion: '3.0',
            hdfVersion: '3.2',
            combinedVersion: 'HDP 3.0 | HDF 3.2',
            nextDisabled: true
        };
    }
    changeVersion = (e) => {
        var nextDisabledFlag = true;
        if ([e.target.id] === "hdfVersion") {
            if (this.state.hdfSwitch) {
                nextDisabledFlag = false;
            }
        } else if ([e.target.id] === "hdpVersion") {
            if (this.state.hdpSwitch) {
                nextDisabledFlag = false;
            }
        } else if ([e.target.id] === "combinedVersion") {
            if (this.state.combinedSwitch) {
                nextDisabledFlag = false;
            }
        }
        this.setState({
            [e.target.id]: e.target.value,
            nextDisabled: nextDisabledFlag,
        })

    }
    changeSwitch = (e) => {
        var eader = '';
        var border = '';
        var cluster = '';
        var nextDisabledFlag = true;
        if (e.target.id === "HDF") {
            if (this.state.hdfSwitch === false) {
                border = 'border-success';
                eader = 'text-white bg-success';
                cluster = "HDF";
                if (this.state.hdfVersion !== '') {
                    nextDisabledFlag = false;
                }
            }
            this.setState({
                hdpSwitch: false,
                hdfSwitch: !this.state.hdfSwitch,
                combinedSwitch: false,
                hdpBorder: '',
                hdfBorder: border,
                combinedBorder: '',
                hdpHeader: 'bg-white',
                hdfHeader: eader,
                combinedHeader: 'bg-white',
                clusterType: cluster,
                nextDisabled: nextDisabledFlag,
            })

        } else if (e.target.id === "HDP") {
            if (this.state.hdpSwitch === false) {
                border = 'border-success';
                eader = 'text-white bg-success';
                cluster = "HDP";
                if (this.state.hdpVersion !== '') {
                    nextDisabledFlag = false;
                }
            }
            this.setState({
                hdpSwitch: !this.state.hdpSwitch,
                hdfSwitch: false,
                combinedSwitch: false,
                hdpBorder: border,
                hdfBorder: '',
                combinedBorder: '',
                hdpHeader: eader,
                hdfHeader: 'bg-white',
                combinedHeader: 'bg-white',
                clusterType: cluster,
                nextDisabled: nextDisabledFlag,
            })
        } else if (e.target.id === "COMBINED") {
            if (this.state.combinedSwitch === false) {
                border = 'border-success';
                eader = 'text-white bg-success';
                cluster = "COMBINED";
                if (this.state.combinedVersion !== '') {
                    nextDisabledFlag = false;
                }
            }
            this.setState({
                hdpSwitch: false,
                hdfSwitch: false,
                combinedSwitch: !this.state.combinedSwitch,
                hdpBorder: '',
                hdfBorder: '',
                combinedBorder: border,
                hdpHeader: 'bg-white',
                hdfHeader: 'bg-white',
                combinedHeader: eader,
                clusterType: cluster,
                nextDisabled: nextDisabledFlag,
            })

        }
    }

    isDisabled() {
        if ((this.state.hdpSwitch) ||
            (this.state.hdfSwitch) ||
            (this.state.combinedSwitch)) {
            return false;
        } else {
            return true;
        }
    }
    saveAndContinue = (e) => {
        if (this.state.clusterType === "HDP") {
            this.props.changeClusterVersion(this.state.hdpVersion);
            this.props.changeClusterId(1);
        } else if (this.state.clusterType === "HDF") {
            this.props.changeClusterVersion(this.state.hdfVersion);
            this.props.changeClusterId(2);
        } else if (this.state.clusterType === "COMBINED") {
            this.props.changeClusterVersion(this.state.combinedVersion);
            this.props.changeClusterId(3);
        }
        this.props.changeClusterType(this.state.clusterType);
        e.preventDefault();
        this.props.nextStep();
    }

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        //const { values } = this.props
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <h1>Step 1: Choose a Cluster Type</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        &nbsp;
        </Col>
                </Row>
                <Row>
                    <Col>
                        <Progress animated value='20' color="dark" text-align="center" size="lg"></Progress>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        &nbsp;
        </Col>
                </Row>


                <Row>
                    <Col>
                        <Card className={this.state.hdpBorder}>
                            <CardHeader className={this.state.hdpHeader}>

                                <div className="card-header-actions">
                                    <AppSwitch id="HDP" className={'mx-1'} variant={'pill'} color={'success'} outline={'alt'} checked={this.state.hdpSwitch} onChange={this.changeSwitch.bind(this)} />
                                </div>
                            </CardHeader>
                            <CardBody >
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="50%">
                                                <img alt='' src='../../assets/img/cuisine/hdp_cluster.png' height="200" width="200" />
                                            </td>
                                            <td width="50%" valign="top">
                                                <p>&nbsp;</p>
                                                <FormGroup>
                                                    <Label htmlFor="hdpVersion"><h4>Version</h4></Label>
                                                    <Input type="select" name="hdpVersion" id="hdpVersion" onChange={this.changeVersion.bind(this)}>
                                                        <option>3.0</option>
                                                    </Input>
                                                </FormGroup>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2">
                                                <h3>Hortonworks Data Platform</h3>
                                                <strong>Hortonworks Data Platform (HDP)</strong> helps enterprises gain insights from structured and unstructured data. It is an open source framework for distributed storage and processing of large, multi-source data sets.
                        </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card className={this.state.hdfBorder}>
                            <CardHeader className={this.state.hdfHeader}>

                                <div className="card-header-actions">
                                    <AppSwitch id="HDF" className={'mx-1'} variant={'pill'} outline={'alt'} color={'success'} checked={this.state.hdfSwitch} onChange={this.changeSwitch.bind(this)} />
                                </div>
                            </CardHeader>
                            <CardBody >
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="50%">
                                                <img alt='' src='../../assets/img/cuisine/hdf_cluster.png' height="200" width="200" />
                                            </td>
                                            <td width="50%" valign="top">
                                                <p>&nbsp;</p>
                                                <FormGroup>
                                                    <Label htmlFor="hdfVersion"><h4>Version</h4></Label>
                                                    <Input type="select" name="hdfVersion" id="hdfVersion" onChange={this.changeVersion.bind(this)}>
                                                        <option>3.2</option>
                                                    </Input>
                                                </FormGroup>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2">
                                                <h3>Hortonworks Data Flow</h3>
                                                <strong>Hortonworks DataFlow (HDF)</strong> is a scalable, real-time streaming analytics platform that ingests, curates and analyzes data for key insights and immediate actionable intelligence.
                        </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card className={this.state.combinedBorder}>
                            <CardHeader className={this.state.combinedHeader}>

                                <div className="card-header-actions">
                                    <AppSwitch id="COMBINED" className={'mx-1'} variant={'pill'} color={'success'} outline={'alt'} checked={this.state.combinedSwitch} onChange={this.changeSwitch.bind(this)} />
                                </div>
                            </CardHeader>
                            <CardBody >
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="50%">
                                                <img alt='' src='../../assets/img/cuisine/both_cluster.png' height="200" width="200" />
                                            </td>
                                            <td width="50%" valign="top">
                                                <p>&nbsp;</p>
                                                <FormGroup>
                                                    <Label htmlFor="combinedVersion"><h4>Version</h4></Label>
                                                    <Input type="select" name="combinedVersion" id="combinedVersion" onChange={this.changeVersion.bind(this)}>
                                                        <option>HDP 3.0 | HDF 3.2</option>
                                                    </Input>
                                                </FormGroup>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2">
                                                <h3>Combined Cluster</h3>
                                                <strong>Combined HDP + HDF clusters</strong> allow you to leverage the best out of Hortonworks platforms. Manage all your services in one central place and build Edge to AI applications.
                        </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>
                    </Col>
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

export default ClusterType;