import './AppBanner.scss';
import img1 from '../../resources/img/Avengers_logo.png';
import img2 from '../../resources/img/Avengers.png';
const AppBanner = () => {
    return(
        <div className="app__banner">
            <img src={img2} alt="." />
            <div className="app__banner-text">
                New comics every week!<br/>
                Stay tuned!
            </div>
            <img src={img1} alt="." />

        </div>
    )
}
export default AppBanner;