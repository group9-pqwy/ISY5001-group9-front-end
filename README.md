# CarQuest(Front-end)

This system is a Car Search Recommendation Platform with a front-end powered by React.

## Key Features

1. **Search Functionality**
   Users can input search criteria on the React front-end and get 10 recommended results, which will be displayed as a list on the front-end.
2. **Home Page Recommendations**
   Based on the user’s previous searches, the homepage dynamically suggests car options. 
3. **Chatbot Feature**
   The chatbot accepts both text and voice inputs, converts them to text, and generate response for user.

## Installation & Setup

The following explains how to run this project in your local environment. If needed, you can try to change the port in the code and deploy it to the cloud by yourself.

1. Clone this repository:

   ```bash
   git clone https://github.com/group9-pqwy/ISY5001-group9-front-end.git
   ```

2. **Front-End Setup**:

   - Navigate to the 

     ```
     The root directory of the carquest project
     ```

     install dependencies:

     ```bash
     npm install
     ```

   - Start the front-end server:

     ```bash
     npm start
     ```

3.Fill in the google key to get car image(recommend you do it before second step):

In `src/components/CarList.js` , enter your own google image search API key.

``` javascript
      const apiKey = '';
      const cx = '';    // Custom Search Engine ID
```

## Project Structure

```
carquest/
├── .idea/                     # IDE configuration files
├── build/                     # Build directory, contains compiled files
├── node_modules/              # Project dependencies (third-party libraries)
├── public/                    # Static resources (not processed by webpack)
├── src/                       # Source code directory
│   ├── assets/                # Static assets (e.g., images, icons)
│   ├── components/            # Reusable React components
│   ├── pages/                 # Page components, each representing a full page
│   ├── styles/                # Styling files, containing CSS stylesheets
│   ├── utils/                 # Utility functions, containing general helper methods
│   ├── App.css                # Styles for the App component
│   ├── App.js                 # Main application component
│   ├── App.test.js            # Test file, contains unit tests for App component
│   ├── index.css              # Global stylesheet
│   ├── index.js               # Entry point for the application
│   ├── logo.svg               # Application logo file
│   └── reportWebVitals.js     # Performance reporting file
```

## Contributing

We welcome contributions! Please ensure code style consistency and functionality requirements are met before submitting a pull request.

