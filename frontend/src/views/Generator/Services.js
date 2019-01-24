import React, { Component } from 'react';
import {
    Card, CardBody, CardHeader, Progress, Row, Col, Button,
} from 'reactstrap';
import { AppSwitch } from '@coreui/react'

//import servicesData from './ServicesData'

class Services extends Component {
    constructor(props) {
        super(props);
        this.changeSwitch = this.changeSwitch.bind(this);
        this.state = { firstLoad: true, servicesData: [] }
    }

    loadData() {
        fetch('http://localhost:4000/api/services')
            .then(response => response.json())
            .then(data => {
                this.setState({ servicesData: data })
            })
            .catch(err => console.error(this.props.url, err.toString()))
    }

    componentDidMount() {
        this.loadData()
    }

    saveAndContinue = (e) => {
        var servicesData = this.state.servicesData; // DEBUG
        const { values: { clusterType, clusterVersion, clusterId } } = this.props;

        var services = [];

        // Mandatory Services
        const mandatoryServiceList = servicesData.filter((service) => ((service.cluster_id == clusterId) && (service.mandatory == 1)));
        mandatoryServiceList.map((service) => {
            services.push(JSON.parse(JSON.stringify({ id: service.id, name: service.service_description, img: service.img, display: service.display })));
        })

        // Selected Services
        const serviceList = servicesData.filter((service) => ((service.cluster_id == clusterId) && (service.display == 1)));
        serviceList.map((service) => {
            if (this.state[service.id]) {
                services.push(JSON.parse(JSON.stringify({ id: service.id, name: service.service_description, img: service.img, display: service.display })));
            }
        })

        this.props.setServiceList(services);
        e.preventDefault();
        this.props.nextStep();
    }

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    changeSwitch = (e) => {
        var servicesData = this.state.servicesData; // DEBUG
        const serviceId = e.target.id;
        const isChecked = this.state[serviceId];

        if (!isChecked) {
            // If we are enabling a service, we check for dependencies
            const currentService = servicesData.filter((service) => (service.id == serviceId));
            var dependencies = '';
            currentService.map((service) => {
                dependencies = service.dependency;
            }
            )
            if (dependencies !== '') {
                this.setState({
                    [dependencies]: true,
                    ["cardHeaderClass" + dependencies]: 'text-white bg-success',
                    ["cardClass" + dependencies]: 'border-success'
                });
            }
            this.setState({
                [serviceId]: !this.state[serviceId],
                ["cardHeaderClass" + serviceId]: 'text-white bg-success',
                ["cardClass" + serviceId]: 'border-success'
            });
        } else {
            this.setState({
                [serviceId]: !this.state[serviceId],
                ["cardHeaderClass" + serviceId]: 'bg-white',
                ["cardClass" + serviceId]: ''
            });
        }
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    render() {
        var servicesData = this.state.servicesData; // DEBUG

        const { values: { clusterType, clusterVersion, clusterId } } = this.props;

        const serviceList = servicesData.filter((service) => ((service.cluster_id == clusterId) && (service.display == 1)));

        if (this.state.firstLoad) {
            serviceList.map((service) => {
                this.setState({
                    ["cardClass" + service.id]: '',
                    ["cardHeaderClass" + service.id]: 'bg-white',
                    [service.id]: false
                })
            }
            )
            this.setState({ firstLoad: false })
        }

        return (
            <div className="animated fadeIn align-items-center">
                <Row>
                    <Col>
                        <h1>Step 2: Select Services</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        &nbsp;
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Progress animated value='40' color="dark" text-align="center" size="lg"></Progress>
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
                    {serviceList.map((service) => {
                        if (service.mandatory == 1)

                            return <Col md="2">
                                <Card className='border-success'>
                                    <CardHeader className='text-white bg-success'>
                                        {service.service_description}
                                        <div className="card-header-actions">
                                            <AppSwitch id={service.id} className={'mx-1'} variant={'pill'} color={'success'} outline={'alt'} checked disabled />
                                        </div>
                                    </CardHeader>
                                    <CardBody className="align-items-center">
                                        <div align="center"><img alt='' src={service.img} height="75px" width="75px" /></div>
                                    </CardBody>
                                </Card>
                            </Col>
                        return <Col md="2">
                            <Card className={this.state["cardClass" + service.id]}>
                                <CardHeader className={this.state["cardHeaderClass" + service.id]}>
                                    {service.service_description}
                                    <div className="card-header-actions">
                                        <AppSwitch id={service.id} className={'mx-1'} variant={'pill'} color={'success'} outline={'alt'} checked={this.state[service.id]} onChange={this.changeSwitch} />
                                    </div>
                                </CardHeader>
                                <CardBody className="align-items-center">
                                    <div align="center"><img alt='' src={service.img} height="75px" width="75px" /></div>
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

export default Services;