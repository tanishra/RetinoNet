import React from 'react';

const ScheduleItem = ({ title, date, location }) => {
  return (
    <div className="mb-16 flex items-center justify-between text-lg font-medium">
      <div className="text-zinc-400">{title}</div>
      <div className="text-zinc-400">{date}</div>
      <div className="text-zinc-400">{location}</div>
    </div>
  );
};

export default ScheduleItem;
