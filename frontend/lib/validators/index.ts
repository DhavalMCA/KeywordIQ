import { z } from "zod"

export const InterestDataPointSchema = z.object({
  date: z.string(),
  value: z.number().nullable(),
})
export type InterestDataPoint = z.infer<typeof InterestDataPointSchema>

export const AutocompleteSuggestionSchema = z.object({
  text: z.string(),
  score: z.number().nullable().optional(),
})
export type AutocompleteSuggestion = z.infer<typeof AutocompleteSuggestionSchema>

export const YouTubeTagSchema = z.object({
  tag: z.string(),
  frequency: z.number().nullable().optional(),
})
export type YouTubeTag = z.infer<typeof YouTubeTagSchema>

export const KeywordAnalysisSchema = z.object({
  keyword: z.string(),
  interest_over_time: z.array(InterestDataPointSchema),
  autocomplete: z.array(AutocompleteSuggestionSchema),
  youtube_tags: z.array(YouTubeTagSchema),
  ai_meta_tags: z.array(z.string()).nullable(),
  cached: z.boolean(),
})

export type KeywordAnalysis = z.infer<typeof KeywordAnalysisSchema>

export const YouTubeVideoSchema = z.object({
  title: z.string(),
  video_id: z.string(),
  channel_title: z.string(),
  view_count: z.number().nullable().optional(),
  tags: z.array(z.string()),
  url: z.string(),
})

export const YouTubeSearchSchema = z.object({
  videos: z.array(YouTubeVideoSchema),
  tag_cloud: z.array(z.string()),
})

export type YouTubeSearch = z.infer<typeof YouTubeSearchSchema>

export const InstagramHashtagSchema = z.object({
  tag: z.string(),
  post_count: z.number().nullable().optional(),
})

export const NicheClusterSchema = z.object({
  topic: z.string(),
  hashtags: z.array(z.string()),
})

export const InstagramSearchSchema = z.object({
  hashtags: z.array(InstagramHashtagSchema),
  trending: z.array(InstagramHashtagSchema),
  niches: z.array(NicheClusterSchema),
})

export type InstagramSearch = z.infer<typeof InstagramSearchSchema>

export const HashtagBundleSchema = z.object({
  instagram: z.array(z.string()),
  twitter: z.array(z.string()),
  linkedin: z.array(z.string()),
})

export const HashtagResultSchema = z.object({
  topic: z.string(),
  hashtags: HashtagBundleSchema,
  cached: z.boolean(),
})

export type HashtagResult = z.infer<typeof HashtagResultSchema>

export const MetaTagOutputSchema = z.object({
  title: z.string(),
  description: z.string(),
  og_title: z.string(),
  og_description: z.string(),
  twitter_card: z.string(),
  twitter_title: z.string(),
  twitter_description: z.string(),
})

export const MetaTagResultSchema = z.object({
  input_url: z.string().nullable(),
  input_description: z.string().nullable(),
  tags: MetaTagOutputSchema,
  cached: z.boolean(),
})

export type MetaTagResult = z.infer<typeof MetaTagResultSchema>
