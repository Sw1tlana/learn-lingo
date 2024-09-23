import css from './RadioButtonGroup.module.css';
import React, { useState } from 'react';

const RadioButtonGroup = () => {
    const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    };
    
  return (
      <div>
        <label>
            <input
            type="radio"
            value="career"
            checked={selectedOption === 'career'}
            onChange={handleChange}
            />
            Career and business
          </label>
          <label>
              <input
                  type="radio"
                  value="kids"
                  checked={selectedOption === 'kids'}
                  onChange={handleChange}
              />
                Lesson for kids
          </label>
          <label>
              <input
                  type="radio"
                  value="exsams"
                  checked={selectedOption === 'exsams'}
                  onChange={handleChange}
              />
               Exams and coursework
          </label>
            <label>
              <input
                  type="radio"
                  value="culture"
                  checked={selectedOption === 'culture'}
                  onChange={handleChange}
              />
              Culture travel or hobby
          </label>
    </div>
  )
}

export default RadioButtonGroup;
