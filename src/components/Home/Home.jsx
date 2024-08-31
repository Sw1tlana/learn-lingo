import css from './Home.module.css';
import Container from '../../shared/components/Container/Container';
import {
    boyPng1x,
    boyWebp1x,
    boyPng2x,
    boyWebp2x
} from '../../shared/images/index';

const Home = () => {
    return (
        <section>
            <Container>
            <div>
            <h1>Unlock your potential with the best <span>language</span> tutors</h1>
            <p>Embark on an Exciting Language Journey with Expert Language Tutors:
                Elevate your language proficiency to new heights by connecting with highly
                qualified and experienced tutors.
                </p>
                <button type='button'>Get started</button>
                </div>
                <div>
                    <picture>
                        <source srcSet={`${boyWebp1x} 1x, ${boyWebp2x} 2x`} type="image/webp" />
                        <source srcSet={`${boyPng1x} 1x, ${boyPng2x} 2x`} type="image/png" />
                        <img src={boyPng1x} alt="Language learning" />
                    </picture>
                </div>
                <div>
                    <ul>
                        <li>
                            <span>32,000 +</span>
                            <span>Experienced tutors</span>
                        </li>
                        <li>
                            <span>300,000 +</span>
                            <span>5-star tutor reviews</span>
                        </li>
                        <li>
                            <span>120 +</span>
                            <span>Subjects taught</span>
                        </li>
                        <li>
                            <span>200 +</span>
                            <span>Tutor nationalities</span>
                        </li>
                    </ul>
                </div>
            </Container>
        </section>
    )
};

export default Home;
