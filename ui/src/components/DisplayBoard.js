import React from 'react'

export const DisplayBoard = ({numberOfLogs, getAllLogs}) => {
    
    return(
        <div style={{backgroundColor:'green'}} className="display-board">
            <h4 style={{color: 'white'}}>Logs Created</h4>
            <div className="number">
            {numberOfLogs}
            </div>
            <div className="btn">
                <button type="button" onClick={(e) => getAllLogs()} className="btn btn-warning">Get all Logs</button>
            </div>
        </div>
    )
}