// TODO: create here a typescript interface for an olympic country
/*
example of an olympic country:
{
    id: 1,
    country: "Italy",
    participations: []
}
*/

import { Participations } from "./Participations";

export interface Olympics {
    id: number;
    country: string;
    participations:Participations[]
    }