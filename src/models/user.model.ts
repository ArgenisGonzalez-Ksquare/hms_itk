import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";
import {PatientInfo} from './patientInfo.model'

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {

    declare id: CreationOptional<number>;
    declare display_name: string;
    declare email: string;
    declare password: string;
    declare role: CreationOptional<string>;
    declare status: CreationOptional<boolean>;

    getId(): number {
        return this.id;
    }

}

export const initUser = (sequelize: Sequelize) => {
    User.init({
        id: {
            type: DataTypes.STRING,
            autoIncrement: false,
            primaryKey: true

        },
        display_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.STRING,
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    
}, {
    sequelize // Instance of sequelize that reflects the connection
})
    User.hasMany(PatientInfo, {
        foreignKey: 'user_id',
        sourceKey: 'id',
    });

    PatientInfo.belongsTo(User, {
        foreignKey: 'user_id',
        targetKey: 'id',
    });
}


