**Express API**

Setup Instructions:
 1.Clone the repo: 
    - git clone https://github.com/smitagaikwad25/Appliation-Management-Backend.git
    - cd Application-Management-Service

 2.Create a .env file in the root directory and add the following environment variables:
    -APP_HOST = http://localhost
    -APP_PORT = 3000
    -API_VERSION = v1
    -DATABASE = your DB name
    -USERNAME_DB = your db user name
    -PASSWORD = your db password
    -HOST = localhost
    -PORT = 3306
    -DIALECT = mysql
    -JWT_SECRET = your secret key
    -JWT_EXPIRES_IN = '1h'
  
 3.Install dependencies:
    - npm install

 4.Run the project:
    -npm run dev
    
 5.Swgger url :
  - http://localhost:3000/api/v1/api-docs
 6.mockUsers:
   - // Mock users with roles
const mockUsers = [
  { email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { email: 'hr@example.com', password: 'hr123', role: 'hr' },
  { email: 'reviewer@example.com', password: 'reviewer123', role: 'reviewer' }
];

