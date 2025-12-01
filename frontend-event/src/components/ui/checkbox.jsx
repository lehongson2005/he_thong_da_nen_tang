// checkbox.jsx
import React from "react";

// Component Checkbox
// Props:
// - id: id của checkbox
// - checked: trạng thái checked (boolean)
// - onChange: hàm xử lý khi checkbox thay đổi
// - label: nhãn hiển thị bên cạnh checkbox
// - className: thêm class tùy chỉnh cho container
const Checkbox = ({ id, checked, onChange, label, className = "" }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      {label && (
        <label htmlFor={id} className="text-gray-700 text-sm select-none">
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
