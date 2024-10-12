import css from './TeacherFilter.module.css';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import toast from 'react-hot-toast';

const TeacherFilter = ({ onFilterChange }) => {

  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [filteredLevels, setFilteredLevels] = useState([]);
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
    'Korean'
  ];
    
const levelsByLanguage = {
  'English': ["A1 Beginner", "A2 Elementary", "B1 Intermediate", "B2 Upper-Intermediate", "C1 Advanced", "C2 Proficient"],
  'Spanish': ["A1 Beginner", "A2 Elementary", "B1 Intermediate", "B2 Upper-Intermediate", "C1 Advanced", "C2 Proficient"],
  'French': ["A1 Beginner", "A2 Elementary", "B1 Intermediate", "B2 Upper-Intermediate"],
  'German': ["A1 Beginner", "A2 Elementary", "B1 Intermediate", "C1 Advanced"],
  'Italian': ["A1 Beginner", "A2 Elementary", "B1 Intermediate"],
  'Mandarin Chinese': ["A1 Beginner", "A2 Elementary", "B1 Intermediate", "B2 Upper-Intermediate"],
  'Vietnamese': ["A1 Beginner", "A2 Elementary"],
  'Korean': ["A1 Beginner", "A2 Elementary", "B1 Intermediate", "C1 Advanced"]
};
  
  const priceOption = prices.map(price => ({
    value: price,
    label: `${price}$`,
  }));

  const languageOptions = languages.map(language => ({
    value: language,
    label: language,
  }));

  const levelOption = filteredLevels.map(level => ({
    value: level,
    label: level,
  }));

  useEffect(() => {
    if (selectedLanguage) {
      setSelectedLevel(null);
      setFilteredLevels(levelsByLanguage[selectedLanguage.value] || []);
    } else {
      setFilteredLevels([]);
    }
  }, [selectedLanguage]);

const handlePriceChange = (priceOption) => {
  if (!priceOption) {
    toast.error("Price not selected!");
  } else {
    const selectedPriceValue = priceOption.value;

    if (selectedPriceValue >= 10 && selectedPriceValue <= 20) {
      toast.error("Price from 10 to 20 is not available!");
    } else if (selectedPriceValue >= 20 && selectedPriceValue < 30) {
    
      setSelectedPrice(priceOption);
      onFilterChange({ price: Number(priceOption.value) });
    } else if (selectedPriceValue >= 30 && selectedPriceValue < 40) {
 
      setSelectedPrice(priceOption);
      onFilterChange({ price: Number(priceOption.value) });
    } else if (selectedPriceValue >= 40 && selectedPriceValue <= 50) {
      toast.error("Price from 40 to 50 is not available!");
    } else {
  
      toast.error("Price is not available!");
    }
  }
};

const handleLanguageChange = (languageOption) => {
  setSelectedLanguage(languageOption);
  onFilterChange({ language: languageOption ? languageOption.value : null });
};

const handleLevelChange = (levelOption) => {
  setSelectedLevel(levelOption);
  onFilterChange({ level: levelOption ? levelOption.value : null });
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
        <label htmlFor="languageFilter" className={css.label}>
          Languages
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
        <label htmlFor="levelFilter" className={css.label}>
          Level of knowledge
        </label>
        <Select
          id="levelFilter"
          value={selectedLevel}
          onChange={handleLevelChange}
          options={levelOption} 
          styles={customStyles}
          menuPosition="fixed"
          isDisabled={!filteredLevels.length}
        />
      </div>

      <div className={css.containerSelectPrice}>
        <label htmlFor="priceFilter" className={css.label}>
          Price
        </label>
        <Select
          id="priceFilter"
          value={selectedPrice}
          onChange={handlePriceChange}
          options={priceOption}
          styles={customStyles}
          menuPosition="fixed"
        />
      </div>
    </section>
  );
};

export default TeacherFilter;