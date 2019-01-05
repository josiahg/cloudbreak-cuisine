import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import Widget02 from './Widget02';

//import libraryData from './LibraryData'

function LibraryItemCol(props) {
    const libraryItem = props.libraryItem
    const itemLink = `#/library/${libraryItem.id}`
    const itemName = libraryItem.name
    const itemVersion = libraryItem.version
    if(itemName === undefined || itemVersion === undefined) {
        return(null)
    }
    else {
    return (
      <Col xs="12" sm="6" lg="3">
        <Widget02 header={itemName.toString()} mainText={itemVersion.toString()} icon="icon-folder-alt" color="green" footer link={itemLink} />
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

  render() {
    return (
      <div className="animated fadeIn">
      <h1>Bundle Library</h1>
        <Row>
          &nbsp;
        </Row>
        <Row>
            {this.state.libraryData.map((libraryItem, index) =>
                      <LibraryItemCol key={index} libraryItem={libraryItem}/>
            )}
        </Row>
     
      </div>
    );
  }
}

export default Library;
