import React,{Component, useState} from "react";
import App from "../App";
import './SortingVisualizer.css'
import { getMergeSortAnimations } from "../Sorting/mergeSort";
import { quickSortAnimation } from "../Sorting/quickSort";
import { Slider } from "@mui/material";
import Box from '@mui/material/Box';
const ANIMATION_SPEED_MS = 5;
const NUMBER_OF_ARRAY_BARS = 310;
const PRIMARY_COLOR = 'lightgreen';
const SECONDARY_COLOR = 'red';

export class SortingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            value:0,
            isStopped:false,
            isButtonDisabled: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.onLaunchClicked = this.onLaunchClicked.bind(this);
    }
    componentDidMount(){
        
        this.resetArray();   
    }

    onLaunchClicked (event) {
        event.preventDefault();
        this.setState({
            isButtonDisabled: true
        });
    
        setTimeout(() => this.setState({ isButtonDisabled: false }), ((100-this.state.value)*10));
    
    }

    changeColor(){
        let arr = [];
        arr = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arr.length; i++) {
            const di = arr[i];  di.style.backgroundColor = `aquamarine`;
        }
    }

    resetArray(){
        const array= [];
        for(let i=0;i<150;i++){
            array.push(randomIntegersFromInterval(5,700));
        }
        this.changeColor();
        this.setState({array});
    }
    
    mergeSort(){
       
       const animations = getMergeSortAnimations(this.state.array);
        //if (!this.state.isStopped) {
            for (let i = 0; i < animations.length; i++) {
                const arrayBars = document.getElementsByClassName('array-bar');
                const isColorChange = i % 3 !== 2;
                if (isColorChange) {
                    const [barOneIdx, barTwoIdx] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                    setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                    }, i * (100-this.state.value));
                } else {
                    setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight/2}px`;
                    }, i * (100-this.state.value) );
                }
            }
        //}
        
    }

    quickSort(){
        //if (!this.state.isStopped) {
            const animations = quickSortAnimation(this.state.array);
            for (let i = 0; i < animations.length; i++) {
                const arrayBars = document.getElementsByClassName('array-bar');
                const isColorChange = i % 3 !== 2;
                if (isColorChange) {
                    const [barOneIdx, barTwoIdx] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx-1].style;
                    const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                    setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                    }, i * this.state.value);
                } else {
                    setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                    }, i * this.state.value);
                }
            }
        //}
        
    }

    testSortingAlgorithms() {
        for (let i = 0; i < 100; i++) {
          const array = [];
          const length = randomIntegersFromInterval(1, 1000);
          for (let i = 0; i < length; i++) {
            array.push(randomIntegersFromInterval(-1000, 1000));
          }
          const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
          const mergeSortedArray = quickSortAnimation(array.slice());
          console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    onClick1(event){
        this.resetArray();
    }

    onClick2(event){
        this.mergeSort();
        this.onLaunchClicked(event);
    }

    render(){
        const {array} = this.state;
        return (    
            <React.Fragment>
                <h2 className="heading">MergeSort visualizer</h2>
                <p className="ptag">Please scroll down for description!</p>
            <div className="array-container">
                {array.map((value,index)=>(
                    <div className="array-bar" key={index} style={{backgroundColor:`aquamarine` ,height: `${value/2}px`}}>

                    </div>
                ))}
                
            </div>
            <div className="buttons">
                <button className="button-33" disabled={this.state.isButtonDisabled}  onClick={()=> this.resetArray()}>Reset</button>
                <button className="button-33" disabled={this.state.isButtonDisabled} onClick={(e)=> this.mergeSort()}>Sort</button>
                {/* <button className="button-33" disabled={this.state.isButtonDisabled}>Stop</button> */}
            </div>
            <Box className="box" width={200}>
                <span style={{color:`white`}}>Adjust the speed:</span>
                <Slider onChange={this.handleChange} defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
            </Box>
            <div className="desc">
                <p>Merge sort is a method by which you break an unsorted array down into two smaller halves and so forth until you have a bunch of arrays of only two items. You sort each one, then merge each with another two-item array, then you merge the four-item arrays and so on all the way back up to a fully sorted array.</p>
            </div>
            </React.Fragment>
        );
    }


}

function randomIntegersFromInterval(min,max)
{
    return Math.floor(Math.random() * (max-min+1)+min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
      if (arrayOne[i] !== arrayTwo[i]) {
        return false;
      }
    }
    return true;
}

export default App;