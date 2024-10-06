import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {Component} from 'react';
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';

class RandomChar extends Component{
    state = {
        char:{},
        loading:true,
        error:'',
    }
  componentDidMount(){
    this.updateModal();
  }
    onCharLoaded = (char) => {
        this.setState({char,loading:false})
    }
    marvelServices = new MarvelServices();
 updateModal = () => {
    const id = Math.floor(Math.random()*(1011400-1011000)+1011000);
    this.marvelServices
    .getCharacter(id)
    .then(this.onCharLoaded)
    .catch((error) => {
        this.setState({ error });
      });
 }
 onUpdateClick = () => {
    this.setState({loading:true})
    this.updateModal();
 }
 
    render(){
        const {char,loading} = this.state;
        return (
            <div className="randomchar">
                  {loading?<Spinner/>:<View char={char}/>}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.onUpdateClick} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
    
}
const View = ({char}) => {
    const {name,description,thumbnail,homepage,wiki} = char
    return (
                <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img"/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {description?(description.length > 150?description.slice(0,150) + '...' :description): 'Нет базы данных для данного персонажа' }
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage}  className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
    )
}

export default RandomChar;