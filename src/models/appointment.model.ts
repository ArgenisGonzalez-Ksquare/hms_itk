import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";

export class Appointment extends Model<InferAttributes<Appointment>, InferCreationAttributes<Appointment>> {

    declare id: CreationOptional<number>;
    declare PatientInfo_id: number;
    declare DoctorInfo_id: number;
    declare Date: Date;
    declare Status: CreationOptional<boolean>;

    getId(): number {
        return this.id;
    }

}

export const initAppointmentInfo = (sequelize: Sequelize) => {
    Appointment.init({
    
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        PatientInfo_id: DataTypes.INTEGER,
        DoctorInfo_id: DataTypes.INTEGER,
        Date: DataTypes.DATE,
        Status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    
}, {
    sequelize // Instance of sequelize that reflects the connection
})
}

