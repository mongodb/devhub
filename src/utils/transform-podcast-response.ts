import { PodcastResponse } from '../interfaces/responses/podcast-response';
import { Podcast } from '../classes/podcast';

export const transformPodcastResponse = (podcast : PodcastResponse): Podcast =>
    new Podcast(podcast);
