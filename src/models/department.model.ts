import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";

export class Department extends Model<InferAttributes<Department>, InferCreationAttributes<Department>> {

    declare id: CreationOptional<number>;
    declare department: string;
    declare is_active: CreationOptional<boolean>;

    getId(): number {
        return this.id;
    }

}

export const initDepartment = (sequelize: Sequelize) => {
    Department.init({
    
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        department: DataTypes.STRING,
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    
}, {
    sequelize // Instance of sequelize that reflects the connection
})
}

