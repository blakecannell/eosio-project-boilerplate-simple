import React, { Component } from 'react';
import Eos from 'eosjs'; // https://github.com/EOSIO/eosjs
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui dependencies
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import style from './index.css';

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
      proposals: []
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

  render() {
    // const { noteTable } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <h2>Create Proposal</h2>
        <Grid container>
          awd
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
