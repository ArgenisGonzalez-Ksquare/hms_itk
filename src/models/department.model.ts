import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";

export class department extends Model<InferAttributes<department>, InferCreationAttributes<department>> {

    declare id: CreationOptional<number>;
    declare Department: string;
    declare Status: CreationOptional<boolean>;

    getId(): number {
        return this.id;
    }

}

export const initDepartment = (sequelize: Sequelize) => {
    department.init({
    
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        Department: DataTypes.STRING,
        Status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    
}, {
    sequelize // Instance of sequelize that reflects the connection
})
}

