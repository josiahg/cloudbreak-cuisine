import React, { Component } from 'react';
import {
    Card, CardBody, Progress, Row, Col, Button,
    Table,
} from 'reactstrap';
import { AppSwitch } from '@coreui/react'

//import recipesData from './RecipesData'

class Recipes extends Component {
    constructor(props) {
        super(props);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
        this.state = { firstLoad: true, recipesData: [] }
    }

    loadData() {
        fetch('http://localhost:4000/api/recipes')
            .then(response => response.json())
            .then(data => {
                this.setState({ recipesData: data })
            })
            .catch(err => console.error(this.props.url, err.toString()))
    }

    componentDidMount() {
        this.loadData()
    }

    changeSwitch = (e) => {
        const recipeId = e.target.id;
        const isChecked = this.state[recipeId];

        if (!isChecked) {
            this.setState({
                [recipeId]: !this.state[recipeId],
                ["trBgClass" + recipeId]: 'text-white bg-green'
            });
        } else {
            this.setState({
                [recipeId]: !this.state[recipeId],
                ["trBgClass" + recipeId]: ''
            });
        }
    }

    saveAndContinue = (e) => {
        var recipesData = this.state.recipesData;

        const { values: { services } } = this.props;

        const serviceList = services.filter((service) => service.id);
        var recipes = [];
        // Mandatory Services
        serviceList.map((service) => {
            const mandatoryRecipes = recipesData.filter((recipe) => ((recipe.serviceid === service.id) && (recipe.mandatory === 1)))
            mandatoryRecipes.map((recipe) => {
                recipes.push(JSON.parse(JSON.stringify({ id: recipe.id, name: recipe.recipename, type: recipe.recipe_type, addon_type: recipe.addon_type, display: recipes.display })));
            })
        });


        // Selected Services
        serviceList.map((service) => {
            const otherRecipes = recipesData.filter((recipe) => ((recipe.serviceid === service.id) && (recipe.mandatory === 0)))
            otherRecipes.map((recipe) => {
                if (this.state[recipe.id]) {
                    recipes.push(JSON.parse(JSON.stringify({ id: recipe.id, name: recipe.recipename, type: recipe.recipe_type, addon_type: recipe.addon_type, display: recipes.display })));
                }
            })
        });

        this.props.setRecipeList(recipes);
        e.preventDefault();
        this.props.nextStep();
    }

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    toggleCheckbox = (e) => {

    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    render() {
        var recipesData = this.state.recipesData;
        console.log(recipesData)
        const { values: { services } } = this.props;

        const serviceList = services.filter((service) => service.id);

        return (

            <div className="animated fadeIn align-items-center">
                <Row>
                    <Col>
                        <h1>Step 3: Select Add-Ons</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>

                        &nbsp;
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Progress animated value='60' color="dark" text-align="center" size="lg"></Progress>
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
                        <Card className="border-white">
                            <CardBody className="bg-white">
                                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                                    <thead className="thead-white">
                                        <tr>
                                            <th className="text-center"><i className="fa fa-cog"></i></th>
                                            <th>Service</th>
                                            <th>Add-on Type</th>
                                            <th>Description</th>
                                            <th>Recipe Type</th>
                                            <th className="text-center"><i className="fa fa-check"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>


                                        {serviceList.map((service) => {
                                            //return <h1>{service.id}</h1>
                                            const associatedRecipes = recipesData.filter((recipe) => ((recipe.serviceid === service.id) && (recipe.display === 1)))
                                            return associatedRecipes.map((recipe) => {
                                                if (recipe.mandatory === 1)
                                                    return <tr className="text-white bg-green">
                                                        <td className="text-center">
                                                            <div>
                                                                <img alt='' src={service.img} height="50px" width="50px" />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>{service.name}</div>
                                                        </td>
                                                        <td>
                                                            <div>{recipe.addon_type}</div>
                                                        </td>
                                                        <td>
                                                            <div>{recipe.recipename}</div>
                                                        </td>
                                                        <td  >
                                                            <div>{recipe.recipe_type}</div>
                                                        </td>
                                                        <td className="text-center" valign="top">
                                                            <AppSwitch id="HDP" className={'mx-1'} variant={'pill'} color={'success'} outline={'alt'} checked disabled />
                                                        </td>
                                                    </tr>


                                                return <tr className={this.state["trBgClass" + recipe.id]}>
                                                    <td className="text-center">
                                                        <div>
                                                            <img alt='' src={service.img} height="50px" width="50px" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>{service.name}</div>
                                                    </td>
                                                    <td>
                                                        <div>{recipe.addon_type}</div>
                                                    </td>
                                                    <td>
                                                        <div>{recipe.recipename}</div>
                                                    </td>
                                                    <td  >
                                                        <div>{recipe.recipe_type}</div>
                                                    </td>
                                                    <td className="text-center" valign="top">
                                                        <AppSwitch id={recipe.id} className={'mx-1'} variant={'pill'} color={'success'} outline={'alt'} checked={this.state[recipe.id]} onChange={this.changeSwitch} />
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

export default Recipes;