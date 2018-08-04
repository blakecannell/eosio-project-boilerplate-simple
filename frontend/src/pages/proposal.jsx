import React, { Component } from 'react';
import Eos from 'eosjs'; // https://github.com/EOSIO/eosjs
import PropTypes from 'prop-types';

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
class Proposal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      proposal: {}
    };
    this.api = this.props.api;

    console.log('prop', this.props);
  }

  componentDidMount() {
    // this.api.getProposal().then(res => {
    //   if (res.success) {
    //     this.setState({ proposals: res.proposals });
    //   }
    // });

    this.setState({ proposal: { id: 0, name: 'awdawd' }});
  }

  render() {
    // const { noteTable } = this.state;
    const { classes } = this.props,
          { proposal } = this.state;

          console.log('proposal', proposal);

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          { proposal.id !== undefined ?
            <h1>{proposal.name}</h1> :
            <h1>null</h1>
          }
        </Grid>
      </Grid>
    );
  }

}

Proposal.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Proposal);
