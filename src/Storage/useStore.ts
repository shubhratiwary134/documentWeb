
import { create } from "zustand";
import { useUser } from "@clerk/clerk-react";
import React from "react";

// Zustand store setup
interface UserState {
  author: string;
  setAuthor: (author: string) => void;
}

export const useUserStore = create<UserState>((set) => {
  // Initialize author from localStorage or default to an empty string
  const initialAuthor = localStorage.getItem('author') || '';

  return {
    author: initialAuthor,
    setAuthor: (author) => {
      // Set author in localStorage and Zustand state
      localStorage.setItem('author', author);
      set({ author });
    },
  };
});

// SetUser component
const SetUser: React.FC = () => {
  const { user } = useUser();
  const setAuthor = useUserStore((state) => state.setAuthor);

  React.useEffect(() => {
    if (user) {
      const authorName = user.fullName || user.emailAddresses?.[0]?.emailAddress || 'Anonymous';
      setAuthor(authorName);
      console.log('Author set to:', authorName);
    }
  }, [user, setAuthor]);

  return null;
};

export default SetUser;
