import css from './TeacherFilter.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeFilter } from "../../redux/filters/slice";
import Select from 'react-select';

const TeacherFilter = () => {
  const dispatch = useDispatch();

  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  
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
     dispatch(changeFilter({ type: 'price', value: priceOptions }));
  };
    
  const handleLanguageChange = (languageOptions) => {
    setSelectedLanguage(languageOptions);
    console.log('Selected Language:', languageOptions);
    dispatch(changeFilter({ type: 'language', value: languageOptions }));
  };

  const handleLevelChange = (levelOptions) => {
    setSelectedLevel(levelOptions);
    dispatch(changeFilter({ type: 'level', value: levelOptions }));
  };
  
  const customStyles = {
    control: (provided) => ({
      ...provided,
      outline: 'none !important',
      border: 'none !important',
      backgroundColor: 'var(--white-bg-color) !important',
      padding: '8px !important',
      cursor: 'pointer !important',
      color: 'var(--primery-color) !important',
      boxShadow: 'none !important',
      fontWeight: '500 !important',
      fontSize: '18px !important',
      '&:hover': {
        border: 'none !important',
        fontWeight: '500',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected
        ? 'var(--primery-color)'
        : 'var(--secondary-bg-color)',
      backgroundColor: state.isFocused
        ? 'rgba(255, 255, 255, 0.1)'
        : 'transparent',
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
      marginTop: 0,
      margin: 0,
      padding: 0,
      border: 'none',
      boxShadow: 'none',
      backgroundColor: 'var(--white-bg-color)',
      maxHeight: 'none',
      overflow: 'hidden',

    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,
      maxHeight: 'none',
      overflowY: 'hidden',
    }),
    menuPortal: (provided) => ({
      ...provided,
      marginTop: '4px',
      zIndex: 10,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'var(--primery-color)',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
  };

  return (
    <section className={css.filterContainer}>
      <div className={css.containerSelect}>
        <label
          htmlFor="languageFilter"
          className={css.label}>Languages
        </label>
        <Select
          id="languageFilter"
          value={selectedLanguage}
          onChange={handleLanguageChange}
          options={languageOptions}
          placeholder="Select a language"
          styles={customStyles}
          menuPosition="fixed"
        />
      </div>

      <div className={css.containerSelect}>
        <label
          htmlFor="levelFilter"
          className={css.label}>Level of knowledge
        </label>
        <Select
          id="levelFilter"
          value={selectedLevel}
          onChange={handleLevelChange}
          options={levelOptions}
          styles={customStyles}
          menuPosition="fixed"
        />
      </div>

      <div className={css.containerSelectPrice}>
        <label
          htmlFor="priceFilter"
          className={css.label}>Price
        </label>
        <Select
          id="priceFilter"
          value={selectedPrice}
          onChange={handlePriceChange}
          options={priceOptions}
          styles={customStyles}
          menuPosition="fixed"
        />
      </div>
    </section>
  );
};

export default TeacherFilter;
