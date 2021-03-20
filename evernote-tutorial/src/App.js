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
              notes={this.state.notes}
              noteUpdate={this.noteUpdate}>
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

  //how we push changes to firebase.
  noteUpdate = (id, noteObj) => {
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  }

  newNote = async (title) => {
    const note = {
      title: title,
      body: ''
    };
    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    const newID = newFromDB.id;

    //adding the new note to the current state.
    await this.setState({ notes: [...this.state.notes, note]});

    //finding the index of the newly added note in this.state.notes so we can select it.
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]);
    this.setState({ selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex });
  }
  
  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({notes: this.state.notes.filter(_note => _note !== note) })
    if(this.state.selectedNoteIndex === noteIndex){
      this.setState({ selectedNoteIndex : null, selectedNote: note});
    }else{

      //need to changed the selected note from the one we have deleted.

      //need to improve this code.

      this.state.notes.length > 1 ?
      this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
      this.setState({ selectedNoteIndex : null, selectedNote: null });
    }

    firebase.firestore()
      .collection('notes')
      .doc(note.id)
      .delete();
  }
}

export default App;
