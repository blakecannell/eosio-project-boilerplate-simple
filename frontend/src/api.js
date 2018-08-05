import _ from 'lodash';

export default class Api {
  constructor() {
    this.rootUrl = 'http://localhost:3000';
  }

  /**
   * Create Request
   */
  createRequest(apiFunction, method, data) {
    let requestUrl = `${this.rootUrl}/${apiFunction}`;

    // Pass empty object if data is not passed
    data = data ? data : {};

    let requestObj = {
      method: method ? method : 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    // Extend request object to include body (if applicable)
    if (method !== 'GET') {
      requestObj = _.assignIn(requestObj, {body: JSON.stringify(data)});
    }

    // Fetch
    return fetch(requestUrl, requestObj)
      .then((res) => res.json());
  }

  getProposals() {
    return this.createRequest('getAll', 'GET');
  }

  getById(id) {
    return this.createRequest(`getById/${id}`, 'GET');
  }

  createProposal(proposal) {
    return this.createRequest('createProposal', 'POST', proposal);
  }

  getVotes() {
    return this.createRequest('getVotes', 'GET');
  }

  castVote(vote) {
    // title
    // vote
    return this.createRequest('castVote', 'POST', vote);
  }
}