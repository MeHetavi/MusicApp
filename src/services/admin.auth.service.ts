import { comparePassword } from "../services/common/password.service";
import { Admin } from "../models/admin";
import { IAdmin } from "../types";

async function getAdmin(data: Partial<IAdmin>): Promise<IAdmin | null> {
    try {
        const user = await Admin.findOne({ where: data });
        if (!user) return null;
        return user.toJSON() as IAdmin;
    } catch (err) {
        throw err;
    }
}

async function verifyAdmin(data: Partial<IAdmin>): Promise<IAdmin | null> {
    try {
        const admin = await Admin.findOne({ where: { email: data.email } });
        if (!admin) return null;
        const adminData = admin.toJSON() as IAdmin;
        const password = await comparePassword(data.password ?? "", adminData.password);
        if (!password) return null;
        return admin.toJSON() as IAdmin;
    } catch (err) {
        throw err;
    }
}

async function updateAdmin(data: Partial<IAdmin>, where: Partial<IAdmin>): Promise<IAdmin | null> {
    try {
        const user = await Admin.update(data, { where: where, returning: true });
        if (user[1].length <= 0) return null;
        return user[1][0].toJSON() as IAdmin;
    } catch (err) {
        throw err;
    }
}

export default { getAdmin, verifyAdmin, updateAdmin };