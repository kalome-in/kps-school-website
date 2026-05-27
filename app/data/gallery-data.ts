export interface GalleryItem {
  id: number;
  type: 'photo' | 'video';
  videoUrl?: string; // YouTube URL
  albumId: string;
  title: string;
  desc: string;
  image: string; // Thumbnail for videos, full image for photos
  fallback: string;
  tags: string[];
}

export interface Album {
  id: string;
  title: string;
  year: string;
  category: string;
  coverImage: string;
  itemCount: number;
  tags: string[];
}

export interface Topper {
  id: number;
  name: string;
  score: string;
  title: string;
  rank: string;
  year: string;
  image: string;
  fallback: string;
}

export interface MediaClipping {
  id: number;
  image: string;
  fallback: string;
  publication: string;
  date: string;
  headline: string;
}

export const ALL_TAGS = [
  'All', 
  'Annual Day', 
  'Festivals', 
  'Achievements', 
  'Activities', 
  'Campus Life',
  'Sports'
];

export const ALBUMS: Album[] = [];

export const TOPPERS: Topper[] = [
  {
    id: 1,
    name: 'S. Pranitha',
    score: '598/600',
    title: 'School Topper (10 CGPA)',
    rank: 'State 1st Rank',
    year: 'SSC 2026',
    image: '/images/principal_portrait.jpg',
    fallback: '/images/principal_portrait.jpg'
  },
  {
    id: 2,
    name: 'B. Nagachaitanya',
    score: '595/600',
    title: 'Science Topper',
    rank: 'District 1st Rank',
    year: 'SSC 2026',
    image: '/images/principal_portrait.jpg',
    fallback: '/images/principal_portrait.jpg'
  },
  {
    id: 3,
    name: 'T. Shiva Kumar',
    score: '592/600',
    title: 'Math Topper',
    rank: 'District 2nd Rank',
    year: 'SSC 2026',
    image: '/images/principal_portrait.jpg',
    fallback: '/images/principal_portrait.jpg'
  },
  {
    id: 4,
    name: 'M. Anjali',
    score: '590/600',
    title: 'English Topper',
    rank: 'School 4th Rank',
    year: 'SSC 2026',
    image: '/images/principal_portrait.jpg',
    fallback: '/images/principal_portrait.jpg'
  }
];

import { LOCAL_GALLERY_ITEMS, LOCAL_MEDIA_CLIPPINGS } from './gallery-data-local';

export const MEDIA_CLIPPINGS: MediaClipping[] = [
  ...LOCAL_MEDIA_CLIPPINGS
];



// Raw lists of YouTube video IDs from the user request
const FAMILY_PARTY_VIDEOS = [
  'y0f0AON9rOM', 'nG_Hg4KiGP0', 'r6mEV6RCw5k', 'cm6kEi6iGdk', 'j-EjDS-XO4Q',
  'uhVZ7UQgfDQ', '8HlLyUMFEHU', 'ARMK4MnekKU', 'n4a0bmqa4Ro', 'LGBaRDVy0f4',
  'beeAiKTjOd4', 'POCGOaRaIG4', 'ypykTsEaDUU', 'SXI8iQjmaIs', '44YRtHFNHvc',
  'LUr2mgyYQD4', '-doZY8ubeUw', 'CNXTSzYcNZE', 'm40N43pbYqY', 'sBwDuVPLJZo',
  'IItKWaXcWlk', 'x-xkAuVQzsM', 'zCRkwvs0KgM', 'z8Czx-dACos', 'B64nS7QgIbI',
  'Js9WSROuA58', 'Z5gxTv6q8KA', 'wRM2CsoOfKc', 'um54wgWnEmc', 'L9r4rKashJ4',
  'QIMPIcSNwpM', 'wZWi4voMJ4Y', '8PgGp1CBlrQ', 'Mwwfk_QxGVM', 'rfPYP5MsRPE',
  'V0bKcPf16n0', 'hXcUxITBx70', 'duqDKFlQmoY', 'r-CCYYMGJbI', 'D38zlMVYT-0',
  'z63jo44coeY', '6YVv8aq7kNg', 'J7tupMHIKv4', 'lfte64QVDjA', 'IPOguWgjQcc',
  'fQ3oW3ffmtk'
];

