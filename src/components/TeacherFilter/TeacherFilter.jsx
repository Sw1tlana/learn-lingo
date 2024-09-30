import css from './TeacherFilter.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeFilter } from "../../redux/filters/slice";
import Select from 'react-select';
import toast from 'react-hot-toast'; 

const TeacherFilter = () => {
  const dispatch = useDispatch();

  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [levelOptions, setLevelOptions] = useState([]);
  
  const prices = [10, 20, 30, 40];
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
  {
    language: 'English',
    levels: [
      "A1 Beginner",
      "A2 Elementary",
      "B1 Intermediate",
      "B2 Upper-Intermediate",
      "C1 Advanced",
      "C2 Proficient",
    ]
  },
  {
    language: 'Spanish',
    levels: [
      "A1 Beginner",
      "A2 Elementary",
      "B1 Intermediate",
      "B2 Upper-Intermediate",
      "C1 Advanced",
      "C2 Proficient",
    ]
  },
  {
    language: 'French',
    levels: [
      "A1 Beginner",
      "A2 Elementary",
      "B1 Intermediate",
      "B2 Upper-Intermediate",
      "C1 Advanced",
      "C2 Proficient",
    ]
  },
  {
    language: 'German',
    levels: [
      "A1 Beginner",
      "A2 Elementary",
      "B1 Intermediate",
      "B2 Upper-Intermediate",
      "C1 Advanced",
      "C2 Proficient",
    ]
  },
  {
    language: 'Italian',
    levels: [
      "A1 Beginner",
      "A2 Elementary",
      "B1 Intermediate",
      "B2 Upper-Intermediate",
      "C1 Advanced",
      "C2 Proficient",
    ]
  },
  {
    language: 'Mandarin Chinese',
    levels: [
      "A1 Beginner",
      "A2 Elementary",
      "B1 Intermediate",
      "B2 Upper-Intermediate",
      "C1 Advanced",
      "C2 Proficient",
    ]
  },
  {
    language: 'Vietnamese',
    levels: [
      "A1 Beginner",
      "A2 Elementary",
      "B1 Intermediate",
      "B2 Upper-Intermediate",
      "C1 Advanced",
      "C2 Proficient",
    ]
  },
  {
    language: 'Korean',
    levels: [
      "A1 Beginner",
      "A2 Elementary",
      "B1 Intermediate",
      "B2 Upper-Intermediate",
      "C1 Advanced",
      "C2 Proficient",
    ]
  }
];

  
  const priceOption = prices.map(price => (
    {
      value: price,
      label: `${price}$`
    }));
  const languageOptions = languages.map(language => (
    {
      value: language,
      label: language
    }));

  const handlePriceChange = (priceOption) => {
    setSelectedPrice(priceOption);

    if (priceOption && priceOption.value >= 10 && priceOption.value < 20) {
      toast.error("Price is outside the allowed range");;
    } else if (priceOption && priceOption.value >= 20 && priceOption.value < 30) {
      toast.success("Price range from 20 to 30$");
    } else if (priceOption && priceOption.value >= 30 && priceOption.value <= 40) {
      toast.success("Price range from 30 to 40$");
    } else {
      toast.error("Price is outside the allowed range");
    }
  };
    
  const handleLanguageChange = (languageOption) => {
    setSelectedLanguage(languageOption);
    console.log('Selected Language:', languageOption);
    
    const selectedLanguageData = levels.find(lang => lang.language === languageOption.value);
    const levelOptions = selectedLanguageData ? selectedLanguageData.levels.map(level => ({
      value: level,
      label: level
    })) : [];
    
    setLevelOptions(levelOptions);
    dispatch(changeFilter({ language: languageOption ? languageOption.value : null }));
  };


  const handleLevelChange = (levelOptions) => {
    setSelectedLevel(levelOptions);
    console.log('Selected level:', levelOptions);

    if (!selectedLanguage) {
        toast.error("Please select a language first.");
      
        return; 
    } else if (!levelOptions) {
        toast.error("No level selected.");
      
        return; 
    } else if (!levelOptions.value) {
        toast.error("No such level exists.");
       
        return; 
    } else {
        toast.success(`Selected level: ${levelOptions.label}`);
 
    }
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
          options={priceOption}
          styles={customStyles}
          menuPosition="fixed"
        />
      </div>
    </section>
  );
};

export default TeacherFilter;
