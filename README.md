# hms_itk

Patient
| Property     | Type | References | 
| ---------------- | :--: | :--: |
|Id | Int | Primary Key - NOT NULL - AUTOINCREMENT 
|Name | Varchar(70) | NOT NULL |
|Email|Varchar(50|NOT NULL |
|Password|Varchar(50)|NOT NULL|
|Status| BOOLEAN| 


Doctor
| Property     | Type | References | 
| ---------------- | :--: | :--: |
|Id | Int | Primary Key - NOT NULL - AUTOINCREMENT 
|Name | Varchar(70) | NOT NULL |
|Email|Varchar(50|NOT NULL |
|Password|Varchar(50)|NOT NULL|
|Department_id| Int | FOREING KEY - NOT NULL|
|Status| BOOLEAN| 

Department 
| Property     | Type | References | 
| ---------------- | :--: | :--: |
|Id | Int | Primary Key - NOT NULL - AUTOINCREMENT 
|Department | Varchar (70) | NOT NULL |


Appointment
| Property     | Type | References | 
| ---------------- | :--: | :--: |
|Id | Int | Primary Key - NOT NULL - AUTOINCREMENT 
|Patient_id | Int | Foreing Key - NOT NULL |
|Doctor_id | Int | Foreing Key - NOT NULL |
|Status| Varchar(25)| 'Complete', 'Pending', 'Canceled'|


Admin
| Property     | Type | References | 
| ---------------- | :--: | :--: |
|Id | Int | Primary Key - NOT NULL - AUTOINCREMENT 
|Name | Varchar(70) | NOT NULL |
|Email|Varchar(50|NOT NULL |
|Password|Varchar(50)|NOT NULL|
|Role| VarChar(25)| 'Auth', 'Admin'|
|Status| BOOLEAN| 
