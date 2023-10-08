# Doctor K House





## Project requirements 
You must meet the following Phase 5 Project Minimum Requirements:

- Use a Flask/SQLAlchemy API backend with a React frontend.
- Have at least 4 models on the backend, that include the following:
    - At least 1 many-to-many relationship.
    - Full CRUD actions for at least one resource, following REST conventions.
    - User can interact with all models, directly or indirectly (no unused models).
- Have at least 3 different client-side routes using React Router. Be sure to include a nav bar or other UI element that allows users to navigate between routes.
- Implement password hashing and authentication.
- Validations implemented on frontend and backend
    - Use SQLAlchemy validations to verify and protect data on the backend.
    - Use forms and validation through Formik on all input.
        - At least one data type validation.
        - At least one string/number format validation.
- Connect the client and server using fetch().
- [optional/highly recommended] Implement something new not taught in the curriculum. (Check in with your instructor to ensure the scope of your idea is appropriate.)
- [optional/highly recommended] Implement useContext or Redux.
- [optional/highly recommended] Fully deploy and host your project.

## Creating project
Downloaded the python-p4-project-template and modified the name and deleted the metadata git github and canvas. I created a new repo on github and connected my local repo to my github. 

## Started my project
Downloaded the dependencies for my back end

    $pipenv install

and entered the pip enviroment with

    $pipenv shell
Ran 

    $python server/app

to test that my back end project was working

For the front end i downloaded the depencies

    $npm install --prefix client

Ran

    $npm start --prefix client

to start the project and see if it was running

To generate my my database i enetered my pip enviroment with pipenv shell
I enetered my server file by with a cd server command
Created my instance and migrations 

    $flask db init
    $ flask db upgrade head

## functionality

## application
When the page loads are two options.
option one is to log in to start the application with the correct user information. the user must input he correct username and password combination in order to enter the program. If the user inputs incorrect inforamtion they are greeted with a error message that they are unathorized. The user inputs are sent for authentication to the back end. If the inputs provided are correct then the user is allowed entry to the homepage. 

    function handleSubmitLogin(event) {
    event.preventDefault();
    const loginForm = Object.fromEntries(new FormData(event.target).entries());
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginForm),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => onLogin(data));
      } else {
        r.json().then((err) => setError(err));
      }
    });
    }
The other option is rigth bellow and it aloows the user to created a new account with there user name and own password. The email is validated by both the front end part of the project and the back end that it must have the format of an email. None of the fields can be left empty in oder for the inputs be valid and a user to be put into the database. 

      function handleSubmitSignup(event) {
    event.preventDefault();
    const signupform = Object.fromEntries(new FormData(event.target).entries());
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: signupform.name,
        username: signupform.username,
        password: signupform.password,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => onLogin(data));
      } else {
        r.json().then((err) => setError(err));
      }
    })}

once the user is allowed into the app there is a navigation bar that list all the options that will lead to all routes in the project.

### list of clients 
In this part of the app the user(aka the employee) is given a list of options. Each is a link to individual clients. I used 

    import { Link } from "react-router-dom/cjs/react-router-dom.min";

in order to use the link element. A useEffect and a fetch method where used to aquire the reuired information to give the user the informaton reuired to be able to follow the links. 

Depending on the link clicked the user is then routed to the ClientInfo component. When the page loads the employee can see a client profile with information about the client along with there doctor. This is possible because of useParams. 

    import { useParams } from "react-router-dom/cjs/react-router-dom.min";

I am able to ge the user id number from the route. Again i used a useEffect and fetch method combination. 

### Medication Schedule
When the user chooses the medication schedule link the are routed to the corresponding page. At the top there are to buttons.

*Add time slot*

If the user selects to add a time slot, a form is then shown. The form has three inputs that user need to  choose inputs for for the requet to go threw. The  time slot option has a range form 00:00 to 23:00. These option represent time slots. The next field list is the client. The options for this field are a list of names all that belong to a specific client. The final field is the medication poptions. Names of the different medications are all listed and the user must select one of these. There is some validations in the front end that prevent he user from leaving any of the fields empty. 

*Remove time slot*

When the user selects this button they are prompted to choose any of the selected times to delete in both my database and from the clients view. 

The rest of the page is a chart that shows all the medication schedules with all the clients time shedules and the medication required. There is a button under signed off section that will say not sigmned off if the time slot has not been fufilled. When clicked the button is filled with tyhe users name. When the user is logged in only that user name is used for the sign off. This enforces and protects all other user from using any name except there own for accountability. 

### Inventory
This link routes the user to the inventory page. This page has a table that lists all the medical equipmenmt in the building. There are two buttons under the number of storage column.

*decrease by 1*

When the user selects this option there a patch request sent to the backend that decreases the number by one and modifies the database. Also the effect is seen instanly for the user.

*restock*

This button sends a patch request to the backend that resets the number in stoclk to ten. This modifies the database and can also be seen on the frontend by the user instanly. 

### List of Doctors
This link routes the user to a page that displays doctor information. This is a contact information page. Each card hold the information of the doctor inclusing a list cl;ients that they attend to. This is done by using a fetch request to my backend. 

### List of Employees 
The list of employees route is very similar to the doctors one. It gives you a information for every employee displayed in cards. The only main diference from this part of the project from the rest is that its only allowed to be viewed by people with permisions. This can be seen when a user with no permisiions get an accessed denied message and people with the correct permisions can see the the employee information. This works because the user that logs is automatically saved into a session in the backend. The backend then determines what information is passed to the front end so that whoever wants to see the information must be the correct user. 

      return (
    <div className="cards">
      <h1>List of Employees</h1>
      {errors.errors != "Access denied" ? (
        employees.map((empl, index) => {
          return (
            <div key={index}>
              <EmployeeInfo employee={empl} />
            </div>
          );
        })
      ) : (
        <h1 style={{ backgroundColor: "red" }}>{errors.errors}</h1>
      )}
    </div>
  );
  
## Models.py
For my models I created classes that reresent each table i wanted to include for my project. 