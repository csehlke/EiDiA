import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import EditorTools from './EditorTools';

const drawerWidth = 400;

const styles = {
  drawer: {
    position: "relative",
    align: "right",
    backgroundColor: "white"
  }
}

export default class RightSidePanel extends React.Component {

  constructor(props) {
    super(props);
    this.changeInlineStyle = this.changeInlineStyle.bind(this);
  }

  changeInlineStyle(style) {
    this.props.onToggleInlineStyle(style)
  } 

  render() {
    return (
      <div style={styles.drawer}>
          <div/>
          <Divider />
          <EditorTools 
            onChangeInlineStyle={style => this.changeInlineStyle(style)}
          />
          <Divider />
          Section 2
          <Divider />
          Section 3
      </div>
    );
  }
}