import bcrypt from "bcryptjs";

class EncryptPassword {

    public async encryptPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }

    public async matchPassword(password: string, savedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, savedPassword);
    }
    
}

const encryptPassword = new EncryptPassword();
export default encryptPassword;