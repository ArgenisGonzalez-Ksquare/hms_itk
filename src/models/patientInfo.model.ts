import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";


export class PatientInfo extends Model<InferAttributes<PatientInfo>, InferCreationAttributes<PatientInfo>> {
    declare id: CreationOptional<number>;
    declare full_name: string;
    declare user_id: string;
    declare birthdate: Date;
    declare is_active: CreationOptional<boolean>;
}

export const initPatienInfo = (sequelize: Sequelize) => {
    PatientInfo.init({
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
    tableName: "patientInfo",
    sequelize // Instance of sequelize that reflects the connection
})
/*     PatientInfo.hasMany(Appointment);
    Appointment.belongsTo(PatientInfo); */
}


