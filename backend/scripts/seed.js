const axios = require("axios");
const faker = require("faker");

const BASE_URL = "http://localhost:5000";

/* ========= User Generation ========= */
const USERS_TO_GENERATE = 10;

const users = Array.from({ length: USERS_TO_GENERATE }, () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const handle = faker.internet.userName(firstName);
  const email = faker.internet.email(firstName);
  const password = "asdfasdfasdf"; // faker.internet.password(); <= Use this if you want random passwords in production
  const dateOfBirth = faker.date.between("1960-01-01", "2003-12-31").toISOString().split("T")[0];

  return {
    name: `${firstName} ${lastName}`,
    handle,
    email,
    password,
    dateOfBirth
  };
});

// Filter users with unique email and handle keys
// to ensure that email/handle is always unique per user
const uniqueUsers = users.filter((user, index, arr) => {
  return arr.findIndex((u) => u.handle === user.handle || u.email === user.email) === index;
});

const registerUsers = async () => {
  try {
    const userPromises = uniqueUsers.map((user) => {
      return axios.post(`${BASE_URL}/user`, user);
    });

    // Generate users in parallel
    return await Promise.all(userPromises);
  } catch (error) {
    console.log(error);
  }
};

/* ========= Tweet Generation ========= */
const createTweets = async (userRes) => {
  try {
    const tweetPromises = userRes.map(async (res) => {
      const user = res.data.data;
      const request = { body: faker.lorem.sentence(), ...user };
      return axios.post(`${BASE_URL}/tweet`, request);
    });

    // Generate tweets in parallel
    return await Promise.all(tweetPromises);
  } catch (error) {
    console.log(error);
  }
};

// TODO: Generate Multiple tweets, likes and followers

const seed = async () => {
  console.log("Generating users...");
  const users = await registerUsers();
  console.log("Generating tweets...");
  await createTweets(users);
  console.log("Done!");
};

seed();
