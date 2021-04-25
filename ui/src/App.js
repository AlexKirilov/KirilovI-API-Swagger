import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './components/Header'
import { Logs } from './components/Logs'
import { DisplayBoard } from './components/DisplayBoard'
import CreateLog from './components/CreateLog'
import { getAllLogs, createLog } from './services/LogsService'

function App() {

  const [log, setLog] = useState({})
  const [logs, setLogs] = useState([])
  const [numberOfLogs, setNumberOfLogs] = useState(0)


  const logCreate = (e) => {

      createLog(log)
        .then(response => {
          console.log(response);
          setNumberOfLogs(numberOfLogs+1)
      });
  }

  const fetchAllLogs = () => {
    getAllLogs()
      .then(logs => {
        console.log(logs)
        setLogs(logs.results);
        setNumberOfLogs(logs.results.length)
      });
  }

  useEffect(() => {
    getAllLogs()
      .then(logs => {
        console.log(logs)
        setLogs(logs.results);
        setNumberOfLogs(logs.results.length)
      });
  }, [])

  const onChangeForm = (e) => {
      if (e.target.name === 'firstname') {
          log.firstName = e.target.value;
      } else if (e.target.name === 'lastname') {
          log.lastName = e.target.value;
      } else if (e.target.name === 'email') {
          log.email = e.target.value;
      }
      setLog(log)
  }
  
    
    return (
        <div className="App">
          <Header></Header>
          <div className="container mrgnbtm">
            <div className="row">
              <div className="col-md-8">
                  <CreateLog 
                    log={log}
                    onChangeForm={onChangeForm}
                    createLog={logCreate}
                    >
                  </CreateLog>
              </div>
              <div className="col-md-4">
                  <DisplayBoard
                    numberOfLogs={numberOfLogs}
                    getAllLogs={fetchAllLogs}
                  >
                  </DisplayBoard>
              </div>
            </div>
          </div>
          <div className="row mrgnbtm">
            <Logs logs={logs}></Logs>
          </div>
        </div>
    );
}

export default App;