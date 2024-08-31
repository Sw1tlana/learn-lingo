import 'simplebar-react/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';
import { useRef } from 'react';
import "./CustomScrollWrapper.css";

const CustomScrollWrapper = ({ children }) => {
  const scrollbarRef = useRef(null);

  return (
    <SimpleBar ref={scrollbarRef} className="customScrollWrapper">
      {children}
    </SimpleBar>
  );
};

export default CustomScrollWrapper;