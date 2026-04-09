import { Request, Response } from 'express';
import { PodcastService } from '../services/PodcastService';
import { validateQueryFilters } from '../utils/validation';
import { FilterOptions } from '../models/FilterOptions';
import { StatusCode } from '../utils/statusCode';

export class PodcastController 
{
    private podcastService: PodcastService;

    constructor() { this.podcastService = new PodcastService(); }

    listEpisodes = async (req: Request, res: Response): Promise<void> => {
        try 
        {
            const { category, tag, podcastName, startDate, endDate } = req.query;

            const filters: FilterOptions = {
                category: category as string,
                tag: tag as string,
                podcastName: podcastName as string,
                startDate: startDate as string,
                endDate: endDate as string,
            };

            const validation = validateQueryFilters(filters);

            if (!validation.isValid) 
            {
                res.status(StatusCode.BadRequest).json({
                    error: 'Invalid filter parameters',
                    details: validation.errors,
                });

                return;
            }

            const podcasts = this.podcastService.listEpisodes(filters);

            res.status(StatusCode.OK).json({
                success: true,
                count: podcasts.length,
                data: podcasts,
            });
        } 
        catch (error) 
        {
            res.status(StatusCode.InternalServerError).json({
                error: 'Internal server error',
                message: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    };
}