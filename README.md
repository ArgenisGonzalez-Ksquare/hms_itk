# hms_itk

PatientInfo
| Property     | Type | References | 
| ---------------- | :--: | :--: |
|Id | Int | Primary Key - NOT NULL - AUTOINCREMENT 
|FullName | Varchar(70) | NOT NULL |
|User_Id| INT| NOT NULL - FOREING KEY|
|Birthdate| Date | Not null|
|Status| BOOLEAN| 

The entity Patient will storage every single patient data

DoctorInfo
| Property     | Type | References | 
| ---------------- | :--: | :--: |
|Id | Int | Primary Key - NOT NULL - AUTOINCREMENT 
|FullName | Varchar(70) | NOT NULL |
|User_Id| INT| NOT NULL - FOREING KEY|
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
|PatientInfo_id | Int | Foreing Key - NOT NULL |
|DoctorInfo_id | Int | Foreing Key - NOT NULL |
|date| Datetime | not null |
|Status| Varchar(25)| 'Complete', 'Pending', 'Canceled'|

This entity will help to storage the appointments or medical specialization of the hospital, here will be reference the patien by him ID and Doctor too, also it will have a property call status to know if the appoint has been complete or still pending. 

User
| Property     | Type | References | 
| ---------------- | :--: | :--: |
|Id | Int | Primary Key - NOT NULL - AUTOINCREMENT 
|UserName | Varchar(70) | NOT NULL |
|Email|Varchar(50|NOT NULL |
|Password|Varchar(50)|NOT NULL|
|Role| VarChar(25)| 'Auth', 'Admin', 'Doctor', 'Patient'|
|Status| BOOLEAN| 

The user entity storage all the users and the roles and permission on the system, for this we create a property call Role to know if the user is an admin, an author, a patient or a doctor.
