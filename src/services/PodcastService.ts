import { PodcastRepository } from '../repositories/PodcastRepository';
import { FilterOptions } from '../models/FilterOptions';
import { Podcast } from '../models/Podcast';

export class PodcastService 
{
    private podcastRepository: PodcastRepository;

    constructor() { this.podcastRepository = new PodcastRepository(); }

    listEpisodes(filters?: FilterOptions): Podcast[] 
    {
        let podcasts: Podcast[] = this.podcastRepository.getAllPodcasts();

        if (!filters || Object.keys(filters).length === 0)
            return podcasts;

        if (filters.podcastName)
        {
            const podcast = this.podcastRepository.getPodcast(filters.podcastName);
            
            if (podcast) podcasts = [podcast];
            else return [];
        }

        if (filters.category)
        {
            const podcastsByCategory = this.podcastRepository.getPodcastsByCategory(filters.category);
            podcasts = podcasts.filter((podcast) => podcastsByCategory.includes(podcast));
        }

        if (filters.tag)
        {
            const podcastsWithEpisodesWithTag = this.podcastRepository.getEpisodesByTag(filters.tag);
            podcasts = podcasts.filter((podcast) => podcastsWithEpisodesWithTag.includes(podcast));
        }

        if (filters.startDate || filters.endDate)
        {
            const podcastsWithEpisodesInDateRange = this.podcastRepository.getEpisodesByDateRange(filters.startDate!, filters.endDate!);
            podcasts = podcasts.filter((podcast) => podcastsWithEpisodesInDateRange.includes(podcast));
        }

        return podcasts;
    }
}