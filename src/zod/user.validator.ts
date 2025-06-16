import z from 'zod';

export const updateUserSchema = z.object({
    first_name: z
        .string({ required_error: 'First name is required' })
        .min(2, 'First name must be at least 2 characters long')
        .max(50, 'First name must be less than 50 characters')
        .optional(),
    last_name: z
        .string({ required_error: 'Last name is required' })
        .min(2, 'Last name must be at least 2 characters long')
        .max(50, 'Last name must be less than 50 characters')
        .optional(),
    user_name: z
        .string({ required_error: 'User name is required' })
        .min(2, 'User name must be at least 2 characters long')
        .max(50, 'User name must be less than 50 characters')
        .optional(),
    is_singer: z
        .string({ required_error: 'is_singer is required' })
        .optional(),

});

export const updateCurrentSongSchema = z.object({
    current_song_id: z
        .string({ required_error: 'Current song ID is required' }),
    current_song_time: z
        .string({ required_error: 'Current song time is required' }),
    current_album_id: z
        .string({ required_error: 'Current album ID is required' })
        .optional(),
});

export const updateSongTimeSchema = z.object({
    current_song_time: z
        .string({ required_error: 'Current song time is required' }),
    history_id: z
        .string({ required_error: 'History ID is required' })
});