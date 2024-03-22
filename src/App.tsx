import React from 'react'
import Select from './select/Select'
import './App.css'
import useOptions from './hooks/useOptions'
import { SelectOptionType } from './select/Types'

const App = () => {
  const [value, setValue] = React.useState<SelectOptionType | undefined>(undefined);
  const { isLoading, formattedOptions, lastEntryRef } = useOptions();

  return (
    <div className="app">
      <Select
        options={formattedOptions}
        selected={value}
        placeholder='Select'
        handleChange={(newSelected) => setValue(newSelected)}
        loading={isLoading}
        lastOptionRef={lastEntryRef}
      />
    </div>
  )
}

export default App;