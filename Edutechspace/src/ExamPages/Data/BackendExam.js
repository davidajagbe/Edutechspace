export const backendExam = {
  title: "Backend Development Exam",
  instructions: "This exam evaluates your knowledge in backend development including Node.js, PHP, databases, APIs, and authentication. You have 20 minutes to complete 30 questions.",
  timeLimit: 1200, // 20 minutes
  passingScore: 18,
  onSuccessLink: "https://wa.me/2348012345678",
  questionData: [
    {
      question: "Which HTTP method is used to create a resource?",
      options: ["GET", "POST", "PUT", "DELETE"],
      answer: "POST"
    },
    {
      question: "What does REST stand for?",
      options: [
        "Representational State Transfer",
        "Remote Server Transfer",
        "Runtime Environment Syntax Tree",
        "Representational Syntax Tree"
      ],
      answer: "Representational State Transfer"
    },
    {
      question: "Which command initializes a Node.js project?",
      options: ["node init", "npm init", "node create", "npm start"],
      answer: "npm init"
    },
    {
      question: "What is middleware in Express?",
      options: [
        "A function that handles routing",
        "A function that handles request/response",
        "A server configuration",
        "A database connector"
      ],
      answer: "A function that handles request/response"
    },
    {
      question: "Which database is NoSQL?",
      options: ["MySQL", "MongoDB", "PostgreSQL", "SQLite"],
      answer: "MongoDB"
    },
    {
      question: "Which port is commonly used for HTTP?",
      options: ["80", "443", "3000", "22"],
      answer: "80"
    },
    {
      question: "How do you import modules in Node.js?",
      options: ["import", "require", "include", "load"],
      answer: "require"
    },
    {
      question: "What does CRUD stand for?",
      options: ["Create, Read, Update, Delete", "Code, Run, Upload, Download", "Connect, Retrieve, Use, Drop", "Create, Route, Upload, Deploy"],
      answer: "Create, Read, Update, Delete"
    },
    {
      question: "Which status code means 'Not Found'?",
      options: ["400", "404", "500", "200"],
      answer: "404"
    },
    {
      question: "Which library is used for password hashing in Node.js?",
      options: ["bcrypt", "crypto-js", "jsonwebtoken", "passport"],
      answer: "bcrypt"
    },
    {
      question: "What does JWT stand for?",
      options: ["Java Web Token", "JSON Web Token", "JavaScript Web Token", "JSON Web Transport"],
      answer: "JSON Web Token"
    },
    {
      question: "Which function ends a response in Express?",
      options: ["res.send()", "res.end()", "res.complete()", "res.done()"],
      answer: "res.send()"
    },
    {
      question: "What is used to interact with MongoDB in Node.js?",
      options: ["Mongoose", "Sequelize", "Firebase", "SQLite3"],
      answer: "Mongoose"
    },
    {
      question: "How do you define a route in Express?",
      options: ["app.route()", "app.path()", "app.get()", "app.url()"],
      answer: "app.get()"
    },
    {
      question: "What is the purpose of `.env` file?",
      options: ["To run JavaScript code", "To define routes", "To store environment variables", "To hash passwords"],
      answer: "To store environment variables"
    },
    {
      question: "Which command installs all dependencies in a Node.js project?",
      options: ["node install", "npm start", "npm install", "npm run"],
      answer: "npm install"
    },
    {
      question: "Which protocol is used by RESTful APIs?",
      options: ["HTTP", "FTP", "SMTP", "SSH"],
      answer: "HTTP"
    },
    {
      question: "How do you start an Express server?",
      options: ["app.run()", "app.listen()", "app.start()", "app.begin()"],
      answer: "app.listen()"
    },
    {
      question: "What is the default port for MongoDB?",
      options: ["3000", "3306", "5432", "27017"],
      answer: "27017"
    },
    {
      question: "What does async/await help with?",
      options: ["UI rendering", "Asynchronous operations", "Middleware functions", "Routing"],
      answer: "Asynchronous operations"
    },
    {
      question: "What is CORS used for?",
      options: ["Route management", "Database connection", "Security between domains", "Hashing"],
      answer: "Security between domains"
    },
    {
      question: "How is an error handled in Express?",
      options: ["Using try-catch block", "Using app.error()", "Using next(err)", "Using error()"],
      answer: "Using next(err)"
    },
    {
      question: "Which function is used to connect to MongoDB using Mongoose?",
      options: ["mongoose.connect()", "mongoose.use()", "mongoose.start()", "mongoose.db()"],
      answer: "mongoose.connect()"
    },
    {
      question: "What is the use of `body-parser` middleware?",
      options: ["Parsing HTML", "Parsing JSON and form data", "Encrypting headers", "Sending cookies"],
      answer: "Parsing JSON and form data"
    },
    {
      question: "Which tool is used to test APIs?",
      options: ["Node", "Git", "Postman", "Figma"],
      answer: "Postman"
    },
    {
      question: "Which HTTP status code means 'Internal Server Error'?",
      options: ["400", "401", "403", "500"],
      answer: "500"
    },
    {
      question: "Which method is used to update a document in MongoDB?",
      options: ["updateOne()", "edit()", "save()", "patch()"],
      answer: "updateOne()"
    },
    {
      question: "What is the role of controllers in MVC architecture?",
      options: ["Manage the database", "Render UI", "Handle user input and logic", "Define routes"],
      answer: "Handle user input and logic"
    },
    {
      question: "How do you export a module in Node.js?",
      options: ["export default", "module.exports", "require()", "createModule"],
      answer: "module.exports"
    },
    {
      question: "Which HTTP method is used to delete a resource?",
      options: ["GET", "PUT", "PATCH", "DELETE"],
      answer: "DELETE"
    }
  ]
};
