# hms_itk

Patient
| Property     | Type | References | 
| ---------------- | :--: | :--: |
|Id | Int | Primary Key - NOT NULL - AUTOINCREMENT 
|Name | Varchar(70) | NOT NULL |
|Birthday| Date | Not null|
|Email|Varchar(50|NOT NULL |
|Password|Varchar(50)|NOT NULL|
|Status| BOOLEAN| 

The entity Patient will storage every single patient data

Doctor
| Property     | Type | References | 
| ---------------- | :--: | :--: |
|Id | Int | Primary Key - NOT NULL - AUTOINCREMENT 
|Name | Varchar(70) | NOT NULL |
|Birthday| Date | Not null|
|Email|Varchar(50|NOT NULL |
|Password|Varchar(50)|NOT NULL|
|Department_id| Int | FOREING KEY - NOT NULL|
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
|Patient_id | Int | Foreing Key - NOT NULL |
|Doctor_id | Int | Foreing Key - NOT NULL |
|date| Datetime | not null |
|Status| Varchar(25)| 'Complete', 'Pending', 'Canceled'|

This entity will help to storage the appointments or medical specialization of the hospital, here will be reference the patien by him ID and Doctor too, also it will have a property call status to know if the appoint has been complete or still pending. 

Admin
| Property     | Type | References | 
| ---------------- | :--: | :--: |
|Id | Int | Primary Key - NOT NULL - AUTOINCREMENT 
|Name | Varchar(70) | NOT NULL |
|Email|Varchar(50|NOT NULL |
|Password|Varchar(50)|NOT NULL|
|Role| VarChar(25)| 'Auth', 'Admin'|
|Status| BOOLEAN| 

The admin entity storage the users which have roles and permission on the system, for this we create a property call Role to know if the user is an admin or an author.
