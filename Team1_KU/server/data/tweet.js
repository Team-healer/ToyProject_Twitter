let tweets = [
  {
    id: '1',
    text: '드림코더분들 화이팅!',
    createdAt: Date.now().toString(),
    updatedAt : "string",
    name: 'Bob',
    username: 'bob',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
    like: 3,
    report:5

  },
  {
    id: '2',
    text: '안뇽!',
    createdAt: Date.now().toString(),
    updatedAt : "string",
    name: 'Ellie',
    username: 'ellie',
    like: 3,
    report:5
  },
];

export async function getAll() {
  return tweets;
}

export async function getAllByUsername(username) {
  return tweets.filter((tweet) => tweet.username === username);
}

export async function getById(id) {
  return tweets.find((tweet) => tweet.id === id);
}

export async function create(text, name, username) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    updatedAt : new Date(),
    name,
    username,
  };
  tweets = [tweet, ...tweets];
  return tweet;
}

export async function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
    tweet.updatedAt = new Date();
  }
  return tweet;
}

export async function updateLikeById(id) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.like = tweet.like+1 ;
    
  }
  return tweet;
}

export async function updateReportById(id) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.report = tweet.report+1 ;
    
  }
  return tweet;
}

export async function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}
