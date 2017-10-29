import {fixture} from './fixture.object';

export class fixturelist{
    public fixtures: fixture[];

    constructor(){
        this.fixtures = [];
    }

     addfixtureadd(f: fixture) : void {
        this.fixtures.push(f);
    }

    addfixturesadd(f: fixture[]) : void {
        this.fixtures = f;
    }


}