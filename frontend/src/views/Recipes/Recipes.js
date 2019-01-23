import React, { Component } from 'react';
import {
    Card, CardBody, Row, Col, Button, 
    Table, Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';

class Recipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipesData: [],
            servicesData: [],
            clustersData: [],

      modal: false
        }
    }



    loadRecipeData() {
        fetch('http://localhost:4000/api/recipes')
            .then(response => response.json())
            .then(data => {
                this.setState({ recipesData: data })
            })
            .catch(err => console.error(this.props.url, err.toString()))
    }

    loadServiceData() {
        fetch('http://localhost:4000/api/services')
            .then(response => response.json())
            .then(data => {
                this.setState({ servicesData: data })
            })
            .catch(err => console.error(this.props.url, err.toString()))
    }

    loadClusterData() {
        fetch('http://localhost:4000/api/clusters')
            .then(response => response.json())
            .then(data => {
                this.setState({ clustersData: data })
            })
            .catch(err => console.error(this.props.url, err.toString()))
    }

    componentDidMount() {
        this.loadRecipeData()
        this.loadServiceData()
        this.loadClusterData()
    }




    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    render() {
        const serviceList = this.state.servicesData.filter((service) => ((service.display === 1)))
        return (

            <div className="animated fadeIn align-items-center">
             
                <Row>
                    <Col>
                        <h1>Available Recipes</h1>

                    </Col>
                    <Col align="right" >
                        <div >
                            <Button size="lg" color="success" href="#/AddRecipe">
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
                                            const associatedRecipes = this.state.recipesData.filter((recipe) => ((recipe.display === 1) && (recipe.serviceid === service.id) && (recipe.addon_type === "Recipe")))
                                            return associatedRecipes.map((recipe) => {



                                                return <tr>
                                                    <td className="text-center">
                                                        <div>
                                                            <img alt='' src={service.img} height="50px" width="50px" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>{service.service_description}</div>

                                                    </td>

                                                    {this.state.clustersData.filter((cluster) => (cluster.id === service.cluster_id)).map((cluster) => {
                                                        return <td>
                                                            <div>{cluster.cluster_type}</div>
                                                            <div className="small text-muted">
                                                                Version: {cluster.version}
                                                            </div>
                                                        </td>
                                                    }
                                                    )
                                                    }


                                                    <td>
                                                        <div>{recipe.recipename}</div>
                                                        <div className="small text-muted">
                                                            {recipe.recipedescription}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>{recipe.recipe_type}</div>
                                                    </td>
                                                    <td>
                                                        <Button size="sm" color="primary" href={"#/recipes/" + recipe.id}>
                                                            <i className="icon-eyeglass"></i>&nbsp;View
                                    </Button>
                                                        &nbsp;
                                   <Button size="sm" color="warning" href={"#/editrecipes/" + recipe.id} disabled={recipe.id < 14}>
                                                            <i className="icon-note"></i>&nbsp;Edit
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

export default Recipes;