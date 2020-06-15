import React from 'react';
import Divider from '@material-ui/core/Divider';
import EditorTools from './EditorTools';
import DocSearch from './DocSearch';

const styles = {
  drawer: {
    position: "relative",
    align: "right",
    backgroundColor: "white",
    boxShadow: "-10px 0px 6px -10px rgba(0,0,0,0.5)",
  }
}

export default class RightSidePanel extends React.Component {

  constructor(props) {
    super(props);
    this.changeInlineStyle = this.changeInlineStyle.bind(this);
    this.changeAlignment = this.changeAlignment.bind(this);
  }

  changeInlineStyle(style) {
    this.props.onToggleInlineStyle(style);
  } 

  changeAlignment(align) {
    this.props.onToggleBlockType(align);
  }

  render() {
    return (
      <div style={styles.drawer}>
          <div/>
          <Divider />
          <EditorTools 
            onChangeInlineStyle={style => this.changeInlineStyle(style)}
            onChangeAlignment={align => this.changeAlignment(align)}
          />
          <Divider />
          <DocSearch/>
          <Divider />
          Section 3
      </div>
    );
  }
}