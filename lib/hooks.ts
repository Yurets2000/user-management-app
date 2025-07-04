import * as XLSX from 'xlsx';
import { uploadUsers } from '@/lib/actions';
import { User } from '@/lib/definitions';

export function useUploadUsers() {
    const upload = async (file: File) => {
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][];

        const users: User[] = data.slice(1).map((row) => ({
            id: row[0].toString(),
            name: row[1],
            email: row[2],
            createdAt: row[3]
        }));

        await uploadUsers(users);
    };

    return { upload };
}