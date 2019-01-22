import React, { Component } from 'react';
import {
    Card, CardBody, Row, Col, Button, 
    Table,
} from 'reactstrap';

import recipesData from './RecipesData'
import servicesData from './ServicesData'

class NifiTemplates extends Component {
    
    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    render() {
        const serviceList = servicesData.filter((service) => ((service.display === 1)))

        return (
            <div className="animated fadeIn align-items-center">
                <Row>
                    <Col>
                        <h1>Available Nifi Templates</h1>

                    </Col>
                    <Col align="right" >
                        <div >
                            <Button size="lg" color="success" href="#/AddNifiTemplate">
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
                        <Card className="border-white">
                            <CardBody className="bg-white">
                                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="text-center"></th>
                                            <th>Associated Service</th>
                                            <th>Associated Cluster</th>
                                            <th>Name</th>
                                            <th>Recipe Type</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>


                                        {serviceList.map((service) => {
                                            //return <h1>{service.id}</h1>
                                            const associatedRecipes = recipesData.filter((recipe) => ((recipe.display === 1) && (recipe.serviceId === service.id) && (recipe.addon_type === "Nifi Template")))
                                            return associatedRecipes.map((recipe) => {



                                                return <tr>
                                                    <td className="text-center">
                                                        <div>
                                                            <img alt='' src={service.img} height="50px" width="50px" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>{service.description}</div>

                                                    </td>
                                                    <td>
                                                        <div>{service.cluster_type}</div>
                                                    </td>
                                                    <td>
                                                        <div>{service.description} TEMPLATE</div>
                                                        <div className="small text-muted">
                                                            {recipe.recipeDescription}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>{recipe.recipe_type}</div>
                                                    </td>
                                                    <td>
                                                        <Button size="sm" color="primary">
                                                            <i className="icon-eyeglass"></i>&nbsp;View
                                    </Button>
                                                        &nbsp;
                                   <Button size="sm" color="warning">
                                                            <i className="icon-note"></i>&nbsp;Edit
                                    </Button>
                                                        &nbsp;
                                   <Button size="sm" color="danger">
                                                            <i className="fa fa-remove"></i>&nbsp;Delete
                                    </Button>
                                                    </td>
                                                </tr>
                                            }
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

export default NifiTemplates;