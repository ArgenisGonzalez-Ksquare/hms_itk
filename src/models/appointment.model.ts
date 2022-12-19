import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";

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
        patientInfo_id: DataTypes.STRING,
        doctorInfo_id: DataTypes.STRING,
        date: DataTypes.DATE,
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    
}, {
    sequelize // Instance of sequelize that reflects the connection
})
}

