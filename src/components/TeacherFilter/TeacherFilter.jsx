import css from './TeacherFilter.module.css';
import { useState } from 'react';
import Select from 'react-select';
import { icons as sprite } from '../../shared/icons';

const TeacherFilter = () => {
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [selectLevel, setSelectedLevel] = useState(null);
  
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
  
  const priceOptions = prices.map(price => (
    {
      value: price,
      label: `${price}$`
    }));
  const languageOptions = languages.map(language => (
    {
      value: language,
      label: language
    }));
  const levelOptions = levels.map(level => (
    {
      value: level,
      label: level
    }));

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
                <Select
                    id="languageFilter"
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                    options={languageOptions}
                    placeholder="Select a language"
                    classNamePrefix="select"
                />
                <svg width={10} height={5} className={css.iconSelect}>
                    <use xlinkHref={`${sprite}#icon-select`} />
                </svg>
            </div>

            <div className={css.containerSelect}>
                <label htmlFor="levelFilter" className={css.label}>Level of knowledge</label>
                <Select
                    id="levelFilter"
                    value={selectLevel}
                    onChange={handleLevelChange}
                    options={levelOptions}
                    classNamePrefix="select"
                />
                <svg width={10} height={5} className={css.iconSelect}>
                    <use xlinkHref={`${sprite}#icon-select`} />
                </svg>      
            </div>

            <div className={css.containerSelect}>
                <label htmlFor="priceFilter" className={css.label}>Price</label>
                <Select
                    id="priceFilter"
                    value={selectedPrice}
                    onChange={handlePriceChange}
                    options={priceOptions}
                    classNamePrefix="select"
                />
                <svg width={10} height={5} className={css.iconSelect}>
                    <use xlinkHref={`${sprite}#icon-select`} />
                </svg>
            </div>
        </section>
  );
}

export default TeacherFilter;
