import { InferAttributes, where } from "sequelize";
import {  Department } from "../models/department.model";

// Create operation


export const paginatedList = async(pLimit:number, pOffset:number) =>{

    try {
        const res = await Department.findAll({
            attributes: ['id', 'department'],
            limit: pLimit,
            offset :pOffset,
            where: {
                is_active: true
            }
        })
        return res
    } catch (error) {
        console.error(error)
        return null
    }

    
}


export const listDepartments =async (is_active: boolean) => {
    const res = await Department.findAll({
        attributes: ['id', 'department'], // SELECT id From "Todos" WHERE is_completed = true;
        where: {
            is_active: true
        }
    })
    return res;
}

export const createDepartment = async (department:string) => {
    try {
        const departmentResult = await Department.create({
            department
        })


        return departmentResult;
    } catch (error) {
        console.error(error);
        return null
        
    }
}


export const fetchDepartmentById = async (id: number) => {
    try {
        const foundDepartment = await Department.findByPk(id) ;

        return foundDepartment;

    } catch (error) {
        console.error(error);

        return null;
    }
}


export const updateDepartmentById = async (id: number, departmentModel: InferAttributes<Department>) => {

    try {
        const foo = await Department.update({
            department: departmentModel.department,
            is_active: departmentModel.is_active
        }, {
            where: {
                id: id
            }
        })
        
        return foo;
    } catch (error) {
        console.error(error);
        return null;
    }


}


export const deleteDepartmentById = async (id: number) => {
    try {
        const foo = await Department.update({
            is_active: false
        }, {
            where: {
                id: id
            }
        })
        return foo;
    } catch (error) {
        console.error(error);
        return null;
    }
}