import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";
import { Appointment } from "./appointment.model";

export class DoctorInfo extends Model<InferAttributes<DoctorInfo>, InferCreationAttributes<DoctorInfo>> {

    declare id: CreationOptional<number>;
    declare full_name: string;
    declare user_id: string;
    declare birthdate: Date;
    declare is_active: CreationOptional<boolean>;

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
        full_name: DataTypes.STRING,
        user_id: DataTypes.STRING,
        birthdate: DataTypes.DATEONLY,
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    
}, {
    sequelize // Instance of sequelize that reflects the connection
})
/*     DoctorInfo.hasMany(Appointment);
    Appointment.belongsTo(DoctorInfo); */
}

