Steps to clone it 
    1 remove migartion folder in backend/infrastructure/Migration
    2 chnage connection string in backend/web/appsettings.json
    3 in backend go to tools->Nuget Package Manager -> package manager console
    4 write add-migartion "initial" then wrire update-database 
    5 go to sql server managemnent studio -> your database copy paste the insertRecords.txt file solve issue if there any because of id 
    6 run the backend 
    7 for front end open folder and in cmd/terminal write npm i 
    8 run front end using "npm run dev"
Done
