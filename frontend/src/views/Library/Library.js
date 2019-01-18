import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';
import Widget02 from './Widget02';

//import libraryData from './LibraryData'

function LibraryItemCol(props) {
    const libraryItem = props.libraryItem
    const itemLink = `#/library/${libraryItem.id}`
    const itemName = libraryItem.name
    const itemDescription = libraryItem.description
    if(itemName === undefined || itemDescription === undefined) {
        return(null)
    }
    else {
    return (
      <Col xs="12" sm="6" lg="3">
        <Widget02 header={itemName.toString()} mainText={itemDescription.toString().substring(0, 35) + "..." } icon="fa fa-archive" color="success" footer link={itemLink} />
      </Col>
    )
    }
}

class Library extends Component {

    constructor(props) {
        super(props)
        this.state = { libraryData: [] }
    }

    loadData() {
        fetch('http://localhost:4000/api/library')
            .then(response => response.json())
            .then(data => {
                this.setState({libraryData: data})
            })
            .catch(err => console.error(this.props.url, err.toString()))
    }

    componentDidMount() {
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
          <h1>Cuisine Library</h1>
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
                      <LibraryItemCol libraryItem={libraryItem}/>
            )}
        </Row>
     
      </div>
    );
  }
}

export default Library;
