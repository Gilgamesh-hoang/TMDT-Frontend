import React from "react";
export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}
export const Features: React.FC<{ features: Feature[] }> = ({ features }) => {
  return (
    <div className="py-2">
      <div className="grid grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex-center flex-col py-6 px-10 hover:bg-secondary/40  transition-colors
            rounded-2xl group"
          >
            <div className="text-primary group-hover:scale-120 transition-transform">{feature.icon}</div>
            <h2>{feature.title}</h2>
            <p className="text-center">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
