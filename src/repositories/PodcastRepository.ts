import { Episode } from '../models/Episode';
import { Podcast } from '../models/Podcast';

import fs from 'fs';
import path from 'path';

const pathData = path.join(__dirname, '../repositories/podcasts.json');

const language = "utf-8";

const rawData = fs.readFileSync(pathData, language);
const podcasts: Podcast[] = JSON.parse(rawData);

export class PodcastRepository 
{
    getAllPodcasts(): Podcast[] { return podcasts; }

    getPodcast(podcastName: string): Podcast | undefined { return podcasts.find((podcast) => podcast.name === podcastName); }

    getEpisodesByTag(tag: string): Podcast[] 
    {
        const podcastsWithEpisodeWithTag: Podcast[] = podcasts.filter((podcast) => podcast.episodes.some((episode) => episode.tags.includes(tag.toUpperCase())));

        const podcastsWithEpisodesFiltered = podcastsWithEpisodeWithTag.map((podcast) => {
        const filteredEpisodes = podcast.episodes.filter((episode) => episode.tags.includes(tag.toUpperCase()));
        
        return { ...podcast, episodes: filteredEpisodes };
        });

        return podcastsWithEpisodesFiltered;
    }

    getPodcastsByCategory(category: string): Podcast[] 
    {
        return podcasts.filter((podcast) => podcast.category.toLowerCase() === category.toLowerCase());
    }

    getEpisodesByDateRange(startDate: string, endDate: string): Podcast[] 
    {
        const podcastsWithEpisodesInRange: Podcast[] = podcasts.filter((podcast) => podcast.episodes.some((episode) => episode.releaseDate >= startDate && episode.releaseDate <= endDate));

        const podcastsWithEpisodesFiltered = podcastsWithEpisodesInRange.map((podcast) => {
            const filteredEpisodes = podcast.episodes.filter((episode) => episode.releaseDate >= startDate && episode.releaseDate <= endDate);
            
            return { ...podcast, episodes: filteredEpisodes };
        });
        
        return podcastsWithEpisodesFiltered;
    };
}
