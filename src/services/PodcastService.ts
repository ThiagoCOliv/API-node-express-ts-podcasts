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

        if (filters.category) 
            podcasts = this.podcastRepository.getPodcastsByCategory(filters.category);

        if (filters.tag) 
            podcasts = this.podcastRepository.getEpisodesByTag(filters.tag);

        if (filters.podcastName)
        {
            const podcast = this.podcastRepository.getPodcast(filters.podcastName);
            
            if (!podcast) 
                return [];

            podcasts = [podcast];
        }

        if (filters.startDate || filters.endDate) 
            podcasts = this.podcastRepository.getEpisodesByDateRange(filters.startDate!, filters.endDate!);

        return podcasts;
    }
}