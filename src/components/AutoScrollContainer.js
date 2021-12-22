import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const AutoScrollContainer = ({ children }) => {
  const container = useRef();
  const location = useLocation();

  useEffect(() => {
    container.current.scrollTo(0, 0);
  }, []);

  return <div ref={container}>{children}</div>;
};

export default AutoScrollContainer;
