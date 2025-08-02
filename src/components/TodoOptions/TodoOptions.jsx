import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./todoOptions.css";

export default function TodoOptions({ onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      const menuElement = document.querySelector('.menu-dropdown');
      if (ref.current && !ref.current.contains(e.target) && 
          menuElement && !menuElement.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleResize = () => {
      if (isOpen) {
        calculateMenuPosition();
      }
    };

    const handleScroll = () => {
      if (isOpen) {
        calculateMenuPosition();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("resize", handleResize);
      document.addEventListener("scroll", handleScroll);
      calculateMenuPosition();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("resize", handleResize);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const closeOtherMenus = () => {
        const allMenus = document.querySelectorAll('.menu-dropdown');
        allMenus.forEach(menu => {
          if (menu !== document.querySelector('.menu-dropdown')) {
            const todoOptions = menu.closest('.todo-options');
            if (todoOptions && todoOptions !== ref.current) {
              const event = new MouseEvent('mousedown', { bubbles: true });
              document.dispatchEvent(event);
            }
          }
        });
      };
      
      setTimeout(closeOtherMenus, 10);
    }
  }, [isOpen]);

  const calculateMenuPosition = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const menuHeight = 80;
      const spaceAbove = rect.top;
      
      const top = spaceAbove >= menuHeight ? rect.top - menuHeight - 8 : rect.bottom + 8;
      const left = rect.left - 140 + rect.width;
      
      setMenuPosition({ top, left });
    }
  };

  const handleEdit = () => {
    onEdit();
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    setIsOpen(false);
  };

  return (
    <div className="todo-options" ref={ref}>
      <button className="menu-toggle" onClick={() => setIsOpen((prev) => !prev)}>
        ⋮
      </button>

      {isOpen && createPortal(
        <div 
          className="menu-dropdown"
          style={{
            position: 'fixed',
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
            zIndex: 99999999
          }}
        >
          <button onClick={handleEdit}>Edit</button>
          <button className="delete-option" onClick={handleDelete}>Delete</button>
        </div>,
        document.body
      )}
    </div>
  );
}