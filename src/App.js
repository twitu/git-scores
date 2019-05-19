import React, { Component } from 'react';
import ReactTable from 'react-table';
// import logo from './logo.svg';
import './App.css';

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
    this.eventSource = new EventSource("/webhook");
    
  }

  componentDidMount() {
    this.eventSource.addEventListener('scoreUpdate', (e) => this.updateFlightState(JSON.parse(e.data)));
  }

  updateFlightState(flightState) {
    let newData = this.state.data.map((item) => {
      if (item.flight === flightState.flight) {
        item.state = flightState.state;
      }
      return item;
    });

    this.setState(Object.assign({}, {data: newData}));
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
