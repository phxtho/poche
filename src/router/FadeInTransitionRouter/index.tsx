import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Router, Location } from "@reach/router";
import "./style.css";

const FadeInTransitionRouter = (props) => {
  return (
    <Location>
      {({ location }) => (
        <TransitionGroup className="transition-group">
          <CSSTransition key={location.key} classNames="fade" timeout={500}>
            <Router location={location}>{props.children}</Router>
          </CSSTransition>
        </TransitionGroup>
      )}
    </Location>
  );
};

export default FadeInTransitionRouter;
