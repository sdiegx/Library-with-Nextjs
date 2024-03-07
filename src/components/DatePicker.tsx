import React, { ChangeEvent } from 'react';

interface DatePickerProps {
  start_date: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  end_date: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
}

const DatePicker: React.FC<DatePickerProps> = ({ start_date, setStartDate, end_date, setEndDate }) => {

  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    if (selectedDate <= end_date && selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    if (selectedDate >= start_date ) {
      setEndDate(selectedDate);
    }
  };

  return (
    <div>
      <div className="inline-flex">
        <label htmlFor="start-date" className="mr-2">Fecha de inicio:</label>
        <input
          type="date"
          id="start-date"
          value={start_date}
          onChange={handleStartDateChange}
          className="border border-gray-300 rounded px-2 py-1"
          min={new Date().toISOString().split('T')[0]}
        />
      </div>
      <div className="inline-flex ml-4">
        <label htmlFor="end-date" className="mr-2">Fecha de fin:</label>
        <input
          type="date"
          id="end-date"
          value={end_date}
          onChange={handleEndDateChange}
          className="border border-gray-300 rounded px-2 py-1"
          min={start_date}
        />
      </div>
    </div>
  );
};

export default DatePicker;
