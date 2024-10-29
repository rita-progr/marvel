import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";
const ErrorPage = () => {
    return(
        <div>
            <ErrorMessage/>
            <p style = {{'textAlign':'center', 'fontWeight':'bold','fontSize': '24px'}}>Page doesn`t exist</p>
            <Link  style = {{'display':'block','marginTop':'30px' ,'textAlign':'center', 'fontWeight':'bold','fontSize': '24px'}}
             to='/'>Back to main page
            </Link>
        </div>
    )
}
export default ErrorPage;