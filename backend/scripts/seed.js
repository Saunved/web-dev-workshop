const axios = require("axios");
const faker = require("faker");

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

// Uncomment the block below if you want to add a quick test user
// The script will crash if you run this twice

// uniqueUsers.push({
//   name: "Test",
//   handle: "test",
//   email: "test@gmail.com",
//   password: "asdfasdfasdf",
//   dateOfBirth: faker.date.between("1960-01-01", "2003-12-31").toISOString().split("T")[0]
// });

const BASE_URL = "http://localhost:9800";

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

/**
 * Creates one tweet for each user.
 * @TODO: Parallelize this if time permits
 */
const createTweets = async (userRes) => {
  userRes.forEach(async (res) => {
    const user = res.data.data;
    const request = { body: faker.lorem.sentence(), ...user };

    try {
      await axios.post(`${BASE_URL}/tweet`, request);
    } catch (error) {
      console.log(error);
    }
  });
};

const seed = async () => {
  console.log("Generating users...");
  const users = await registerUsers();
  console.log("Generating tweets...");
  await createTweets(users);
  console.log("Done!");
};

seed();
