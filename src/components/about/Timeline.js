import React from "react";
import TimelineCard from "./TimelineCard";
export default function Timeline({ items, activeTab }) {
  return (
    <div className="timeline">
      {items.map((item) => (
        <TimelineCard key={item.id} item={item} type={activeTab} />
      ))}
    </div>
  );
}
