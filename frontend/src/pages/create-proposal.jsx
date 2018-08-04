import React, { Component } from 'react';
import Eos from 'eosjs'; // https://github.com/EOSIO/eosjs
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui dependencies
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import style from './index.css';

import md5 from 'md5';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  }
});

// Index component
class CreateProposal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      proposal: {}
    };
    this.api = this.props.api;
  }

  componentDidMount() {
    this.api.getProposals().then(res => {
      if (res.success) {
        this.setState({ proposals: res.proposals });
      }
    });
  }

  submitProposal() {
    // author
    // title
    // documenthash
  }

  handleInputChange(event) {
    const { value } = event.target,
          attr = event.target.name;

    this.setState({ proposal: {
      ...this.state.proposal,
      [attr]: value
    } });
  }

  handleFileUpload(event) {
    // const reader = new FileReader();
    let file = event.target.files[0],
        reader = new FileReader();

    reader.onload = (e) => {
      let bin = md5(e.target.result);
      console.log('bin', bin);
      this.setState({ proposal: {
        documenthash: bin
      }});
    };

    reader.readAsBinaryString(file);
    // const hash = md5(event.target.files[0]);
    // this.setState({ proposal: {
    //   documenthash: hash
    // }})
  }

  render() {
    // const { noteTable } = this.state;
    const { classes } = this.props,
          { proposal } = this.state;

    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={8} container direction="row" className="centeredContainer">
            <Paper className="paper">
              <h1>Create Proposal</h1>
              <form>
                <h4>Proposal Name</h4>
                <input type="text" name="title" value={proposal.name} onChange={this.handleInputChange.bind(this)} />
                <h4>Proposal Document</h4>
                <input type="file"
                   id="document" name="document"
                   accept="application/pdf"
                   onChange={this.handleFileUpload.bind(this)}/>
                <h4>Hash</h4>
                <span>{proposal.documenthash}</span>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

}

CreateProposal.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CreateProposal);
