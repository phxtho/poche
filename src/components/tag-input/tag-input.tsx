import { FC } from "react";
import { Tag } from "@/model/interfaces";

interface TagInputProps {}

const TagInput: FC<TagInputProps> = () => {
  const tags: Tag[] = [
    { id: "1", name: "hello" },
    { id: "2", name: "world" },
  ];
  return (
    <div className="flex space-x-1">
      <div className="flex space-x-1">
        {tags.map((tag) => (
          <span className="bg-black text-white px-2 rounded-xl">
            {tag.name}
          </span>
        ))}
      </div>

      <input type="text" />
    </div>
  );
};

export default TagInput;
