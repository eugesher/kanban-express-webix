import { join, resolve } from 'path';
import {
  Builder,
  fixturesIterator,
  Loader,
  Parser,
  Resolver,
} from 'typeorm-fixtures-cli/dist';
import { createConnection, getRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import ormconfig from '../config/ormconfig';

const users: Pick<User, 'username' | 'password'>[] = [];

async function loadFixtures(fixturesPath: string): Promise<void> {
  let connection;

  try {
    connection = await createConnection(ormconfig);

    const loader = new Loader();
    loader.load(resolve(fixturesPath));

    const resolver = new Resolver();
    const fixtures = resolver.resolve(loader.fixtureConfigs);
    const builder = new Builder(connection, new Parser());

    let counter = 0;
    for (const fixture of fixturesIterator(fixtures)) {
      fixture.locale = 'en_US';
      const entity = await builder.build(fixture);

      if (entity.constructor.name === 'User') {
        const { username, password } = entity as User;
        users.push({ username, password });
      }

      counter++;
      console.clear();
      console.log(`Fixtures loaded (${counter}/${fixtures.length})`);

      await getRepository(entity.constructor.name).save(entity);
    }
  } catch (err) {
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

loadFixtures(join(__dirname, 'config'))
  .then(() => {
    console.log('\nUsers');
    console.table(users);
    console.log('\nFixtures are successfully loaded.');
  })
  .catch((err) => console.log(err));
