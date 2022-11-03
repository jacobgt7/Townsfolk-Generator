# Introduction

Townsfolk Generator is an application that allows users to create fictional villages and quickly populate
them with characters using random generation tools.



# Purpose and Motivation

This application was made to help game designers and dungeon masters more easily create population
centers within their created worlds.



# How it works

## Log in

Once a user has registered, they will log in using only their email.


## Create a village

Once a user has logged in, they will be taken to the My Villages view.  This is where all of the user's 
created villages will be displayed with an icon and the village name underneath.

To create a new village, click on the New Village button. Enter the desired name and click the Create Village button.  The user should see their new village appear.


## Populate village

When the user clicks on a village, they will be taken to the village details view. On this view the village 
name can be edited, village can be deleted (icluding all associated characters) and new characters can be 
created and viewed. 

To create a new character, click the New Character button.  This will expand the new character form.  All inputs must have values before pressing the Create button. Name and profession can be generated randomly by pressing the random button underneath each input.

As an alternative faster way to populate, instead of filling out the input fields the user can simply press
the Generate Random button at the bottom of the form.  

Once a character has been created, it will appear with a random avatar and name underneath the village image.
Clicking on a created charcter will populate the box on the right side of the screen with that character's basic info.


## Add additional details

To add additional details to a character, each character has a "Background" property which is empty by
default.  

To change this property, click on a character.  Once the basic info is displayed, click the
Details button at the bottom of the box.  This takes the user to the character details view.

The character details view shows all basic info plus the character background.  To make changes, click the
edit button at the bottom of the page.  This will transform all character details into input fields.  When 
finished, click the save button.


## Delete unwanted villages/characters

When a user wants to delete a specific character, they must first navigate to that character's details view, as
mentioned above.  From there, click the edit button, and then the delete button.

To delete a village and all of its characters, simply click the Delete Village button on the village details view underneath the village name.  Click yes to confirm. 

These delete actions cannot be undone.



# How Townsfolk Generator was developed

Townsfolk Generator was created by me (Jacob Thomas) as a school project. 

It was developed using JavaScript with React and React-router-dom.  I gained experience using various hooks, 
including useState, useEffect, useNavigate and useParams.  I also gained experience creating and routing components. The components Login.js, Register.js and Authorized.js were mostly borrowed code from Nashville Software School.

The database for this project is a json file which is in a separate repository.

The styling was all done with vanilla CSS.  

This application uses two remote APIs.  One is for generating random avatars for characters.  The other provides
a randomly generated user, from which the application extracts the first and last name to assign random names to 
characters.

One noteable challenge was when creating the random character feature. When attempting to use pre-existing
functions, which would have been the cleanest solution, there was an asynchronous issue with set state which caused 
properties of the character object to be overwritten before it was posted. This problem left me with two choices: 
to manage  state for each property of the new character object separately, or to write a new function which would 
construct a whole object from scratch and then post it.  I decided on the second option, creating a brand new 
component to contain the button and its associated function, which was relatively large.  I made this choice because 
I felt it was more concise with the rest of the program (managing object as state instead of individual properties) 
and by moving the new feature into a new component maintained the best readability. 



# How to install and run

Clone the repository to the desired location on your machine.  Using the terminal, navigate to the new 
Townsfolk-Generator directory, install NPM and then serve using the commands: 

```    
npm install
npm start 
```

This will serve the application at http://localhost:3000/

Secondly you will need to serve the API.  The repository is named [Townsfolk-Generator-api](https://github.com/jacobgt7/Townsfolk-Generator-api).  Clone it to your machine and then serve using: 

    json-server database.json -p 8088

Now navigate to http://localhost:3000/ in your browser and enjoy!



# Public links

API used for character avatars:  https://avatars.dicebear.com/docs/http-api

API used for random names:  https://randomuser.me/documentation
