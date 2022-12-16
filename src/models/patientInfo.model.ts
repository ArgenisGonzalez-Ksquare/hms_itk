import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";
import {User} from './user.model'


export class PatientInfo extends Model<InferAttributes<PatientInfo>, InferCreationAttributes<PatientInfo>> {
    declare id: CreationOptional<number>;
    declare full_name: string;
    declare user_id: CreationOptional<number>;
    declare birthdate: Date;
    declare status: CreationOptional<boolean>;

    getId(): number {
        return this.id;
    }
}

export const initPatienInfo = (sequelize: Sequelize) => {
    PatientInfo.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        full_name: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
        birthdate: DataTypes.DATEONLY,
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    
}, {
    sequelize // Instance of sequelize that reflects the connection
})
}
