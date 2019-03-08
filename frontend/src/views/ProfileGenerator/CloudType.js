import React, { Component } from 'react';
import {
    Card, CardBody, CardHeader, Progress, Row, Col, Button,
    FormGroup,
    Input,
    Label
} from 'reactstrap';
import { AppSwitch } from '@coreui/react'

class CloudType extends Component {
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
            hdpVersion: '3.1',
            hdfVersion: '3.3',
            combinedVersion: 'HDP 3.1 | HDF 3.3',
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
                        <h1>Step 1: Choose a Cloud Provider</h1>
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
                                                <img alt='' src='../../assets/img/cuisine/aws_square.png' height="250" width="250" />
                                            </td>
                                            <td width="50%" valign="top">
                                                <p>&nbsp;</p>
                                                <FormGroup>
                                                    <Label htmlFor="hdpVersion"><h4>Region</h4></Label>
                                                    <Input type="select" name="hdpVersion" id="hdpVersion" onChange={this.changeVersion.bind(this)}>
                                                    <option>us-east-2</option>
                                                    <option>us-east-1</option>
                                                    <option>us-west-1</option>
                                                    <option>us-west-2</option>
                                                    <option>ap-south-1</option>
                                                    <option>ap-northeast-3</option>
                                                    <option>ap-northeast-2</option>
                                                    <option>ap-southeast-1</option>
                                                    <option>ap-southeast-2</option>
                                                    <option>ap-northeast-1</option>
                                                    <option>ca-central-1</option>
                                                    <option>cn-north-1</option>
                                                    <option>cn-northwest-1</option>
                                                    <option>eu-central-1</option>
                                                    <option>eu-west-1</option>
                                                    <option>eu-west-2</option>
                                                    <option>eu-west-3</option>
                                                    <option>eu-north-1</option>
                                                    <option>sa-east-1</option>
                                                    </Input>
                                                </FormGroup>
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
                                    <AppSwitch id="HDF" className={'mx-1'} variant={'pill'} outline={'alt'} color={'success'} checked={this.state.hdfSwitch} onChange={this.changeSwitch.bind(this)} disabled/>
                                </div>
                            </CardHeader>
                            <CardBody >
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="50%">
                                                <img alt='' src='../../assets/img/cuisine/ost_square.png' height="250" width="250" />
                                            </td>
                                            <td width="50%" valign="top">
                                                <p>&nbsp;</p>
                                                <FormGroup>
                                                    <Label htmlFor="hdfVersion"><h4>Region</h4></Label>
                                                    <Input type="select" name="hdfVersion" id="hdfVersion" onChange={this.changeVersion.bind(this)}>
                                                        <option>whatever-region</option>
                                                    </Input>
                                                </FormGroup>
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
                                    <AppSwitch id="COMBINED" className={'mx-1'} variant={'pill'} color={'success'} outline={'alt'} checked={this.state.combinedSwitch} onChange={this.changeSwitch.bind(this)} disabled/>
                                </div>
                            </CardHeader>
                            <CardBody >
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="50%">
                                                <img alt='' src='../../assets/img/cuisine/msa_square.png' height="250" width="250" />
                                            </td>
                                            <td width="50%" valign="top">
                                                <p>&nbsp;</p>
                                                <FormGroup>
                                                    <Label htmlFor="combinedVersion"><h4>Region</h4></Label>
                                                    <Input type="select" name="combinedVersion" id="combinedVersion" onChange={this.changeVersion.bind(this)}>
                                                        <option>whatever-region</option>
                                                    </Input>
                                                </FormGroup>
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

export default CloudType;