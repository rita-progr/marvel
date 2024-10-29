import { useParams,useNavigate} from 'react-router-dom';
import {useState,useEffect} from "react";
import { Helmet } from 'react-helmet';
import UseMarvelServices from '../../services/MarvelServices';
import './singleComicPage.scss';
import setContent from '../../utils/setContent';
const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic,setComic] = useState(null);
    const {getComics,clearError,process,setProcess} = UseMarvelServices();
    useEffect(()=>{
        updateComic();
    },[comicId])
    const updateComic =  () => {
        clearError();
          getComics(comicId)
          .then(onComicLoaded)
          .then(()=>setProcess('confirmed'));
      }
      const onComicLoaded = (comic) =>{
        setComic(comic);
      }
    return (
        <>
        {setContent(process,View,comic)}
        </>
    )
}
const View = ({data})=>{
    const navigate = useNavigate();
    const {title,description,thumbnail,language,price,pageCount} = data;
    return(
    <div className="single-comic">
           <Helmet>
        <meta
          name="description"
         content={description}
        />
        <title>{title}</title>
        </Helmet>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <button className="single-comic__back" onClick = {()=>navigate(-1)} style = {{'backgroundColor':'white','border':'1px solid black', 'padding':'5px', 'borderRadius':'5px'}}>Back to all</button>
        </div>
    )

}

export default SingleComicPage;