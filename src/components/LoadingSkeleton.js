import React from "react";

const LoadingSkeleton = ({ numberOfSkeleton = 12 }) => {
  return (
    <div className="flex flex-wrap -m-4">
      {[...Array(numberOfSkeleton).keys()].map((_, index) => {
        return (
          <div key={index + 1} className="lg:w-1/4 md:w-1/2 p-4 w-full">
            <div
              className="skeleton skeleton-text"
              style={{ height: "10rem" }}
            ></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
          </div>
        );
      })}
    </div>
  );
};

export default LoadingSkeleton;
