import css from './Home.module.css';
import {
    boyPng1x,
    boyWebp1x,
    boyPng2x,
    boyWebp2x
} from '../../shared/images/index';
import Container from '../../shared/components/Container/Container';

const Home = () => {

    return (
        <Container>
        <div className={css.wrapperHome}>
        <section className={css.sectionHome}>
        <div className={css.containerHome}>
                    <h1 className={css.titleHome}>
                        Unlock your potential with the best
                        <span className={css.spanTitleHome}> language</span> tutors
                    </h1>
            <p className={css.textHome}>
                Embark on an Exciting Language Journey with Expert Language Tutors:
                Elevate your language proficiency to new heights by connecting with highly
                qualified and experienced tutors.
            </p>
                <button
                    type='button'
                    className={css.btnHome}
                    >Get started
                </button>
                </div>
              
                    <picture className={css.containerImg}>
                        <source srcSet={`${boyWebp1x} 1x, ${boyWebp2x} 2x`}type="image/webp"/>
                        <source srcSet={`${boyPng1x} 1x, ${boyPng2x} 2x`} type="image/png" />
                        <img className={css.imgHome} src={boyPng1x} alt="Language learning" />
                    </picture>
             
            </section>
                    <ul className={css.listInfoHome}>
                        <li>
                    <div className={css.textMini}>
                        <p className={css.number}>32,000 + </p>
                    <span className={css.span}>Experienced <br /> tutors</span>
                    </div>
                        </li>
                        <li>
                    <div className={css.textMini}>
                        <p className={css.number}>300,000 + </p>
                    <span className={css.span}>5-star tutor<br />reviews</span>
                    </div>
                        </li>
                        <li>
                    <div className={css.textMini}>
                        <p className={css.number}>120 + </p> 
                    <span className={css.span}>Subjects<br/> taught</span>
                    </div>
                        </li>
                        <li>
                    <div className={css.textMini}>
                        <p className={css.number}>200 + </p> 
                    <span className={css.span}>Tutor<br/> nationalities</span>
                    </div>
                </li>
                </ul> 
            </div>    
        </Container>
    )
};

export default Home;
