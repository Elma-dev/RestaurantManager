import { useNavigate } from "react-router";
import { useParams } from "react-router";
function withNavigation(Component) {
    return props => <Component {...props} navigate={useNavigate()} />;
  }
  
function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }

  export default withParams;