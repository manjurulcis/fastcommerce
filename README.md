# fastcommerce
A small ecommerce app based on python django and react. Includes docker based development and deployment.

# Project Architecture
In order to have clear sepration for backend and frontend development project is divided into relative name folder. Traditional way to setup development environment  instructions are explained below. Moreover there is docker based instructions as well for faster development set up. 
 - client (container react frontend application)
 - server (Backend APi based on Django Python)
 - nginx (proxy server configurations)
 - readme and docker compose


# Development

Setup environment for development

### Install dependencies

Clone the project then install python and react dependencies

```
git clone https://github.com/manjurulcis/fastcommerce.git
cd fastcommerce/server
pip install -r requirements.txt
cd ../client
yarn # or npm install

```

### Import Dummy Data

Run below command in the ´server´ directory to create database, apply migrations and add some dummy data to your project.

```
python add_dummy_data.py

```

### Run the server
To run the frontend server

`cd frontend && yarn run dev`

To run backend server

```
python manage.py runserver
python manage.py livereload # hot reload

```

### Test Frontend app
Open http://localhost:8000/ and Test the product view, search and add to cart functionality. To do you need to login and you can use this demo user 

```
Email: john@gmail.com
Password: password
```

or you can register yourself

### Test Admin panel

Admin user has been created in [users.json](dummy_data/users.json) <br />
You can access the admin pannel from http://localhost:8000/admin/ <br /> or you can login in frontend app http://localhost:8000/login
phone number: 09171234567 <br /> or <br /> 
Email: admin@gmail.com <br /> 
password: password

### Docker Based Development and Deployment

Deploy with docker using postgresql, gunicorn and nginx.

### Setup envrionment variables for backend application. Run below command in the root directory
```
cd server
cp .env.sample .env
cp .env.db.sample .env.db
```

### Build and up image using docker compose. Run below command in the root directory

```
docker-compose build
docker-compose up -d
```

### Collect static files and add dummy data

```
docker-compose exec web python manage.py collectstatic --no-input
docker-compose exec web python add_dummy_data.py
```

All should be setup correctly. You can browse the application here http://127.0.0.1



