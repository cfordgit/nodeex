const express = require('express');

const app = express();
app.use(express.json());

// Backend API Routes
const APPOINTMENTS_URL = 'https://www.myappointments.com/';

// Create User Data (i.e. Database)
const users = [
  {
    id: 1,
    username: 'crock',
    password: 'password',
    role: 'OWNER',
  },
  {
    id: 2,
    username: 'jpinkett',
    password: 'password',
    role: 'MEMBER',
  },
];

/* Middleware Chain */

// Validate Requset is Well-formed
app.use((req, res, next) => {
  if (!req.body || !req.body.username || !req.body.password) {
    return res.status(400).json({ error: 'Invalid Request' });
  }
  next();
});

// Validate User Credentials
app.use((req, res, next) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid Credentials' });
  }

  // Pass User Credentials in Request to Subsequent Calls
  req.user = user;
  next();
});

// Verify User is Authorized to Request Appointment Info
app.use((req, res, next) => {
  if (req.user.role !== 'OWNER') {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  next();
});


/* API Routes */

// Route to Call to External API Endpoint
app.post('/appointments', async (req, res) => {
    callBackendApi(APPOINTMENTS_URL + req.user.id).then(
        (apiResponse) => {
            res.json(apiResponse);
        }
    )
    .catch ((err) => {
        res.status(500).json({ error: 'Internal Server Error', message: err });
    });
});

async function callBackendApi(url) {
    return new Promise((resolve, reject) => {

      // Simulate Backend Call that Returns Appointment Info
      setTimeout(() => {
        resolve({ user: 1, date: '2001-09-11T09:11:00.000Z', provider: 'Dr. Will Smith', type: 'Jaw Replacement' });
      }, 2000);
      
    });
}

// Start the Express Server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
