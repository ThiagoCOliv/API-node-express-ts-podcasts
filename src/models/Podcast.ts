import { Episode } from "./Episode";

export interface Podcast 
{
    id: string;
    name: string;
    nameVariations: string[];
    category: string;
    link: string;
    logo: string;
    episodes: Episode[];
}
