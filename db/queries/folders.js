import db from "#db/client";

export async function getFolders() {
    const sql = `
        SELECT *
        FROM folders
    `;
    const {rows: folders} = await db.query(sql);
    return folders;
}

export async function getFolderById(id) {
    const sql = `
        SELECT *
        FROM folders
        WHERE id = $1
    `;
    const {rows} = await db.query(sql, [id]);
    return rows[0];
}

export async function getFoldersIncludingFiles(id) {
    const sql = `
        SELECT 
            *,
            (
                SELECT json_agg(files)
                FROM files
                WHERE files.folder_id = folders.id
            ) AS files
        FROM folders
        WHERE id = $1
    `;
    const {rows} = await db.query(sql, [id]);
    return rows[0]
}