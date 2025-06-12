import { useEffect, useRef, useState, type ReactNode } from "react";

interface InlineEditorProps {
  label?: string;
  value: string | number;
  onChange: (newValue: string) => void;
  prefix?: string | ReactNode;
  suffix?: string | ReactNode;
  inputType?: "text" | "number";
  className?: string;
  contentClasses?: string;
  defaultValue?: string;
}

const InlineEditor: React.FC<InlineEditorProps> = ({
  label = "Value",
  value,
  onChange,
  prefix = "",
  suffix = "",
  inputType = "text",
  className = "",
  contentClasses,
  defaultValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editValue, setEditValue] = useState(String(value));
  const [position, setPosition] = useState<"left" | "right">("right");

  const inputRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const spaceRight = window.innerWidth - triggerRect.right;
      setPosition(spaceRight < 200 ? "left" : "right");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <span
        ref={triggerRef}
        className={`${
          contentClasses
            ? contentClasses
            : "text-blue-600 border-b border-dashed border-blue-600"
        } cursor-pointer flex items-center`}
        onClick={() => {
          setEditValue(String(value));
          setIsOpen(true);
        }}
      >
        <>
          {defaultValue && !value ? (
            defaultValue
          ) : (
            <>
              {prefix}
              {value}
              {suffix}
            </>
          )}
        </>
      </span>

      {isOpen && (
        <div
          ref={inputRef}
          className={`absolute top-full mt-2 w-48 bg-white border shadow-lg rounded-md p-3 z-50 ${
            position === "left" ? "right-0" : "left-0"
          }`}
        >
          <label className="text-sm text-gray-700 mb-1 block">{label}</label>
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type={inputType}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full border px-2 py-1 rounded focus:outline-none focus:ring-1 ring-blue-400"
            />
            <button
              onClick={() => {
                onChange(editValue);
                setIsOpen(false);
              }}
              className="text-green-600 hover:text-green-800"
            >
              ✔
            </button>
            <button type="submit" className="text-red-600 hover:text-red-800">
              ✖
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default InlineEditor;
