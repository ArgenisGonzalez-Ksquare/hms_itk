import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";
import { Appointment } from "./appointment.model";

export class DoctorInfo extends Model<InferAttributes<DoctorInfo>, InferCreationAttributes<DoctorInfo>> {

    declare id: CreationOptional<number>;
    declare FullName: string;
    declare UserId: number;
    declare Birthdate: Date;
    declare Status: CreationOptional<boolean>;

    getId(): number {
        return this.id;
    }

}

export const initDoctorInfo = (sequelize: Sequelize) => {
    DoctorInfo.init({
    
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        FullName: DataTypes.STRING,
        UserId: DataTypes.INTEGER,
        Birthdate: DataTypes.DATE,
        Status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    
}, {
    sequelize // Instance of sequelize that reflects the connection
})

}

