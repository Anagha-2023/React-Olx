import { createContext, useState } from "react";

export const PostContext = createContext(null);

function PostProvider({ children }) {
  const [postDetails, setPostDetails] = useState(null);

  return (
    <PostContext.Provider value={{ postDetails, setPostDetails }}>
      {children}
    </PostContext.Provider>
  );
}

export default PostProvider;
