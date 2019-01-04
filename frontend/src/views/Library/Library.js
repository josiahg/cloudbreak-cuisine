import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import Widget02 from './Widget02';

import libraryData from './LibraryData'

// Brand Card Chart
function LibraryItemCol(props) {
    const libraryItem = props.libraryItem
    const itemLink = `#/library/${libraryItem.id}`
    const itemName = libraryItem.name
    const itemVersion = libraryItem.version
    return (
      <Col xs="12" sm="6" lg="3">
        <Widget02 header={itemName.toString()} mainText={itemVersion.toString()} icon="icon-folder-alt" color="green" footer link={itemLink} />
      </Col>
    )
  }

class Library extends Component {
    
  render() {

    const libraryItemList = libraryData.filter((libraryItem) => libraryItem.id)
    return (
      <div className="animated fadeIn">
      <h1>Bundle Library</h1>
        <Row>
          &nbsp;
        </Row>
        <Row>
            {libraryItemList.map((libraryItem, index) =>
                      <LibraryItemCol key={index} libraryItem={libraryItem}/>
            )}
        </Row>
     
      </div>
    );
  }
}

export default Library;
