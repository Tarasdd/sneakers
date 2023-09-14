import React from "react"

export const Select = ( {options, defaultValue, value, onChange}) => {

  // console.log(options);
  // console.log(defaultValue);
  // console.log(value);
  // console.log(onChange);
  
  return (
    <select className="select-custom"
      value={value}
      onChange={event =>  onChange(event.target.value)}
    >
      <option disabled>
        {defaultValue}
      </option>
      {options.map(option => 
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      )}
    </select>
  )
}