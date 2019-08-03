import React, { Component } from "react";
import CanvasDraw from "react-canvas-draw";
import firebase from 'firebase'
import { Button } from 'antd';
import './App.css'
import 'antd/dist/antd.css'; 
import Sky from './sky'
import { hot } from 'react-hot-loader'
class App extends Component {
  state = {
    color: "#ffc600",
    width: 400,
    height: 350,
    brushRadius: 3,
    lazyRadius: 5,
    savedPictureList:[],
  };

  async componentDidMount(){
    try {
   
      firebase.initializeApp({
        apiKey: 'AIzaSyDPSLUchbojKkZQI2oMLa5eUB67Qyyg65w',
        authDomain: 'toilet-wall.firebaseapp.com',
        projectId: 'toilet-wall'
      });
      
      let vector=[]
      let db = firebase.firestore();
      await db.collection("toilet-wall").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} =>`,doc.data());
            vector=[...vector, doc.data().vector]
        })
      })
      console.log('vector',vector)
      // this.setState({savedPictureList:vector})
    } catch (e) {
      console.log('error',e)
    }
  }

  handleSavePicture=()=>{
    this.handleRandomColor()
    const data =JSON.parse(this.saveableCanvas.getSaveData())
    if(data.lines.length>0){
      const savedPictureList= [...this.state.savedPictureList,this.saveableCanvas.getSaveData() ]
      this.setState({
        savedPictureList
      })
    }  
  }
  handleRandomColor=()=>{
    this.setState({color:"#" + Math.floor(Math.random() * 16777215).toString(16)})
  }
  render() {
    const {savedPictureList}=this.state
    return (
      <div className="App">
        <Sky
         size='50px'
         time={50} 
         how={savedPictureList.length+5} 
         savedPictureList={savedPictureList}
         > 
           </Sky>
          <div className="canvas-drower ">
            <div className="label">
            Toilet Wall
            </div>
          <CanvasDraw
            style={{background: "#6b6b6b47" ,zIndex:"25",borderRadius:'14px'}}
            hideGrid
            ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
            brushColor={this.state.color}
            brushRadius={this.state.brushRadius}
            lazyRadius={this.state.lazyRadius}
            canvasWidth={this.state.width}
            canvasHeight={this.state.height}
          />
          
            <div>
              <Button onClick={this.handleSavePicture} > Save  </Button>
              <Button onClick={() => {this.saveableCanvas.clear()}} >
                Clear
              </Button>
              <Button onClick={() => {this.saveableCanvas.undo()}}  >
                Undo
              </Button>
              <Button style={{marginLeft:'10px'}} onClick={this.handleRandomColor} > change Color  </Button>
            </div>
          </div>
      </div>
    );
  }
}

export default App