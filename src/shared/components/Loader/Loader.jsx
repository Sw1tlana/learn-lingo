import css from './Loader.module.css';
import { ColorRing } from 'react-loader-spinner';

const Loader = () => {
    return (
    <div className={css.loader}>
      <div className={css.colorRing}>
        <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={[' #E0A39A', 'F2C0BD', '#CBDED3', '#F4C8BA', 'BFD6EA']}
      />
      </div>
    </div>
    )
};

export default Loader;
