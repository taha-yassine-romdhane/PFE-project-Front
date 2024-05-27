// components/TreeItem.jsx
import React from 'react';
import {
  FiFolder,
  FiEdit,
  FiTrash2,
  FiChevronRight,
  FiChevronDown,
  FiPlus,
} from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';

const TreeItem = ({
  item,
  isExpanded,
  handleToggle,
  handleEdit,
  handleDelete,
  handleAddCategory,
  isCategory,
}) => {
  return (
    <div className="flex justify-between items-center py-1">
      <div className="flex items-center">
        {isCategory ? (
          <IoSettingsOutline className="mr-2 text-gray-500" />
        ) : (
          <>
            <button onClick={() => handleToggle(item.id)}>
              {isExpanded ? (
                <FiChevronDown className="text-gray-500" />
              ) : (
                <FiChevronRight className="text-gray-500" />
              )}
            </button>
            <FiFolder className="mr-2 text-gray-500" />
          </>
        )}
        <span>{item.name}</span>
      </div>
      <div className="flex items-center">
        {!isCategory && (
          <button
            onClick={() => handleEdit(item.id)}
            className="p-1 hover:text-blue-500"
          >
            <FiEdit />
          </button>
        )}
        <button
          onClick={() => handleDelete(item.id)}
          className="p-1 hover:text-red-500"
        >
          <FiTrash2 />
        </button>
        {!isCategory && (
          <button
            onClick={() => handleAddCategory(item.id)}
            className="p-1 hover:text-green-500"
          >
            <FiPlus />
          </button>
        )}
      </div>
    </div>
  );
};

export default TreeItem;
