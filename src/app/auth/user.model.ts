export class UserModel {
  constructor(
    public _email: string,
    public _id: string,
    private _token: string,
    private _tokenExpirationDate: Date) {
  }


  get email(): string {
    return this._email;
  }

  get id(): string {
    return this._id;
  }

  get token(): string {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
      return null;
    }
    return this._token;

  }

  get tokenExpirationDate(): Date {
    return this._tokenExpirationDate;
  }
}
