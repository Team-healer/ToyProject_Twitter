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
  console.log("start delete!");
  const response = await fetch(`${baseURL}/tweets/${tweetId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);
  const data = await response.json();
  if (response.status !== 204) {
    throw new Error(data.message);
  }
  console.log(data);
  return data;
};
