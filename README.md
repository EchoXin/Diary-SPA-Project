# Diary-SPA-Project

## Project Idea

This app will provide a platform for user to write diary online. It’s convenient for people to write diary by typing instead of handwriting. The app can also keep user's privacy because users need to log in by password to see their own diaries.

##  User stories

#As a user, I want to sign-in, sign-up, sign-out.
#As a user, I want to create new diary.
#As a user, I want to edit old diary(update and delete).

...

optional:
#As a user, I want to upload photos in the diary.
#As a user, I want to retrieve the weather and location information.


## API Part
## Database

user table: username, password, diary
diary table: text, photo, (weather), (location)

user-diary: one to many

## Routing

user: /sign-in, /sign-up, /change-password,/sign-out
diary: ／diarys, /diarys/:id

## 3rd Party APIs (optional)

I will try to use the weather and location api.

## Wireframes

User Navbar; Diary Navbar; New Diary Form
![alt tag](http://i.imgur.com/Pvsvzhz.jpg)
![alt tag](http://i.imgur.com/i74332s.jpg)
