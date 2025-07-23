import React from 'react'

const Fees = ({ valuesandsubmit }) => {
  return (
    <form onSubmit={valuesandsubmit}>
      <div>
        <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" placeholder="Select a City" className="w-full md:w-14rem" />
      </div>
    </form>
  )
}

export default Fees