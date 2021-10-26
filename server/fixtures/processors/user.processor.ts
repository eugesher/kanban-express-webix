import { IProcessor } from 'typeorm-fixtures-cli';
import User from '../../entities/user.entity';

export default class UserProcessor implements IProcessor<User> {
  private readonly _emptyString: string = '';
  private readonly _dot: string = '.';
  private readonly _underscore: string = '_';

  private normalizeUsername(value: string): string {
    return value
      .toLowerCase()
      .replace(this._dot, this._emptyString)
      .replace(this._underscore, this._emptyString);
  }

  public preProcess(name: string, object: any): any {
    const username = this.normalizeUsername(object.username);
    return { ...object, username };
  }
}
