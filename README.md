Steps to clone it 
    1 remove the migrations folder in the backend/infrastructure/Migration
    2 change the connection string in backend/web/appsettings.json
    3 in the backend go to tools->Nuget Package Manager -> package manager console
    4 write add-migration "initial" then write update-database 
    5 go to SQL server management studio -> your database copy and paste the insertRecords.txt file solve the issue if there are any because of the id 
    6 run the backend 
    7 For the front end open the folder and in cmd/terminal write npm i 
    8 run front end using "npm run dev"
Done
