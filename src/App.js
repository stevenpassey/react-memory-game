import React, { Component } from "react";
import "./App.css";
import Tileset from './components/Tileset';
import Tile from './components/Tile';

class App extends Component {

	constructor(props) {

		super(props);
		this.state = {
					  message: "react-memory-game", 
					  score: 0, 
					  clickedArray: [], 
					  tileset: generateTileset(1, this.addToClickedArray),
					  gray: "",
					  level: 1,
					  menu: false
		};

	}

	randomizeTileOrder = () => {

		let shuffledTileset = shuffle(this.state.tileset);
		this.setState({tileset: shuffledTileset});
	}

	addToClickedArray = (e) => {

		let oldScore = this.state.score;
		let oldArray = this.state.clickedArray;


		let newStringForComparison = e.target.id;
		let duplicateFound = false;

		oldArray.forEach((prevObject) => {

			let prevStringForComparison = prevObject;

			if(newStringForComparison === prevStringForComparison)
			{
				duplicateFound = true;
			}
		});

		if(duplicateFound)
		{
			this.setState({message: "Game Over!", gray: "gray", score: 0, clickedArray: []});
			setTimeout(() => { this.setState({message: "react-memory-game", gray: "", tileset: generateTileset(this.state.level, this.addToClickedArray)}) }, 2500);
		}
		else
		{
			oldScore++;
			oldArray.push(newStringForComparison);

			if(oldScore !== 5*this.state.level)
			{
				this.setState({message: oldScore, gray: "", score: oldScore, clickArray: oldArray});
				this.randomizeTileOrder();
			}
			else
			{
				this.setState({message: "You Win!", gray: "gray", score: 0, clickedArray: []});
				let newLevel = this.state.level !== 3 ? this.state.level + 1 : 3;
				setTimeout(() => { this.setState({level: newLevel, message: "react-memory-game", gray: "", tileset: generateTileset(newLevel, this.addToClickedArray)}) }, 2500);

			}
		}

	}

	showMenu = (e) => { this.setState({menu: !this.state.menu}); };

	selectLevel = (e) => { 
		if(e.target.parentElement.classList.value.indexOf("showMenu") === -1)
		{
			return;
		}

		if(e.target.dataset.id === "one")
		{
			this.setState({level: 1, message: "react-memory-game", score: 0, tileset: generateTileset(1, this.addToClickedArray)});
		}
		else if(e.target.dataset.id === "two")
		{
			this.setState({level: 2,  message: "react-memory-game", score: 0, tileset: generateTileset(2, this.addToClickedArray)});
		}
		else if(e.target.dataset.id === "three")
		{
			this.setState({level: 3,  message: "react-memory-game", score: 0, tileset: generateTileset(3, this.addToClickedArray)});
		}
	};
	
	checkMenu = (e) => { 
		if(this.state.menu)
		{
			if(e.target.tagName === "HEADER" || e.target.tagName === "MAIN" || e.target.tagName === "SECTION" || e.target.className.indexOf('tile') !== -1)
			{
				this.setState({menu: !this.state.menu});
			}
		}
	};

	render() {
		return (
		<div id="react-memory-game" onClick={this.checkMenu}>
			<div id="level-label" onClick={this.showMenu}>
				<div id="level-picker" className={this.state.menu ? levelNames[this.state.level] + " showMenu" : levelNames[this.state.level]}>
					<div data-id="one" onClick={this.selectLevel}>
						Level 1
					</div>
					<div data-id="two" onClick={this.selectLevel}>
						Level 2
					</div>
					<div data-id="three" onClick={this.selectLevel}>
						Level 3
					</div>
				</div>
				<div className={this.state.menu ? "level-arrow-down rotated" : "level-arrow-down"}>
				</div>
			</div>
			<header>
				{this.state.message}
			</header>
			<main>
				<Tileset gray={this.state.gray} content={this.state.tileset}/>
			</main>
		</div>
	);
  }
}

const tilesetColors = ["red", "green", "blue", "cyan", "purple", "orange"];
const levelNames = ["", "one", "two", "three"];

function generateTileset(level, callback)
{
	let tileset = [];
	let iterations = 5*level;

	for(let i = 0; i < iterations; i++)
	{
		let tileObject = {};

		tileObject.color = tilesetColors[randomNumber(0, tilesetColors.length-1)];
		tileObject.number = randomNumber(0, 9).toString();

		let newStringForComparison = tileObject.color + tileObject.number;
		let duplicateFound = false;

		tileset.forEach((prevTileObject) => {

			let prevStringForComparison = prevTileObject.props.color + prevTileObject.props.number;

			if(newStringForComparison === prevStringForComparison)
			{
				duplicateFound = true;
			}
		});

		if(duplicateFound)
		{
			iterations++;
		}
		else
		{
			tileset.push(<Tile color={tileObject.color} number={tileObject.number} id={newStringForComparison} key={newStringForComparison} cbProp={callback}/>);
		}
	}

	console.log("Random Generator iterated " + iterations + " times to create " + level*5 + " unique tiles.");

	return tileset;
}

function randomNumber(lower,upper)
{
	return Math.floor(Math.random() * (upper + 1)) + lower;
}

function shuffle(array) 
{
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export default App;
