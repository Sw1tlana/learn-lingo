import css from './TeacherFilter.module.css';
import { useState } from 'react';
import { icons as sprite } from '../../shared/icons';

const TeacherFilter = () => {
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectLevel, setSelectedLevel] = useState('');
  
    const prices = [10, 20, 30, 40, 50];
    const languages = [
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Mandarin Chinese',
  'Vietnamese',
  'Korean'];
    
    const levels = [
        "A1 Beginner",
        "A2 Elementary",
        "B1 Intermediate",
        "B2 Upper-Intermediate",
        "C1 Advanced",
        "C2 Proficient"];

const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
    };
    
const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    }

const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
    }

  return (
      <section className={css.filterContainer}>
          
        <div className={css.containerSelect}>
            <label htmlFor="languageFilter" className={css.label}>Languages</label>
         <select
            id="languageFilter"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className={css.select}>
            {languages.map((language, index) => (
                <option key={index} value={language}>
                    {language}
                </option> 
                ))}      
            </select>
            <svg width={10} height={5} className={css.iconSelect}>
              <use xlinkHref={`${sprite}#icon-select`} />
            </svg>
            </div>
          
        <div className={css.containerSelect}> 
         <label htmlFor="levelFilter" className={css.label}>Level of knowledge</label>
        <select
            id="levelFilter"
            value={selectLevel}
            onChange={handleLevelChange}
            className={css.select}>
            {levels.map((level, index) => (
                <option key={index} value={level}>
                {level}
                </option>
            ))}
              </select>
            <svg width={10} height={5} className={css.iconSelect}>
              <use xlinkHref={`${sprite}#icon-select`} />
            </svg>      
        </div>

      <div className={css.containerSelect}>
        <label htmlFor="priceFilter" className={css.label}>Price</label>
        <select
          id="priceFilter"
          value={selectedPrice}
          onChange={handlePriceChange}
          className={css.select}
        >
          {prices.map((price, index) => (
            <option key={index} value={price}>
              {price}$
            </option>
          ))}
              </select>
            <svg width={10} height={5} className={css.iconSelect}>
              <use xlinkHref={`${sprite}#icon-select`} />
            </svg>
      </div>
    </section>
  );
}

export default TeacherFilter;
