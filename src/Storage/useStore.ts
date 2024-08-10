import { useUser } from "@clerk/clerk-react";
import { create } from "zustand";
import React from "react";

interface UserState {
  author: string;
  setAuthor: (author: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  author: '',
  setAuthor: (author) => set({ author }),
}));

const SetUser: React.FC = () => {
  const { user } = useUser();
  const setAuthor = useUserStore((state) => state.setAuthor);

  React.useEffect(() => {
    console.log('User object:', user); 
    if (user) {
      const authorName = user.fullName || user.emailAddresses?.[0]?.emailAddress || 'Anonymous';
      setAuthor(authorName);
      console.log('Author set to:', authorName);
    }
  }, [user, setAuthor]);

  return null;
};

export default SetUser;
