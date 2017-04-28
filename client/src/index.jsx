import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: []
    }
  }

  componentDidMount() {
    this.sendGetRequest();
  }

  search (term) {
    console.log(`${term} was searched`);
    this.sendPostRequest(term);
  };

  sendGetRequest () {
    $.ajax({
      url: 'http://127.0.0.1:1128/repos',
      method: 'GET',
      contentType: 'application/json',
      success: function (data) {
        console.log("get successfully!");
        this.setState({repos: data});
      }.bind(this),
      error: function (data) {
        console.log("failed to get!");
      }
    });
  };

  sendPostRequest (userInput) {
    axios.post('http://127.0.0.1:1128/repos/import', {
      data : {userInput},
    }).then (function (response) {
      console.log("request sent successfully!");
    }).catch (function (error) {
      console.log("failed to send request!");
    });
  };

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));















    // $.ajax({
    //   url: 'http://127.0.0.1:1128/repos/import',
    //   method: 'POST',
    //   contentType: 'application/json',
    //   data: JSON.stringify({userInput}),
    //   success: function (data) {
    //     console.log("request sent successfully!");
    //   },
    //   error: function (data) {
    //     console.log("failed to send request!");
    //   }
    // })



    // axios.get('http://127.0.0.1:1128/repos')
    // .then(function(response) {
    //   console.log("from sgr")
    //   console.log(response);
    //   updateRenderList(response).bind(this);
    // })
    // .catch(function (error) {
    //   console.error(error);
    // });