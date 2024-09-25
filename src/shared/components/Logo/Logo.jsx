import css from './Logo.module.css';
import { icons as sprite } from '../../../shared/icons';

const Logo = () => {
    return (
        <div>
            <svg width={20} height={20}>
                <use
            xlinkHref={`${sprite}#icon-ukraine`} />
            </svg>
            <h2 className={css.hederTitle}>LearnLingo</h2>
        </div>
    )
};

export default Logo;
