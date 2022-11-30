
![status](https://github.com/ab-arias/poly-gains/actions/workflows/node.js.yml/badge.svg)
# PolyGains

PolyGains is a site for Cal Poly students to log their
workout plans, keep track of their progress, and interact
with the school's exercise community.   
To begin, you can create an account and customize your profile picture.   
Under the __Workouts__ page, you can create new workout plans in the form
of cards. Each card can be dragged-and-dropped into your seven
day workout calendar.   
Under the __Stats__ page, you can update your PRs, Goals, and 
personal stats like height, weight, and diet
plan.   
Under the __CalPoly__ page, students can find information
about the Rec Center as well as the current studio calendar.  
You can search for friends, send friend requests,
view their profile, and copy their workouts to your page to try
them out yourself. 

## Demo Video
embed demo video here
## UI Prototype
[Prototype](https://www.figma.com/file/uV7zHPrAZYFiMDmyv8s8Br/PolyGains?node-id=0%3A1
) Last Updated: October 21, 2022  

## Development Environment Setup
After pulling from the repository, run "npm install" in both
the /frontend and /backend folders to ensure you have all
the packages properly installed.  
Navigate to the project's MongoDB Atlas Cluster,
click connect, then MongoDB Drivers, and copy the provided
link.  
In the /backend folder, create a file entitled ".env"
and paste "MONGODB_URI=<your-link-here>" after placing
your username and password within the link.
## Style Checker
Our project uses [Prettier](https://prettier.io) as a style
checker. If you ran npm install in both the frontend and backend
folder, no further setup is required. Prior to pushing any code,
run "npm run style" in the frontend and backend folders to style
any changes you may have made. At any point, you can run "npm run test"
to see if your code adheres to our style requirements.
## Diagrams
#### UML Class Diagram
![UML](https://drive.google.com/uc?export=view&id=1Wwq01bdhlJxrROS7tGdfQIhjcgY3i7lb)  
Last Updated: November 29, 2022  
#### Register Sequence Diagram
![Sequence](https://drive.google.com/uc?export=view&id=1vqZS9DSPRKaK38CoanDKLhickobu6GOv)  
Last Updated: November 29, 2022
## Coverage Report
