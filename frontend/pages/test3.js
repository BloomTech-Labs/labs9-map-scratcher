

// //== Test Page 3 ===============================================================
// /*
//   This page contains experiments used during development of Backpaca.
//   Consider leaving a note here to briefly explain the purpose of the test, and
//   under what circumstances the test can be deleted, such as meeting a milestone.
// */

// //-- Dependencies --------------------------------
// import React, { Component } from 'react';
// import DropZone from 'react-dropzone'

// //-- Constants -----------------------------------


// //== React lifecycle methods ===================================================

// export default class extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             file: []
//         }
//     }

//     onDrop(file) {
//         this.setState({ file })
//     }

//     onCancel() {
//         this.setState({
//             file: []
//         })
//     }

//     render() {
//         return (
//           <DropZone onDrop={this.onDrop.bind(this)} onFileDialogCancel={this.onCancel.bind(this)}>
//             {({getRootProps, getInputProps}) => (
//               <div {...getRootProps()}>
//                 <input {...getInputProps()} />
//                   <p>Drop files here, or click to select files</p>
//               </div>
//             )}
//           </DropZone>
//         )
//     }

//  }

