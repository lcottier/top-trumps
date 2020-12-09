export class Hero {
  constructor(
    public id: string,
    public name: string = '',
    public description: string = '',
    public speed: number = 0,
    public strength: number = 0,
    public intelligence: number = 0
  ) {}
}

export class Villain {
  constructor(
    public id: string,
    public name: string = '',
    public description: string = '',
    public speed: number = 0,
    public strength: number = 0,
    public intelligence: number = 0
  ) {}
}
