import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";

export class doctorInfo extends Model<InferAttributes<doctorInfo>, InferCreationAttributes<doctorInfo>> {

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
    doctorInfo.init({
    
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        FullName: DataTypes.STRING,
        UserId: DataTypes.NUMBER,
        Birthdate: DataTypes.DATE,
        Status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    
}, {
    sequelize // Instance of sequelize that reflects the connection
})
}

