import React, { Component } from 'react';
import ReactTable from 'react-table';
// import logo from './logo.svg';
import './App.css';
import 'react-table/react-table.css';

class App extends Component{
 
  constructor(props) {
    super(props);
    this.state = {
      score: [{
        rank: 1,
        nick: 'lsampras',
        score: 10
        }]
    };
    
    this.columns = [{
        Header: "Rank",
        accessor: "rank"
      },
      {
        Header: "Nick",
        accessor: "nick"
      },
      {
        Header: "Score",
        accessor: "score"
      }];
    this.eventSource = new EventSource("http://github-webhooks-sampraslop995.c9users.io/webhook");
    
  }

  componentDidMount() {
    this.eventSource.addEventListener('scoreUpdate', (e) => this.updateFlightState(JSON.parse(e.data)));
  }

  updateFlightState(data) {
    console.log("data received");
    this.setState({score: data});
  }
  
  render() {
    return (
      <div className="App">
        <ReactTable
          data={this.state.score}
          columns={this.columns}
        />
      </div>
    );
  } 
}

export default App;
