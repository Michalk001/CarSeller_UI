const SelectCustomStyle = {

    control: (provided) => ({
      // none of react-select's styles are passed to <Control />
      ...provided,
      borderRadius:"0",
      boxShadow: "-2px 1px 7px -4px rgba(0,0,0,0.56)"
    }),

  }

  export default SelectCustomStyle;