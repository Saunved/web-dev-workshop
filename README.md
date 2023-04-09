## Web dev workshop

The monorepo for the Helpshift web dev workshop

## Getting Started with github codespaces

### Setting up a codespace
> **Note**
> This step is to be performed only once

- Step 1 - Click on code
- Step 2 - Click on create codespace on main and wait for setup

<img width="1430" alt="Screenshot 2023-04-05 at 7 34 49 PM" src="https://user-images.githubusercontent.com/22174051/230105403-457f6947-e9cd-4944-85be-5a2108a2845d.png">

### Setup frontend on your codespace

> **Note**
> You would need to perform this setup again whenever you restart your codespace

- Step 1 - Setup and start frontend by executing `make serve-frontend` on the terminal
<img width="1658" alt="Screenshot 2023-04-05 at 7 37 38 PM" src="https://user-images.githubusercontent.com/22174051/230106220-158857b8-cbc9-4326-a089-0bc5049e19ee.png">

- Step 2 - Go to ports and choose port 4400


https://user-images.githubusercontent.com/22174051/230129169-e7765a02-2ecb-40cf-9418-99375d9f5403.mov


<br/>

- Step 3 - Change port visibility to **public** for port 4400 (right click on the visibility column to see options)

https://user-images.githubusercontent.com/22174051/230129682-adf010c5-a1f5-44dc-b1af-2ecb2a49aaa7.mov

<br/>

- Step 4 - Copy the frontend local address and paste in a new tab in browser

https://user-images.githubusercontent.com/22174051/230132148-1385d724-269f-4728-931d-2fa879a711d2.mov

<br/>


### Setup backend on your codespace

> **Note**
> You would need to perform this setup again whenever you restart your codespace

- Step 1 - Setup and start the backend server by executing `make serve-backend` in a new terminal


https://user-images.githubusercontent.com/22174051/230135531-fb00f0d1-9ee9-4fa8-a076-5917f511dadb.mov


<br />

- Step 2 - Go to ports and choose port 5000

https://user-images.githubusercontent.com/22174051/230135885-cedf906e-cf83-4770-b7ef-7059e1006450.mov

<br />

- Step 3 - Change port visibility to **public** for port 5000 (right click on the visibility column to see options)


https://user-images.githubusercontent.com/22174051/230136280-e93fb4a2-25c2-4298-a3a0-46733b96c995.mov

<br />

### Setup dummy data
> **Note**
> Ensure that your backend server is running.

- Step 1 - open a new terminal in your codespace
- Step 2 - run `node backend/scripts/seed.js`

<br />


### Verify if setup is completed successfully

Step 1 - Copy the frontend local address and paste in a new tab in browser

https://user-images.githubusercontent.com/22174051/230132148-1385d724-269f-4728-931d-2fa879a711d2.mov

<br />

Step 2 - Click on registration and create a new user



https://user-images.githubusercontent.com/22174051/230142040-0a41213e-f757-472a-bb0c-b60d74eb2644.mov


<br />

And voila, you're setup is complete !!!


## Levels
You can start by running
```
./start
```

The project has different levels (chapters) each focusing on a particular area. You can switch to different levels by,
```
./level_up
```

You can start over again by running
```
./restart
```

# Checkpoints

## Checkpoint 1: "Forming" the basics

The frontend is created using Next.js. You can think of Next.js like React.js with some bells and whistles. With Next.js we can easily define routes, fetch data from the server using special functions, and make our deployments easier using "Vercel".

You might feel a bit scared looking at all these folders and files, but it'll make sense in a few minutes.

The only folders you should be concerned with are:

1. `src` stands for "source". This is where all the source code exists
2. `src/pages` - These are all the routes that your users will be able to navigate to
3. `src/components` - This is where we store reusable or logically separate chunks of our code so we can import and use them in our `pages`

For this checkpoint, we'll be looking at the following file: `pages/auth/register.jsx`.

### Task 1: The "handle" problem

We have a form that accepts a display name, and an email. However, we still need to add a "password" input and a "handle", with which the end-user can be easily identified.
Take a look at the "name" and "email" fields, and try to implement "password" and "handle" inputs. If you're feeling stuck, don't be afraid to use use online resources (cough, Chat, cough, GPT). But we highly recommend trying it out by yourself first to build an understanding of how forms are created.

Some helpful notes for you:

1. `onChange` attribute in the `<input />` tag informs you whenever the input value changes. Use that to set your variable.
2. The password text should not be visible! Try searching for "HTML input types"

Key learning:
How data flows from a user's keyboard into the actual application

### Task 2: Styling the register button

The registration button looks a bit weird, don't you think? Let's use Tailwind classes to spruce it up!
Tailwind is insanely easy to understand because each class (usually) applies just one style.

Check out some examples of Tailwind buttons online and try some stuff out yourself:
https://flowbite.com/docs/components/buttons/

We also want to make the button look faded when it is disabled. How can we do that?

