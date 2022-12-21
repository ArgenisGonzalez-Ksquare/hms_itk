# hms_itk

##Getting started

###Clone the repo
https://github.com/ArgenisGonzalez-Ksquare/hms_itk.git

###Install Node Dependencies
Is necessary to install some depedencies, please check the package.json and install everithing that is needed

###This Project is running on a postgres database, is necesary to you create the next .env file with the followings variables:

```
DB_PASS=root
DB_USER=admin_hospital
DB_NAME=hospital
PORT=5000
DB_HOSTNAME=localhost
HOST=localhost:5000
GOOGLE_APPLICATION_CREDENTIALS=C:\firebase\firebase.json.json
```

Please be sure of create the firebase.json file in the same location you saw in the .env
this is the structure of the json

Data Modeling of the Project

PatientInfo
| Property     | Type | References | 
| ---------------- | :--: | :--: |
|Id | Int | Primary Key - NOT NULL - AUTOINCREMENT 
|FullName | Varchar(70) | NOT NULL |
|User_Id| STRING| NOT NULL - FOREING KEY|
|Birthdate| Date | Not null|
|Status| BOOLEAN| 

The entity Patient will storage every single patient data

DoctorInfo
| Property     | Type | References | 
| ---------------- | :--: | :--: |
|Id | Int | Primary Key - NOT NULL - AUTOINCREMENT 
|FullName | Varchar(70) | NOT NULL |
|User_Id| STRING| NOT NULL - FOREING KEY|
|Birthdate| Date | Not null|
|DepartmentId| INT | Not Null|
|Status| BOOLEAN|


The entity Doctor will storage every single Doctor data

Department 
| Property     | Type | References | 
| ---------------- | :--: | :--: |
|Id | Int | Primary Key - NOT NULL - AUTOINCREMENT 
|Department | Varchar (70) | NOT NULL |

This entity will help to reference the department or medical specialization of the doctor

Appointment
| Property     | Type | References | 
| ---------------- | :--: | :--: |
|Id | Int | Primary Key - NOT NULL - AUTOINCREMENT 
|PatientInfo_id | STRING | Foreing Key - NOT NULL |
|DoctorInfo_id | STRING | Foreing Key - NOT NULL |
|date| Datetime | not null |
|Status| Varchar(25)| 'Complete', 'Pending', 'Canceled'|

This entity will help to storage the appointments or medical specialization of the hospital, here will be reference the patien by him ID and Doctor too, also it will have a property call status to know if the appoint has been complete or still pending. 

User
| Property     | Type | References | 
| ---------------- | :--: | :--: |
|Uid | Int | Primary Key - NOT NULL - AUTOINCREMENT 
|UserName | Varchar(70) | NOT NULL |
|Email|Varchar(50|NOT NULL |
|Password|Varchar(50)|NOT NULL|
|Role| VarChar(25)| 'Auth', 'Admin', 'Doctor', 'Patient'|
|Status| BOOLEAN| 

The user entity storage all the users and the roles and permission on the system, for this we create a property call Role to know if the user is an admin, an author, a patient or a doctor.
