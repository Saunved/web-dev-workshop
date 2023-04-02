# Introduction

You have been hired as a web development intern by "Woofer", a software company trying to make a very "unique", "never-seen-before" social media website.

The senior engineers have implemented a lot of the code, but there are still some tasks left, and they have been assigned to you. Are you up for the challenge?

# Pre-requisites for this workshop

This workshop assumes that you have a foundational grasp of basic web technologies. You will have an easier time if you have:

1. Created a HTML page before
2. Used some CSS to style it
3. Tried writing some JavaScript to bring interactivity to it

For JavaScript, it's really useful if you understand how to declare functions, variables, and write conditional statements (if/else). Even if you have understood these concepts in some other programming language, that should be enough.

If you haven't done these things before, we highly recommend going through the following pages:

1. For HTML: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics
2. For CSS: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics
3. For Javascript: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics

Ideally you should go through these resources over and over again in the beginning, gaining a deeper understanding with each reading and searching online for doubts until you feel comfortable with the concepts.

# How the workshop works

The workshop is divided into checkpoints. Each checkpoint contains a few problems/tasks. You should spend ~20 minutes on each checkpoint. Once you solve the problem (or if you are stuck), you can simply move to the next checkpoint using the `level-up` script to see the solution.

## Using the level-up script

<!-- Work in progress [Nachiket, Sumeet] -->

## Using GitHub Codespaces

Although you can run the entire workshop code locally, we recommend using GitHub CodeSpaces to skip the painful process of having to set everything up. This is especially useful if you are completely new to web development. Follow these steps to start using GitHub Codespaces for the workshop:

<!-- Work in progress [Rishabh, Somya] -->

# Outcomes of this workshop

At the end of this workshop, we hope that you will understand the basics of:

1. How a software product is built from the ground up (user stories, app design, feature breakdown)
2. How frontend, backend, and databases interact with each other (with per-feature examples, contracts)
3. How version control works and why it is necessary
4. Backend basics (models, routes, controllers), frontend basics (components, styling, handling events, network calls), and HTTP requests (GET, POST, PUT, DELETE)

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
