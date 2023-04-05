## Web dev workshop

The monorepo for the Helpshift web dev workshop

## Getting Started with github codespaces

### Setting up a codespace

- Step 1 - Click on code
- Step 2 - Click on create codespace on main and wait for setup

<img width="1430" alt="Screenshot 2023-04-05 at 7 34 49 PM" src="https://user-images.githubusercontent.com/22174051/230105403-457f6947-e9cd-4944-85be-5a2108a2845d.png">

### Setup frontend on your codespace

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

- Step 1 - Setup and start the backend server by executing `make serve-backend` in a new terminal


https://user-images.githubusercontent.com/22174051/230135531-fb00f0d1-9ee9-4fa8-a076-5917f511dadb.mov


<br />

- Step 2 - Go to ports and choose port 5000

https://user-images.githubusercontent.com/22174051/230135885-cedf906e-cf83-4770-b7ef-7059e1006450.mov

<br />

- Step 3 - Change port visibility to **public** for port 5000 (right click on the visibility column to see options)


https://user-images.githubusercontent.com/22174051/230136280-e93fb4a2-25c2-4298-a3a0-46733b96c995.mov

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

