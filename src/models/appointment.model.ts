import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";
import { PatientInfo } from "./patientInfo.model";
import { DoctorInfo } from "./doctorInfo.model";

export class Appointment extends Model<InferAttributes<Appointment>, InferCreationAttributes<Appointment>> {

    declare id: CreationOptional<number>;
    declare patientInfo_id: string;
    declare doctorInfo_id: string;
    declare date: Date;
    declare is_active: CreationOptional<boolean>;

}

export const initAppointmentInfo = (sequelize: Sequelize) => {
    Appointment.init({
    
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        patientInfo_id: {
            type: DataTypes.STRING,
/*             references: {
                model: 'patientInfo', // 'fathers' refers to table name
                key: 'id', // 'id' refers to column name in fathers table
            } */
        },
        doctorInfo_id: {
            type: DataTypes.STRING,
/*             references: {
                model: 'doctorInfo', // 'fathers' refers to table name
                key: 'id', // 'id' refers to column name in fathers table
            } */
        },
        date: DataTypes.DATE,
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    
},{
    tableName: "appointments",
    sequelize // Instance of sequelize that reflects the connection
})

/* PatientInfo.hasMany(Appointment, { foreignKey: 'patienInfo_id', foreignKeyConstraint: true });
DoctorInfo.hasMany(Appointment, { foreignKey: 'doctorInfo_id', foreignKeyConstraint: true }); */
}


