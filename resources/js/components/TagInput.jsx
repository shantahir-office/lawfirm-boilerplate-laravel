import React, { useRef, useState } from "react";

const TagInput = ({ onChange }) => {
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef(null);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const addTag = (value) => {
        const newTag = value.trim();
        if (newTag !== "") {
            const newTags = [...tags, newTag];
            setTags(newTags);
            onChange(newTags.join(","));
            setInputValue("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") { 
            e.preventDefault();
            addTag(inputValue);
        }
    };

    const handleInput = (e) => {
        const value = e.target.value;
        if (/\s/.test(value)) {
            addTag(value);
        } else {
            setInputValue(value);
        }
    };

    const handleBlur = () => {
        if (inputValue.trim() !== "") {
            addTag(inputValue);
        }
    };

    const removeTag = (index) => {
        const newTags = tags.filter((_, i) => i !== index);
        setTags(newTags);
        onChange(newTags.join(","));
    };
    return (
        <div className="w-100">
            <input
                type="text"
                ref={inputRef}
                className="form-control p-3 rounded-4"
                placeholder="Enter Colors"
                value={inputValue}
                onInput={handleInput}
                onChange={handleInputChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                style={{ minHeight: "50px" }} // Better touch target size
            />
            <div className="mt-3 d-flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="badge bg-primary text-white rounded-3 d-flex align-items-center p-2"
                        style={{ cursor: "pointer", fontSize: "14px", gap: "6px" }}
                        onClick={() => removeTag(index)}
                    >
                        {tag}
                        <span
                            className="ms-2"
                            style={{ fontSize: "18px", cursor: "pointer", padding: "0 6px" }}
                        >
                            ×
                        </span>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TagInput;
