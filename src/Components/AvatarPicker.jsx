import React, {useState ,useEffect, useRef} from 'react'
import { motion, AnimatePresence } from "framer-motion";

const avatars = [
  "/avatars/Avatar.jpg",
  "/avatars/Avatar1.jpg",
  "/avatars/Avatar2.jpg",
  "/avatars/Avatar3.jpg",
  "/avatars/Avatar4.png",
];

export default function AvatarPicker({ selected, onSelect }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (avatar) => {
    onSelect(avatar); //  Tell parent (Profile) about selected avatar
    setOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <img
        src={selected}
        alt="Avatar"
        className="w-14 h-14 rounded-full cursor-pointer border-2 border-blue-500"
        onClick={() => setOpen(!open)}
      />
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 p-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg z-10 flex gap-2"
          >
            {avatars.map((avatar) => (
              <img
                key={avatar}
                src={avatar}
                alt="Avatar option"
                onClick={() => handleSelect(avatar)}
                className={`w-9 h-9 rounded-full cursor-pointer border-2 ${
                  avatar === selected
                    ? "border-blue-500"
                    : "border-transparent hover:border-gray-400"
                }`}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
