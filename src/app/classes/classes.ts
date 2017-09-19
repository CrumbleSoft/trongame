export class Faction {
    id : number;
    name : string;
    color: string;
    power: number;
    members: Array<User>;
    sectors: Array<Sector>;
}

export class User {
    id : number;
    faction : string;
    username: string;
    email: string;
    level: number;
    crumbles: number;
    photons: number;
    sectors: Array<Sector>;
    trailCoordinates : Array<TrailCoordinate>;
    icon: string;
}

export class Sector {
    id : number;
    level: number;
    surfaceAera: number;
    trailCoordinates: Array<TrailCoordinate>;
}

export class TrailCoordinate {
    id : number;
    lat : number;
    long : number;
    timeStamp : Date;
    strength: number;
    active: boolean;
}

export class SnappedPoint {
    location : SPLocation;
    originalIndex: number;
    placeId : string;
}

export class SPLocation {
    latitude : number;
    longitude : number;
}