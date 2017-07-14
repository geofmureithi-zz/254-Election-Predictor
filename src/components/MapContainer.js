import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DrawMap from './DrawMap';
import AlterModal from './AlterModal';
import Floating from './Floating';
import * as d3 from "d3";
import domtoimage from 'dom-to-image';

import { counties } from "./counties.json";

class MapContainer extends Component {
  constructor(props){
    super(props);
    this.counties = counties.map((county) => {
      return Object.assign(county, {
        name: county.county,
        id: county.name
      });
    });
    this.selectCounty = this.selectCounty.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateCounty = this.updateCounty.bind(this);
    this.openCountyModal = this.openCountyModal.bind(this);
    this.download = this.download.bind(this)
    let { county } = this.props.startState;
    let startCounty = null;
    if(county)
      startCounty = this.counties.find((c) => c.id === county)
    this.state = {
      counties,
      selectedCounty: startCounty || this.counties[counties.length - 1],
      modalOpen: false
    }
    this.displayFloating = true;
  }

  download(){
    domtoimage.toJpeg(document.body, { quality: 0.95 })
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download =  'prediction.jpeg';
        link.href = dataUrl;
        link.click();
      }).catch((err) => {
        console.error(err);
      });
  }


  selectCounty(selectedCounty){
    this.setState({ selectedCounty },function () {
      history.pushState({}, `${selectedCounty.name} County`, `/#county=${selectedCounty.id}`)
    })

  }
  openCountyModal(){
    this.setState({modalOpen : true});
  }

  updateCounty(county){
    let { counties }= this.state;
    let newCounties = counties.map((c) => {
      if(c.id === county.id)
        return county;
      return c;
    })
    this.setState({ counties: newCounties }, ()=> {
      this.closeModal();
    })

  }


  closeModal(){
    this.setState({ modalOpen: false });
  }

  render () {
    let { selectedCounty, counties, modalOpen }= this.state;
    let jubileeVotes = counties.reduce((prev, current) => {
      return prev + (current.uhuruProjected !== undefined? current.uhuruProjected : (current.actualExpected * (current.uhuru2013 / 100)));
    }, 0)
    let nasaVotes = counties.reduce((prev, current) => {
      return prev + (current.railaProjected !== undefined? current.railaProjected: (current.actualExpected * ( current.raila2013 / 100)));
    }, 0);
    let alert = null;
    let uhuruProjectedPc = selectedCounty.uhuruProjected !== undefined?selectedCounty.uhuruProjected* 100/selectedCounty.actualExpected:0;
    let railaProjectedPc = selectedCounty.railaProjected !== undefined?selectedCounty.railaProjected * 100/selectedCounty.actualExpected:0;
    if(modalOpen)
      alert = <AlterModal open={modalOpen} county={selectedCounty} onCountyUpdate={this.updateCounty} closeModal={this.closeModal}/>
    return (
      <div>
        <header>
          <h1>KENYAN ELECTION PREDICTION MAP</h1>
          <p><small>*Initial records Based on 2013 Presidential election</small></p>
        </header>
        <div className="map-container">
          <div id="map_canvas"  style={{ position: 'relative', height: '90vh' }}>
            <DrawMap counties={this.counties} selected={selectedCounty.id} onSelectCounty={this.selectCounty} openModal={this.openCountyModal} />
          </div>
          <p>**Click on county to view, Double click to add your projection</p>
            <table id="stateResults" style={{position: 'absolute', bottom: '20vh', right: 10}}>
                    <tbody><tr>
                        <th>{selectedCounty.name}</th>
                        <th>2013(%)</th>
                        <th>Your Projection</th>
                      </tr>
                    </tbody><tbody>
                      <tr>
                        <td className="name-1">JUBILEE</td>
                        <td className="name-1">*{selectedCounty.uhuru2013}</td>
                        <td className="name-1">{selectedCounty.uhuruProjected} ({uhuruProjectedPc.toFixed(0)}%)</td>
                      </tr>
                      <tr>
                        <td className="name-2">NASA</td>
                        <td className="name-2">*{selectedCounty.raila2013}</td>
                        <td className="name-2">{selectedCounty.railaProjected} ({railaProjectedPc.toFixed(0)}%)</td>
                      </tr>
                    </tbody>
                  </table>
                  <table id="countryResults" style={{position: 'absolute', top: 10, left: 10}}>
                    <tbody>
                      <tr>
                        <td className="name-1">JUBILEE</td>
                        <td className="name-1">{jubileeVotes.toFixed(0)}</td>
                        <td className="name-2">NASA</td>
                        <td className="name-2">{nasaVotes.toFixed(0)}</td>
                        <th>WINNER</th>
                        <th>{jubileeVotes>nasaVotes?"JUBILEE":"NASA"}</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {alert}
                <Floating onScreenShot={this.download} />
            </div>


    );
  }
}
MapContainer.propTypes= {
  startState : PropTypes.object
}
export default MapContainer;
