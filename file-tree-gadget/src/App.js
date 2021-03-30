import React, { useState } from 'react';

function App() {

  //this function is called a component.
  //returns something to be rendered on the screen
  //Taking data into a react component
  //Anything inbetween the tags will be children of the Folder object.
  //{} => interpolation syntax for passing variables.

  //array destructing in javascript, here we are unpacking an array into individual variables.
  //so arr[1, 2, 3]
  //let [a, b] = arr
  //a = 1, b = 2 etc and ignore the third element.
  //when we change the state of a component it will be re-rendered on the screen.
  //useState is a react hook


  return (
    <div>
      <h3>'hello'</h3>
      <Folder name="Desktop">
      <Folder name="Music">
        <File name='all_star.mp4'/>
        <File name='express_file.mp4'/>
      </Folder>
        <File name="dogs.jpeg"></File>
        <File name="cats.png"></File>
      </Folder>
      <Folder name="Application"></Folder>

    </div>
    );
}

const Folder = (props) => {
  const [ isOpen, setIsOpen ] = (useState(true));
  const{ name, children} = props; //destructuring the object to locally scoped variables.
  const direction = isOpen ? 'down' : 'right';

  //event handler passed in as a function
  const handleClick = () => {
    setIsOpen(!isOpen) //when the state is changed in react hooks automatically the the dom is refreshed.
  };

  return <div>
    <span onClick={handleClick}>
      <i className="blue folder icon"></i>
      <i className={`caret ${direction} icon`}></i>
      </span>
    {name}
      <div style={{marginLeft: '17px'}}>
        {isOpen ? children : null}
      </div>
    </div>
};

const File = (props) =>{
  const { name } = props;
  const fileExtention = name.split('.')[1];

  //object map

  const fileIcons = {
    mp4: 'headphones',
    jpeg: 'file image',
    png: 'file image outline'
  };

  return(
    <div>
      <i className={`caret ${fileIcons[fileExtention]} icon`}></i>
      {name}
    </div>
    ); 
};

export default App;
