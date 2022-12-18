import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";

export class Appointment extends Model<InferAttributes<Appointment>, InferCreationAttributes<Appointment>> {

    declare id: CreationOptional<number>;
    declare patientInfo_id: string;
    declare doctorInfo_id: string;
    declare date: Date;
    declare is_active: CreationOptional<boolean>;

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
        patientInfo_id: DataTypes.INTEGER,
        doctorInfo_id: DataTypes.INTEGER,
        date: DataTypes.DATE,
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    
}, {
    sequelize // Instance of sequelize that reflects the connection
})
}

