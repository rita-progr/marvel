import {Component} from 'react';

import AppHeader from "../AppHeader/AppHeader";
import CharInfo from "../CharInfo/CharInfo";
import CharList from "../CharList/CharList";
import RandomChar from '../randomChar/RandomChar';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';


import decoration from '../../resources/img/vision.png';
class App extends Component{
    state = {
        selectedId : null,
    }
    onCharSelected = (id) => {
        this.setState({selectedId:id})
    }
    render(){
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary>
                    <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                        <CharList onCharSelected = {this.onCharSelected}/>
                        </ErrorBoundary>
                        <ErrorBoundary>
                        <CharInfo charId = {this.state.selectedId}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }

};
export default App;