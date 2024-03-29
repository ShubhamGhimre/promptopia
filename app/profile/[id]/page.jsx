"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ( {params} ) => {

    const searchParams = useSearchParams();
    const userName = searchParams.get("name");
    const [userPosts, setUserPosts] = useState([]);
    console.log(params.id);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params?.id}/posts`);
            const data = await response.json();
            setUserPosts(data);
        }
        if(params?.id)
            fetchPosts();
    },[params.id]);
   

    
  return (
    <Profile
        name={userName}
        des= {`Welcome to ${userName}'s Profile Page. Explore ${userName} posts and more!`}
        data={userPosts}
    />
  )
}

export default UserProfile;
