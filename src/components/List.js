import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import Card from '../components/Card';
import ItemTypes from '../constants/ItemTypes';
import { DropTarget } from 'react-dnd';

const listTarget = {
  drop(props, monitor, component) {
    const card = monitor.getItem();
    console.log(card);
    console.log(component);
  },
};

const mapStateToProps = (state, props) => {
  return {
    cards: state.cards.filter((card) => card.parentList === props.id),
  };
};

@connect(mapStateToProps)
@DropTarget(ItemTypes.CARD, listTarget, (connect) => ({
  connectDropTarget: connect.dropTarget(),
}))
export default class List extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
  }

  render() {
    const { title, cards } = this.props;
    const { connectDropTarget } = this.props;

    return connectDropTarget(
      <div className="kanban-list">
        <Panel header={title}>
          {cards.map((card) =>
            <Card {...card} />
          )}
        </Panel>
      </div>
    );
  }
}
