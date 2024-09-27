import css from './TeacherFilter.module.css';
import { useState } from 'react';
import Select from 'react-select';
// import { icons as sprite } from '../../shared/icons';

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

const handlePriceChange = (priceOptions) => {
    setSelectedPrice(priceOptions);
    };
    
const handleLanguageChange = (languageOptions) => {
    setSelectedLanguage(languageOptions);
    }

const handleLevelChange = (levelOptions) => {
    setSelectedLevel(levelOptions);
  }
  
const customStyles = {
        control: (provided) => ({
            ...provided,
            outline: 'none !important',
            border: 'none !important',
            backgroundColor: 'transparent !important',
            padding: '8px !important',
            cursor: 'pointer !important',
            color: 'var(--primery-color) !important',
            boxShadow: 'none !important',
            '&:hover': {
                border: 'none !important',
            },
        }),
    option: (provided, state) => ({
        ...provided,
        color: state.isFocused ? 'var(--secondary-bg-color)' : 'var(--secondary-bg-color)',
        backgroundColor: state.isFocused ? 'rgba(255, 255, 255, 0.1)' : 'transparent', 
        padding: '8px 12px',
        cursor: 'pointer',
        fontSize: '18px',
        fontWeight: '500',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'var(--secondary-bg-color)',
    }),
    menu: (provided) => ({
        ...provided,
        margin: 0,
        padding: 0,
        border: 'none',
        boxShadow: 'none',
      backgroundColor: 'transparent',

    }),
    menuPortal: (provided) => ({
        ...provided,
        zIndex: 9999,
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'var(--primery-color)',
    }),
};

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
                    className={customStyles} 
                />

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

            </div>
        </section>
  );
}

export default TeacherFilter;
