# Authentication Web Application

A basic scalable web application that implements authentication, enables the users to sign in, sign up and sign out smoothly.
Developed using node.js and Express.js this authentication web application uses the library passport for local authentication and social authentication.
# Key Features & Workflow :
## 1) Sign Up : 
  - On being directed to users/sign-up, a sign up form appears where in the user can enter their basic profile information such as their names, email and choose a password for their account.
  - By clicking on the submit button,a post request is then sent to the server and then in the backend the server verifies if the fields password and confirm password match, if they do , the server checks if the user exists already in the database, if an existing user is found with that email address the server redirects the user to the sign in page and notifies the user about the same. 
  - If there is no user with that email, a new user is being created and their credentials are stored in the database.
  - The user's password is stored as a hash for security purpose. 
  - A welcome mail is sent to the user's registered mail address on successfully signing up.

## 2) Sign In : 
   - On being directed to users/sign-in, the sign in form appears , on submitting the credentials a post request is sent to the server to create a session cookie for the signed in user, the server first verifies the authenticity of the user by comparing the credentials sent in the request's body with the ones stored in the database, if they do not match the user is notified about the invalid credentials. 
   - This local authentication is processed by passport's local strategy. 

## 3)Social Authentication : Google Oauth2 Strategy :
  -  On being directed to either of  /users/sign-in or /users/sign-up, a button is placed in the form which lets the users to Sign In / Sign Up using their Google accounts, once the credentials of the users are verified by the servers at google.com, the server checks if an account already exists with that gmail address , if it does , the user is allowed to sign in smoothly, if there is no user with the email sent in request by the user, a new user is being created at our servers with that email address and a random password is generated and stored as a hash in the database. 
  -  This google authentication is implemented using passport google oauth2 strategy.
     
## 4)Update Password For Signed In Users:
   - After signing in, in the home page's header upon clicking on the Update Password, UserName link, the user is directed to a form where in the user can enter their existing password, a new password and then confirm by entering the new password again.
  - Firstly the server verifies the contents of the new password and old password fields, if they match the server proceeds further else the user is notified about the mismatch.
  - After verification, the server compares the old password from the request's body with the existing password of the user stored in the database, if they match the user's password is updated as the request's body's new password and saved. The user is notified about updation of password. 
  - In case, someone else impersonating themselves as the user by gaining access to the user's existing password has updated the password, a precaution and secirity mail is sent on the user's registered email notifying them about the updation of password, if the user themselves have updated password they can safely ignore the mail else as a safety measure the user can click on Secure Your account and reset their passwords. 
      
## 5) Reset Password :
   - If the user forgets his or her password, upon clicking on the Forgot Password Link at users/sign-in, the user is directed to reset-password/email where in a form is rendered where the user can enter their email, a post request is then sent to the server with the email ,the server verifies if any user with the requested email exists in the database or not, if it does an email with the link to reset the password is sent to the registered email else the user is notified about the invalid email. 
   - The user can click on the link and reset their passwords.
   - An email is sent to the user when the password is updated successfully.
      
## How is Forgot Password implemented ?
   - In the database schemas, a schema for the reset password tokens is defined which contains three fields namely user to store a reference to the user, access token which is  of type String and isValid boolean to check the validity of the token. 
   - On finding out the user by the email address, a reference to the user is stored and passed on while creating a new object for the reset password token, the access token is a random string generated using the crypto library, the isValid boolean is marked as true initially, then the generated reset password token and the user is sent to the mailer which  mails the user with the access token , the url is of the form reset-password/access-token/?access-token="access-token-value".
   - On getting directed to the URL from the mail, first the validity of the token is verified and then the reset password form is rendered, on submitting the new password a post request is sent to the server , the user is matched using the access token, finally on checking if password and confirm password field's value match , the password is updated and saved in the database and the isValid boolean of the token is marked as false and saved.

NOTE : The library bcrypt is used for storing the hashed passwords in the database, whenever the password is recently modified or a new user has been created it automatically completes its job of storing the hashed passwords in the database .

# To run the project :

  1) Open terminal. 
 
  2) Change the current working directory to the location where you want the cloned directory.
  
  ```
  $ git clone https://github.com/saumyasingh20/authenticationApp/
  ```
  
  3) Install all the dependencies by running :
  
  ```
  npm install
  ```
  
  4) Run npm start to run the project at local host, port 8004:
  
   ```
  npm start
  ```
  
  5) In your browser, enter the URL :
  
  ```
  localhost:8004/
  ```

