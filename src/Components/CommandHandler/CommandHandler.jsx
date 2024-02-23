import React, { useState } from 'react';
import JSON5 from 'json5';
import "./CommandHandler.css";
import RequestTelemetryParams from './Parameters/RequestTelemetryParams';

function CommandHandler() {
  const [command, setCommand] = useState("REQUEST_TELEMETRY")
  const [params, setParams] = useState(0);
  const [serialData, setSerialData] = useState("");

  const commands = [
    "REQUEST_TELEMETRY", "SWITCH_MODE", "PAYLOAD_OPERATE"
  ];

  async function writeSerial() {
    const port = await navigator.serial.requestPort();
    console.log(port);
    await port.open({ baudRate: 9600 });
    // const writer = port.writable.getWriter();
    // const encoder = new TextEncoder();
    // const encoded = encoder.encode(serialData);
    // await writer.write(encoded);
    // writer.releaseLock();
  }

  async function readSerial() {
    const port = await navigator.serial.requestPort();
    console.log(port);
    await port.open({ baudRate: 9600, bufferSize: 600 });
    let builderString = '';

    while (port.readable) {
      const textDecoder = new TextDecoderStream();
      port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();
      let buffer = 15;

      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            reader.releaseLock();
            break;
          }
          if (buffer > 0) {
            buffer--;
          }
          else {
            for (let char of value) {
              if (char !== "\n") {
                builderString += char;
              }
            }
            console.log(builderString);
            const data = parseInput(builderString);
            setSerialData(data);
          }
        }
      }
      catch (error) {
        console.error(error);
      }
    }
  }


  function parseInput(input) {
    try {
      let parsed = JSON5.parse(input);
      let data = {};

      // TO BE IMPLEMENTED WHEN I KNOW MORE
      // TEMPORARY
      data = {
        "epoch": 0,
        "tmp": 0.0,
        "accl": {
          "x": 0.0,
          "y": 0.0,
          "z": 0.0
        },
        "gyrometer": {
          "x": 0.0,
          "y": 0.0,
          "z": 0.0
        },
        "gps": {
          "lat": 0.0,
          "lng": 0.0
        },
        "pres": 0,
        "battv": 0.0,
        "checksum": 0
      };
      return data;
    }
    catch {
      // TO BE DONE
      return {}
    }
  }

  return (
    <div className='command-handler-container'>
      <div className='command-handler-grid'>
        <div id='command-selector' className='command-handler-section grid-col-span-3'>
          <div className='dropdown'>
            Command:
            <select id="command" onChange={(e) => setCommand(e.target.value)}>
              <option value="REQUEST_TELEMETRY">
                <code>
                  REQUEST_TELEMETRY
                </code>
              </option>
              <option value="SWITCH_MODE">
                <code>
                  SWITCH_MODE
                </code>
              </option>
            </select>
          </div>
        </div>
        <div id='command-send'>
          <button onClick={() => writeSerial()}>
            Send
          </button>
        </div>
        <div id='command-response' className='command-handler-section grid-row-span-16 grid-col-span-4'>
          response
          {serialData}
        </div>
        <div id='command-parameters' className='command-handler-section grid-row-span-7 grid-col-span-4'>
          <h4>Parameters</h4>
          {command === "REQUEST_TELEMETRY" && <RequestTelemetryParams setParams={setParams}/>}
        </div>
        <div id='command-preview' className='command-handler-section grid-row-span-8 grid-col-span-4'>
          <h4>Command Preview</h4>
          <code>
            {command}({params.toString().padStart(8, '0')})
          </code>
        </div>
      </div>
    </div>
  );
}

export default CommandHandler