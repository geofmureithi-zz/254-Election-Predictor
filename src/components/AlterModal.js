import React, { Component } from 'react';
import { List, Button, Header, Icon,  Modal, Image } from 'semantic-ui-react';
import RangeSlider from './RangeSlider';

class AlterModal extends Component {
  constructor(props){
    super(props);
    let { county } = this.props;
    this.state = {
      uhuru: county.uhuruProjected || county.actualExpected * (county.uhuru2013 / 100),
      raila: county.railaProjected || county.actualExpected * (county.raila2013 / 100),
      max: county.actualExpected,
      county: county
    };
    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate(candidate= "uhuru", votes = 0){
    this.setState({[candidate]: parseInt(votes)})
  }

  updateCounty(){
    let { county, uhuru, raila } = this.state;
    county.uhuruProjected = uhuru;
    county.railaProjected = raila;
    this.props.onCountyUpdate(county);
  }
  render () {
    let {raila, uhuru, max } = this.state;
    return (
      <Modal open={this.props.open} size='small' closeOnDocumentClick>
    <Header icon='setting' content={ `Predict ${this.props.county.name }  County`} />
    <Modal.Content>
        <List>
            <List.Item>
                <Image className="circle" src='https://pbs.twimg.com/profile_images/3497293273/e25b422024532a6f240686a76c5364ef_400x400.jpeg' />
                <List.Content>
                    <List.Header as='a'>Uhuru Kenyatta [{uhuru.toFixed(0)} votes]</List.Header>
                    <List.Description><RangeSlider candidate="uhuru" onChange={this.onUpdate} value={uhuru} min={0} max={max}/></List.Description>
                </List.Content>
            </List.Item>
            <List.Item>
                <Image className="circle" src='https://pbs.twimg.com/profile_images/847474777044402178/OPJzhrS_.jpg' />
                <List.Content>
                    <List.Header as='a'>Raila Odinga [{raila.toFixed(0)} votes]</List.Header>
                    <List.Description><RangeSlider candidate="raila" onChange={this.onUpdate} value={raila} min={0} max={max}/></List.Description>
                </List.Content>
            </List.Item>
        </List>
    </Modal.Content>
    <Modal.Actions>
        <Button color='blue' inverted onClick={this.props.closeModal}>
            <Icon name='remove' /> Cancel
        </Button>
        <Button color='green' inverted onClick={this.updateCounty.bind(this)}>
            <Icon name='checkmark' /> Confirm
        </Button>
    </Modal.Actions>
      </Modal>
  )
  }
}

export default AlterModal;
