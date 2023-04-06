serve-frontend:
	cd frontend/ && \
	npm install && USE_CODESPACE=yes npm run dev

serve-backend:
	cd backend/ && npm install && npm install nodemon -g && \
	echo "SERVER_PORT=5000\nDB_URI=./woofer.sqlite\n#This has been added for the workshop(educational purposes only)\nSESSION_SECRET_KEY=2197DA16EA3963932A162D8AEE193\nCODESPACE_ENV=true"> .env && \
	nodemon server