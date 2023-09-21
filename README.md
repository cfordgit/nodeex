# Node Express Appointment API Example

## Description

The Node Express Appointment API is a middleware layer that provides authentication and authorization for accessing appointment information from an external API. It validates user credentials, ensures that the request is well-formed, and checks if the user is authorized to access the appointment data.

## How to Use the Application

To use this application, you can follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/cfordgit/nodeex.git
   ```

2. Install the required dependencies:

    ```bash
    cd nodeex
    npm install
    ```

3. Start the Express server:

    ```bash
    node index.js
    ```
4. Make HTTP POST requests to the `/appointments` endpoint to retrieve appointment information. You need to provide valid user credentials (username and password) in the request body. Only users with the 'OWNER' role are authorized to access the data.

    I've included a Postman file for testing purposes (nodeex.postman_collection.json).

- __Example Request:__ 
    [http://localhost:8080](http://localhost:8080)
    ```http
    POST /appointments
    Content-Type: application/json
    ```
    ```json
    {
        "username": "crock",
        "password": "password"
    }
    ```
- __Example Response (On Success):__
    ```json
    {
        "user": 1,
        "date": "2001-09-11T09:11:00.000Z",
        "provider": "Dr. Will Smith",
        "type": "Jaw Replacement"
    }
    ```
- __Example Response (On Error):__
    ```json
    {
        "error": "Unauthorized",
        "message": "User is not authorized to access appointment information."
    }
    ```
## Expected Responses
- __400 Bad Request:__ When the request is missing the username or password in the request body.
    ```json
    {
        "error": "Invalid Request"
    }
    ```
- __401 Unauthorized:__ When the user credentials are invalid.
    ```json
    {
        "error": "Invalid Credentials"
    }
    ```
- __403 Forbidden:__ When the user is not authorized to access the appointment information.
    ```json
    {
        "error": "Unauthorized",
        "message": "User is not authorized to access appointment information."
    }
    ```
- __500 Internal Server Error:__ When there is an internal server error, such as a failure to fetch data from the external API.
    ```json
    {
        "error": "Internal Server Error",
        "message": "An error occurred while fetching appointment data."
    }
    ```
## Author
Curtis Ford  
e. ford.curtis@gmail.com