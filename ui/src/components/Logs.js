import React from 'react'

export const Logs = ({logs}) => {

    console.log('logs length:::', logs.length)
    if (logs.length === 0) return null

    const LogRow = (log,index) => {

        return(
              <tr key = {index} className={index%2 === 0?'odd':'even'}>
                  <td>{index + 1}</td>
                  <td>{log.message}</td>
              </tr>
          )
    }

    const logTable = logs !== undefined ? logs.map((log,index) => LogRow(log,index)) : [];

    return(
        <div className="container">
            <h2>logs</h2>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Index</th>
                    <th>Message</th>
                </tr>
                </thead>
                <tbody>
                    {logTable}
                </tbody>
            </table>
        </div>
    )
}