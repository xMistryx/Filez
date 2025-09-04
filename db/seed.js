import db from "#db/client";
import { faker } from "@faker-js/faker";

async function seed() {
  // TODO
  for (let i = 0; i < 3; i++) {
    const name = faker.lorem.words({min: 1, max: 3});
    const folderSQL = `
      INSERT INTO folders (name)
      VALUES($1)
      RETURNING *
    `;
    const {rows} = await db.query(folderSQL, [name]);
    const folder = rows[0];
    for (let j = 0; j < 5; j++) {
      const name = faker.lorem.words({min: 1, max: 3});
      const size = faker.number.int({min: 1, max: 100});
      const fileSQL = `
        INSERT INTO files (name, size, folder_id)
        VALUES($1, $2, $3)
        RETURNING *
      `;
      await db.query(fileSQL, [name, size, folder.id]);
    }
  }
}

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");
