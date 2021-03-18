import './App.css';
import React from 'react';
import firebase from '@firebase/app';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    }
  }

  //in react we can only return on element! but have other elements inside of that element!
  render() {
    return (
      <div className="app-container">
        <SidebarComponent
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}>
        </SidebarComponent>
        {
          this.state.selectedNote ?
            <EditorComponent 
              selectedNote={this.state.selectedNote}
              selectedNoteIndex={this.state.selectedNoteIndex}
              notes={this.state.notes}>
            </EditorComponent> :
            null
        }
        

      </div>
    )
  }

  //triggers an event to refresh the ui
  componentDidMount = () => {
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] = _doc.id;
          return data;
        });
        console.log(notes);
        this.setState({ notes: notes });
      });
  }

  //this is passed into the other react components as a variable.
  selectNote =(note, index) => this.setState({selectedNoteIndex: index, selectedNote: note})

}

export default App;
