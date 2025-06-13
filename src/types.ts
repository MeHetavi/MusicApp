import { Document, ObjectId } from 'mongoose';
import mongoose from 'mongoose';
import { IntegerType } from 'typeorm';

export interface IUser {
    user_id: string;
    user_name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    login_type: 'email' | 'social';
    otp: IntegerType;
    login_verification_status: boolean;
    is_admin: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    is_singer: boolean;
}

export interface ISong {
    song_id: string;
    title: string;
    audio: string;
    thumbnail: string;
    genre_id: string;
    artists?: IMusicSinger[]; // Assuming singer is a string, could be an ObjectId or reference to another model
    category_id: string;
    duration: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IFavourite {
    favourite_id: string;
    user_id: string;
    song_id: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IDownload {
    download_id: string;
    user_id: string;
    song_id: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ISongSinger {
    song_id: string;
    user_id: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IAlbum {
    album_id: string;
    title: string;
    thumbnail: string;
    genre: string;
    is_private: boolean;
    descrption: string;
    songs: ISong[];
    user_id: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IFavourites {
    user_id: string;
    song_id: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IGenre {
    genre_id: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICategories {
    category_id: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IMusicSinger {
    singer_id: string;
    user_id: string;
    song_id: string;
    createdAt?: Date;
    updatedAt?: Date;
}