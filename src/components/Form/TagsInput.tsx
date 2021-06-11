import React, {
  MutableRefObject,
  Ref,
  useEffect,
  useRef,
  useState,
} from "react";

const StopKeys = [32, 13];

interface TagsInputInterfaceProps<T> {
  onChange: any;
  tags: T[];
}

const TagsInput = <T extends string>(props: TagsInputInterfaceProps<T>) => {
  const inputRef: any = useRef();
  const [currentTag, setCurrentTag] = useState<T>();
  const [tags, setTags] = useState<T[]>((props.tags as T[]) || []);

  const focusOnInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    props.onChange(tags);
  }, [tags.length]);

  return (
    <div
      onClick={focusOnInput}
      style={{
        backgroundColor: "#fff",
        display: "flex",
        padding: "3px",
        position: "relative",
        flexWrap: "wrap",
        border: "1px solid black",
      }}
    >
      {tags.map((tag, index) => (
        <li
          style={{
            display: "flex",
            backgroundColor: "#1775ee",
            height: "20px",
            margin: "2px 5px",
            padding: "5px",
            borderRadius: "5px",
            fontSize: "10px",
            alignItems: "center",
            color: "white",
          }}
          className="tag"
          key={`${tag}  ${index}`}
        >
          {tag}
          <button
            onClick={(e) => {
              setTags(tags.filter((tag, innerIndex) => innerIndex !== index));
            }}
            style={{
              height: "20px",
              backgroundColor: "inherit",
              border: "none",
            }}
          >
            ✖
          </button>
        </li>
      ))}
      <input
        type="text"
        name=""
        ref={inputRef}
        id=""
        style={{
          outline: "none",
          border: "0px solid black",
        }}
        value={currentTag}
        onKeyDown={(e) => {
          if (StopKeys.includes(e.keyCode)) {
            if (currentTag && currentTag.trim()) {
              setTags([...tags, currentTag.trim() as T]);
              setCurrentTag("" as T);
            }
          }
        }}
        onChange={(e) => setCurrentTag(e.target.value as T)}
      />
    </div>
  );
};

export default TagsInput;