Key learning:
How atomic CSS can be used to compose complex UIs in a very simple way

### Task 3: Branding!

Our product needs some branding. Can you figure out a nice way of adding a "Dog" icon to the top of our form?

Key learning:
How external resources can be added to a React application.

## Checkpoint 2: RESTing with APIs!

APIs are the backbone of web development. Whenever we want to do anything persistent (long-lasting), such as storing a user's information in a database, we have to make an API call to our application server.

### Task 1: Handling the button click

When users click on the "Register" button, we should be able to detect it.
Can you hook up the `<form>` tag to fire the `onFormSubmit` function?

### Task 2: Making your first API call

We will use the "fetch" function to submit our form to the backend. Although we haven't yet implemented the registration endpoint, we will be sending `name`, `email`, `handle`, and `password` in the body of our POST request.

Check out an example of `fetch` here: https://developer.mozilla.org/en-US/docs/Web/API/fetch#examples

Key learning:
How data flows from the client (browser) to the server

## Checkpoint 3: Storing user details in the database

Our backend is written using Node.js. Again, the folder structure might seem a bit daunting at first, but here's what you need to know:

1. All the entities in our system, and their relationships are defined in the `models` folder
2. All the "endpoints" with which we can interact with the database are present in the `routes` folder
3. Whenever a request hits a "route", a controller (a function that can process requests) will be called. Controllers can interact with the database and return a response, which will be made available to the frontend. Controllers are present in a folder called `controllers`

We will learn more about database modelling in a future checkpoint. For now, this is created for you, and you have to focus on adding a route and a controller for this route.

### Task 1: Create a route for registering our user

We are firing a network request on `POST /user` from the frontend, so we should define the relevant route on the backend in `routes/users.js`.

Key learning:
API calls on the frontend are mapped to `routes` on the backend

### Task 2: Store the user in the database

We are using an ORM (a library that helps us interact easily with the underlying database) called Sequelize to store and retrieve data from the database. Can you write a query to create a new user using the request data?

Note how we have hashed the user's password since it's not a good practice to store plain-text passwords.

Key learning:
How data is stored in a database so it can last there long-term!

### Task 3: Return success or error to the frontend

Once we store the data successfully, we want to return a response. If the database entry was successful, return a successful response, else we return an error.
Look around in the codebase to see how we can do this!

Key learning:
Each route can either be successful or unsuccessful. We must account for both cases when creating a controller.

## Checkpoint 4: Let's write a tweet

For this checkpoint, we'll be looking at the following file: `/src/components/Tweet/ComposeTweet.jsx`.́

After going through the above 3 checkpoints, now you have a basic understanding of how to create a form, apply styling to it, and how fire API, write a query to get and store the data inside the database

Now we going to learn how users would write a tweet on the UI?, excited 😄?

### Task 1: Writing a Tweet


We want users to write a tweet and submit the tweet on the UI. so how could we achieve that?

- What do you think what kinds of HTML input elements should we use here for both?

You have might have noticed this on Twitter when you write a tweet your text area content increases as per your content length. Now, according to what we had plan to implement will not work here, right?

- So can you find the react library which will auto-resize our textarea?

- We want the user to submit their tweet so can you construct a button for the same?

- We also want to indicate the character count while the user writes their tweet along with the character limit we have set.

### Task 2: UI handling


Should the tweet submit button be visible when there is no tweet content present? Is that good user experience (UX)?

- Could you think? How could we disable the button when tweet content is empty?

Twitter has this constraint where it restricts the number of characters in a tweet.

- So can you think of how could we restrict the end-user when it reaches the limit

It would be good UX if you indicate something on the UI so that they know that tweet content length is about to reach the limit

- So can you make the character limit indicator red when a user reaches the limit? It is the good cherry on top of the cake functionality


### Task 3: Calling the API

We have constructed the basic UI to compose the tweet. Now we want to send the tweet content to our server, which will then stored it inside a database

So what is the first step to achieving the above result? Fire a request to some endpoint right?

- Which HTTP request method do you think is most appropriate to use here?

What should be the behavior if the request succeeded and what if get failed? any thoughts?

How are we going to store the tweet content in the database, we can be going to learn in the next checkpoint


## Checkpoint 5: Storing tweet to database

### Task 1: Create a route which accepts tweet's metadata

Frontend will trigger a POST request, so we should define the relevant route which is parsed through the middlewares on the backend in routes/tweet.js.

### Task 2: Make changes in controller for storing the tweet

We have added a route, now it's time to make changes in controller tweet.js. Controller accepts the request and stores data and generates a response for Frontend.

## Checkpoint 6: Middlewares
### Task 1: There is a bug in 'getUserByHandle', find and try to fix it.

### Task 2: Using error handler for all the app routes
Using errorHandler middleware for formatting all responses.

### Task 3: Replace code and use response middleware
Response middlewares generally helps to maintain the shape of response, it can make sure that the JSON is in same format each time. Fix the code in createUser endpoint and use middleware.