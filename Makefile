serve-frontend:
	cd frontend/ && \
	npm install && npm run dev

serve-backend:
	cd backend/ && npm install && npm install nodemon -g && \
	echo "SERVER_PORT=5001\nDB_URI=./woofer.sqlite\n#This has been added for the workshop(educational purposes only)\nSESSION_SECRET_KEY=2197DA16EA3963932A162D8AEE193"> .env && \
	nodemon server
