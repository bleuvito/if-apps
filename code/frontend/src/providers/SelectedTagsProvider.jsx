import { createContext, useContext, useState } from 'react';

const initialValue = {
  addSelectedTag: (tag) => {},
  removeSelectedTag: (tag) => {},
  isTagSelected: (tag) => {},
};

export const SelectedTagsContext = createContext(initialValue);

export function SelectedTagsProvider({ children }) {
  const [selectedTags, setSelectedTags] = useState([]);

  const addSelectedTag = (tag) => {
    setSelectedTags([...selectedTags, tag]);
  };

  const removeSelectedTag = (tag) => {
    const filteredTags = selectedTags.filter(
      (selectedTag) => selectedTag.id !== tag.id
    );
    setSelectedTags(filteredTags);
  };

  const isTagSelected = (tag) => {
    return selectedTags.some((selectedTag) => selectedTag.id === tag.id);
  };

  return (
    <SelectedTagsContext.Provider
      value={{ selectedTags, addSelectedTag, removeSelectedTag, isTagSelected }}
    >
      {children}
    </SelectedTagsContext.Provider>
  );
}
