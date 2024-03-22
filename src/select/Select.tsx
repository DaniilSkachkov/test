import React from 'react'
import { SelectOptionType, SelectType } from './Types'
import { ReactComponent as ArrowIcon } from './Arrow-Icon.svg'
import useListenForOutsideClicks from '../hooks/useListenForOutsideClicks '
import './Select.css'

const Select = ({ selected, options, handleChange, placeholder, lastOptionRef }: SelectType) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  }

  const { elementRef } = useListenForOutsideClicks(handleClose);

  const renderOptions = (options: SelectOptionType[]) => {
    if (options.length === 0) {
      return (
        <div className='relative cursor-default select-none py-2 pl-3 pr-9'>
          <span className='font-normal block truncate text-sm text-black'>No options here</span>
        </div>
      );
    }

    return options.map((option, index) => {
      const isSelected = selected?.value === option.value;

      return (
        <span
          key={index}
          className={isSelected ? 'selectedOption option' : 'option'}
          ref={options?.length - 1 === index ? lastOptionRef : null}
          onClick={() => {
            handleChange(option);
            handleClose();
          }}
        >
          <figure className='optionAvatar'>
            {option.label.split('')[0]}
          </figure>
          {option.label}
        </span>
      )
    });
  };

  return (
    <div className='select'>
      <button type='button' onClick={handleIsOpen} className="selectInput">
        {selected?.label || placeholder}
        <ArrowIcon />
      </button>

      {isOpen && (
        <div className="list" ref={elementRef}>
          {renderOptions(options)}
        </div>
      )}
    </div>
  )
}

export default Select;
