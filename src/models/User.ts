export class User {
  id: string;
  name: string;
  teamId: string;

  constructor(id: string, name: string, teamId: string) {
    this.id = id;
    this.name = name;
    this.teamId = teamId;
  }
}
