import React, { useRef } from 'react';
import "./RequestTelemetryParams.css";

function RequestTelemetryParams(props) {
  const { setParams } = props;
  const param = useRef(0);

  const telemetry_metrics = {
    "epoch": {
      "units": "ms",
      "data_type": "int",
      "sensor_board": "Headboard"
    },
    "temperature": {
      "units": "C",
      "data_type": "float",
      "sensor_board": "Astraeus"
    },
    "acceleration": {
      "units": "m/s",
      "data_type": "float",
      "sensor_board": "Astraeus"
    },
    "gyrometer": {
      "units": "deg/s",
      "data_type": "float",
      "sensor_board": "Astraeus"
    },
    "gps": {
      "units": "dd",
      "data_type": "float",
      "sensor_board": "Astraeus"
    },
    "pressure": {
      "units": "hPa",
      "data_type": "int",
      "sensor_board": "Astraeus"
    },
    "battery": {
      "units": "V",
      "data_type": "float",
      "sensor_board": "Powerboard"
    },
    "checksum": {
      "units": "",
      "data_type": "int",
      "sensor_board": "Headboard"
    },
  }

  function handleCheckboxChange(event) {
    const { id, checked } = event.target;
    param.current += checked ? Math.pow(10, 7-id) : -Math.pow(10, 7-id);
    console.log(param.current);
    setParams(param.current);
  }

  return (
    <div id='request-telemetry-params'>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type='checkbox' 
                onChange={(e) => {
                  if (e.target.checked) {
                    param.current = 11111111;
                    for (let i = 0; i < 8; i++) {
                      document.getElementById(i).checked = true;
                    }
                  }
                  else {
                    param.current = 0;
                    for (let i = 0; i < 8; i++) {
                      document.getElementById(i).checked = false;
                    }
                  }
                  setParams(param.current);
                }}
              />
            </th>
            <th>Metric</th>
            <th>Units</th>
            <th>Data Type</th>
            <th>Sensor/Board</th>
          </tr>
        </thead>
        <tbody>
          {
            Object.keys(telemetry_metrics).map((metric, index) => {
              return (
                <tr>
                  <td>
                    <input 
                      type='checkbox' 
                      id={index} 
                      onChange={(e) => handleCheckboxChange(e)}
                    />
                  </td>
                  <td>
                    {metric}
                  </td>
                  <td>
                    {telemetry_metrics[metric].units}
                  </td>
                  <td>
                    {telemetry_metrics[metric].data_type}
                  </td>
                  <td>
                    {telemetry_metrics[metric].sensor_board}
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default RequestTelemetryParams