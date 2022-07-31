import React from "react";
const baseURL = "http://localhost:8080";
export const GetTweet = async () => {
  const res = await fetch(`${baseURL}/tweets`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (res.status == !200) {
    throw new Error(data.message);
  }
  const data = await res.json();
  return data;
};
export const PostTweet = async (text, name) => {
  console.log(text, name);
  const response = await fetch(`${baseURL}/tweets/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      username: name,
      name,
      heart: [],
    }),
  });
  const data = await response.json();
  if (response.status !== 201) {
    throw new Error(data.message);
  }
  console.log(data);
  return data;
};

export const DeleteTweet = async (tweetId) => {
  const response = await fetch(`${baseURL}/tweets/${tweetId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (response.status !== 204) {
    const data = await response.json();
    throw new Error(data.message);
  }
};
export const UpdateTweet = async (tweetId, text) => {
  const response = await fetch(`${baseURL}/tweets/${tweetId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  const data = await response.json();
  console.log(data);
  if (response.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};
export const PushHeart = async (tweetId, username) => {
  const response = await fetch(
    `${baseURL}/tweets/heart/${tweetId}/${username}`
  );
};
