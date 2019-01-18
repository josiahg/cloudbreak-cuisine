import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';
import Widget02 from './Widget02';

//import libraryData from './LibraryData'

function LibraryItemCol(props) {
    const libraryItem = props.libraryItem
    const itemLink = `#/whoville/${libraryItem.id}`
    const itemName = libraryItem.name
    const itemDescription = libraryItem.description
    if(itemName === undefined || itemDescription === undefined) {
        return(null)
    }
    else {
    return (
      <Col xs="12" sm="6" lg="3">
        <Widget02 header={itemName.toString()} mainText={itemDescription.toString().substring(0, 35) + "..." } icon="fa fa-github" color="primary" footer link={itemLink} />
      </Col>
    )
    }
}

class Whoville extends Component {

    constructor(props) {
        super(props)
        this.state = { libraryData: [] }
    }
    initData() {
        fetch('http://localhost:4000/api/whoville/refresh')
            .then(response => response.json())
            .catch(err => console.error(this.props.url, err.toString()))
    }


    loadData() {
        fetch('http://localhost:4000/api/whoville')
            .then(response => response.json())
            .then(data => {
                this.setState({libraryData: data})
            })
            .catch(err => console.error(this.props.url, err.toString()))
    }

    componentDidMount() {
        this.initData()
        this.loadData()
    }
    refreshPage(){
        window.location.reload();
      }

  render() {
    return (
        <div className="animated fadeIn">
        <Row>
          <Col>
          <h1>Whoville Library</h1>
          </Col>
                          <Col align="right" > 
                          <div >
                          <Button size="lg" color="warning" onClick={this.refreshPage.bind(this)}>
                                          <i className="fa fa-refresh"></i>&nbsp;Refresh
                              </Button>
                              &nbsp;
                              <Button size="lg" color="danger" disabled>
                                          <i className="fa fa-bomb"></i>&nbsp;Nuke
                              </Button>
                          </div>
                          </Col>
          </Row>
        <Row>
          &nbsp;
        </Row>
        <Row>
            {this.state.libraryData.map((libraryItem) =>
                      <LibraryItemCol  libraryItem={libraryItem}/>
            )}
        </Row>
     
      </div>
    );
  }
}

export default Whoville;
