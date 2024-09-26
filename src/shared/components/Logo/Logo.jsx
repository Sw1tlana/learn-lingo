import css from './Logo.module.css';
import { icons as sprite } from '../../../shared/icons';

const Logo = () => {
    return (
        <div className={css.containerLogo}>
            <svg width={20}
                height={20}
                className={css.svgLogo}>
              <use
                 xlinkHref={`${sprite}#icon-ukraine`} />
              </svg>
            <h2 className={css.titleHeader}>LearnLingo</h2>
        </div>
    )
};

export default Logo;
