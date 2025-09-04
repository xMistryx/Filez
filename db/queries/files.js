import db from "#db/client";

export async function getFilesIncludingFolderName() {
    const sql = `
    SELECT
        *,
        (
            SELECT to_json(folders.name)
            FROM folders
            WHERE folders.id = files.folder_id
        ) AS folder_name
    FROM files
    `;
    const {rows: files} = await db.query(sql);
    return files;
} 

export async function createFile(name, size, folder_id) {
    const sql = `
        INSERT INTO files (name, size, folder_id)
        VALUES($1, $2, $3)
        RETURNING *
    `;
    const {rows} = await db.query(sql, [name, size, folder_id])
    return rows[0]
}