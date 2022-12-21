# hms_itk

Getting started

Clone the repo
https://github.com/ArgenisGonzalez-Ksquare/hms_itk.git

Install Node Dependencies
Is necessary to install some depedencies, please check the package.json and install everithing that is needed

This Project is running on a postgres database, is necesary to you create the next .env file with the followings variables:
DB_PASS=root
DB_USER=admin_hospital
DB_NAME=hospital
PORT=5000
DB_HOSTNAME=localhost
HOST=localhost:5000
GOOGLE_APPLICATION_CREDENTIALS=C:\firebase\firebase.json.json

Please be sure of create the firebase.json file in the same location you saw in the .env
this is the structure of the json

{
  "type": "service_account",
  "project_id": "test-fe936",
  "private_key_id": "834640f8d2dac7ab5bb03b7f90919bcc226ee365",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC4jR1Hb7Jq8qh0\nzIHzAoKJCIhtuR1JGXJAWC9b1P+Tfs4CoK5jUxuIQxEOiqtiLB9ggqHfS/mqa3sM\nMc0Q9wayJgOWhLMIjiRKSJQKYQV0UzpiTu9wHgJxM24mTd5eNLd8nX0dOnU6COKT\nbGbBsUmVvJS/VSLC2LuPtrCOL0pNMHy0kzacpIM917mdAv44jL4uDikRKmA7oFUe\nzEU5OSqE1LLdefQaSHaveF9au6mAsXSUNFCAjs4RVVdn27R6mCEVdpIskbqLjWJb\np1KbwSn7+EU59UK/9s5kzopUHLoDXXFgeatYSlfqG9krc89mbkDi17Ewb05BjBA5\n7y6LkLDvAgMBAAECggEAFLTXO1En0m0TLouq7Dz0sB2yJPwh8jY120ypqk2N4XAs\nUB9+1tZtHo7xJnxeOf/GWM8/YezwgHOvv3taTVQnaayZ4XUBG212BT77G+ZX333e\nbUelq3g1K5tVeVxqSI/0ow7j301+9/nQO4dBnkDfMeWR8PJt7zEJwQMCmz6+FkaG\nJ8zdiS0R1WPDi78jZVqL8p5QSIn7pzofEY/YWD5K5S+4Mfo+Zj9VHYYmqoZiMr+w\nMzi3SDOeH02VfuSgxyaXLhxkVq+TRIg9zxcnEikZtbGZgnOKFJeBrArQEI++v3ua\n7eqow4dV+jF0LC/P0gMedbVB9hPaCiDhITKsY2zVmQKBgQDcNywTTJBAIvyRndPb\nvIQ4KcEvwGH/apq9p0Yleo/DCgC26+hzbSF9/R9P8x19yTldRSBYmQRTWgoQIBHw\nUijAuByxJHt88U21VbXCq94FJDs5Ff5RoRv9lnQnP0+wq8IALhNw2csCFltH1ag3\n5sNEqPLsQH7c2kijKV4ybf+NlwKBgQDWilSBjLGu7ZxVvkbhG69aGobW+E8HpHAE\nNHeyS48M3+o/IqjYM5CKekNsACPtgmdLbJemYeJUUWC1TtntD8R4UmkwEIhRtdDn\n9YqS9frPnIBu8AxMu0CDMjJwYQ7cWneV+mP/9rQ/eZb5bsUNWPqhle/ONyLwHmp8\nNlprx+0SaQKBgDCHD/Vox9j6XMISD5+6mUBvIx1Mvcu1SEhG1lRn/8oxKBsnPWBC\nSkEjSIUrw/H2J+f/1bLwdV2Q1+rZxlo5ILXnXJtEuNm9qywsqRMvIIvtggeAazy9\nzhdB0nLbpsn975BuluYleHELUC4yTRGUjq9Qs8eQJuSwTZV3BkUCrHAdAoGBAJeb\n77YRH+uXXJg3O82Oi+9nuYwms2qaKNK/5SppPPEDN31gV+NZJTbGyeiDfOA1/BsP\n5Wcd2xxs2aOm0lg1gUjqLA1cUYk0rCmPmlraW2DlntlG59o9pYxRJ9XEsQTFJacl\n6A8VXzFQEoG4ZqZVD+CqnWmkCxuW0vduTZ3HDeCpAoGBALncxY9oRiYmfAno/a85\nGdrRfk/k2rdXF8TrPDU6tSiiF3nRcL9sZvT8Me3R7puc9uYVN75yn6ypG9Rk2nnm\nCQG1nsBP6wZ13f32plPQW3WLDQMjRoog2rF5ElBglSyVgUuW1nroeEHqZ5RFVON1\nv95w3A4FvAyVKGd0pyiIRlIY\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-d04eu@test-fe936.iam.gserviceaccount.com",
  "client_id": "112518376288956875814",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-d04eu%40test-fe936.iam.gserviceaccount.com"
}



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
