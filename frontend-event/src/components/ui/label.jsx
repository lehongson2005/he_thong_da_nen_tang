// label.jsx
import React from "react";

// Component Label
// Props:
// - text: nội dung hiển thị
// - htmlFor: id của input liên kết (tùy chọn)
// - className: thêm class tuỳ chỉnh (tùy chọn)
const Label = ({ text, htmlFor = "", className = "" }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block font-medium text-sm text-gray-700 ${className}`}
    >
      {text}
    </label>
  );
};

export default Label;
