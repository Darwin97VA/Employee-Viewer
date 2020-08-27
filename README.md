# Project: Employee Viewer

You can see the running project in: [Employee Viewer](https://darwin97va.github.io/Employee-Viewer/public/)

## How to run

1 Install [Node JS aquí](https://nodejs.org/es/download/)

  If you have another static file server, you can put 
  the contents of the "/ public" folder there and 
  display it at the server's URL.


2 For execute run in the command-line:

  ```
  npm start
  ```

3 Now, let's start calling the next url in your favorite browser!
  [http://localhost:3000](http://localhost:3000)



## Project Structure

```
├── package.json
├── package-lock.json
├── public
│   ├── css
│   │   ├── buttons.css
│   │   ├── style.css
│   │   └── table.css
│   ├── data.json
│   ├── index.html
│   └── js
│       ├── btnEvents.js
│       ├── load.js
│       ├── manipulateDOM.js
│       ├── store.js
│       └── utils.js
├── readme.markdown
└── server.js
```


## About

By request the core of the project runs in the browser.
The project itself is inside the "/ public" folder.

```
├── public
│   ├── css
│   │   ├── buttons.css
│   │   ├── style.css
│   │   └── table.css
│   ├── data.json
│   ├── index.html
│   └── js
│       ├── btnEvents.js
│       ├── load.js
│       ├── manipulateDOM.js
│       ├── store.js
│       └── utils.js
```

So it could be moved to any web server from
static files like apache.

Once the excel JSON was generated, it was decided to use it by doing
a request to the static file server. ** http: //__domain__/data.json**


## How does it work

- Load: 
  (/index.js)
  Starting the application and inserting employee data.

- Store: 
  (/store.js)
  State of employees and filters.

- Manipulation of DOM: 
  (/manipulateDOM.js)
  Editing the row of each employee, selected filters, etc.

- Downloaders: 
  (/btnEvents.js)
  Generate the file (excel, csv, pdf) and download it.


## Thanks!
> De parvis grandis acervus erit
