export interface Fighter{
        id : number,
        name : string,
        nickname : string,
        age: number,
        champion : boolean,
        birthdate: string,
        nation: string,
        imageUrl: string,
        weightClass: string,
        record: string,
        foughtInOrganisations: string[],
        description: string,
}

export interface Team{
        id: number,
        name: string,
        location: string,
        established: number,
        coach: string,
        logoUrl: string
}