const FAREWELL_PARTY_VIDEOS = [
  'HYH4D4zTJUI', 'bsXIWlOYrVM', 'EgEg7yv9f5I', 'TmNJbZiAcTY', 'TfTwYnlMvBw',
  'adqJkVy7uVE', 'izXvHjquIAQ', 'pHxLt6yk29o', 'a5gho7XWWow'
];

const FESTIVAL_VIDEOS: { [key: string]: string[] } = {
  'Bathukamma': ['6sh_Qq-6vtA', '-e9y9fTPmcA'],
  'Vinayaka Chavithi': ['xIKVLLTB5Ac', 'sCZrYuXxMsQ', 'uckM7VUQUJw', 'IE-ziENuPjg', 'bLMIexXIy5M', 'CrFHKMvQskA', 'jICbrRjrEYE'],
  'Krishnastami': ['ATEUoIlhgoo', '5bwfaD3yMLY', 'YVFNRsyjnMg', 'DvsK6I1jImI', 'zC0j6lTVmz0'],
  'Bonalu': ['G_CLtfCxGhs', 'u1GxhR39x4o', 'kuW_aToXdqk'],
  'Sankranti': ['2ors5ByggLs', 'ReW-B0D1IsM', 'QMQkPgXGdEo', '0aUjrOqucEs'],
  'Ugadi': ['UF7CfTGhI60', 'eiiY1W5Ev0c', 'pFnnR_DnH1c'],
  'Deepavali': ['MedOKLC71tM', 'TRU8EcNh0vQ'],
  'Teachers Day': ['3T1YwZv4Zw8', 'I8iIjw9fekY', 'oi5W1SgjzqI', 'UCIa2zo9EVw'],
  'Childrens Day': ['V0aQ1C_y6JY', 'i8a1OwyPIzA', 'KcrUrpGGKAI'],
  'Independence Day': ['NSAJ-vXsscg', '8fX7jF0jjJ0', '9C6vddjwlis'],
  'Republic Day': ['zCMJpddKbrA'],
  'Vasantha Panchami': ['je7WSRrPm1s', '64B0c_e1v1k', 'VIAPgVMFWUQ'],
  'Raksha Bandhan': ['HYYisVQd-sA', 'AqQFLcAMtRc'],
  'Rama Navami': ['9LFXqYo6ynE']
};

// Programmatically construct items with dynamic thumbnails and fallback seed images
const familyPartyItems: GalleryItem[] = FAMILY_PARTY_VIDEOS.map((id, index) => ({
  id: 100 + index,
  type: 'video',
  videoUrl: `https://www.youtube.com/watch?v=${id}`,
  albumId: 'annual-day-family-party',
  title: `Annual Day Family Party - Performance ${index + 1}`,
  desc: `Lively student dance and cultural celebration on Annual Day Family Party stage.`,
  image: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
  fallback: '/images/hero_banner.jpg',
  tags: ['Annual Day', 'Family Party']
}));

const farewellPartyItems: GalleryItem[] = FAREWELL_PARTY_VIDEOS.map((id, index) => ({
  id: 200 + index,
  type: 'video',
  videoUrl: `https://www.youtube.com/watch?v=${id}`,
  albumId: 'annual-day-farewell-party',
  title: `Farewell Party - Memory ${index + 1}`,
  desc: `Touching performance and expressions from students during the high school Farewell event.`,
  image: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
  fallback: '/images/hero_banner.jpg',
  tags: ['Annual Day', 'Farewell Party']
}));

const festivalItems: GalleryItem[] = [];
let festIdCounter = 300;
Object.entries(FESTIVAL_VIDEOS).forEach(([subTag, ids]) => {
  ids.forEach((id, index) => {
    festivalItems.push({
      id: festIdCounter++,
      type: 'video',
      videoUrl: `https://www.youtube.com/watch?v=${id}`,
      albumId: `festivals-${subTag.toLowerCase().replace(/\s+/g, '-')}`,
      title: `${subTag} - Celebrations Clip ${index + 1}`,
      desc: `Visual highlights showing the traditional observances and student involvement in ${subTag}.`,
      image: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      fallback: '/images/hero_banner.jpg',
      tags: ['Festivals', subTag]
    });
  });
});

// Final consolidated array of all gallery assets
export const GALLERY_ITEMS: GalleryItem[] = [
  ...familyPartyItems,
  ...farewellPartyItems,
  ...festivalItems,
  ...LOCAL_GALLERY_ITEMS
];

// Helper to extract YouTube video ID from standard watch link or short link
export function getYouTubeId(url?: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}
