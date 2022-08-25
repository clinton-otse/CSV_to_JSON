/**
 * /* eslint-disable react-hooks/exhaustive-deps
 *
 * @format
 */

/** @format */
import './App.css';
import React, { useState, useCallback } from 'react';
import Papa from 'papaparse';
import { useDropzone } from 'react-dropzone';

function App() {
  const [parsedCsvData, setParsedCsvData] = useState([]);

  const parseFile = (file) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setParsedCsvData(results.data);
      },
    });
  };

  console.log('ParsedCSVdata', parsedCsvData);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length) {
      parseFile(acceptedFiles[0]);
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: 'text/csv',
  });

  return (
    <>
      <div className="App">
        <div
          {...getRootProps({
            className: `dropzone 
          ${isDragAccept && 'dropzoneAccept'} 
          ${isDragReject && 'dropzoneReject'}`,
          })}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
        <div className="data-div">
          <p>Files:</p>
          {parsedCsvData &&
            parsedCsvData.map((parsedData, index) => (
              <div key={index}>
                <div>{parsedData.data}</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
