import mongoose from 'mongoose';
import { describe, expect, test, beforeEach } from '@jest/globals';
import { Post } from '../db/models/post.js';
import { createPost, listAllPosts, listPostsByAuthor, listPostsByTag } from '../services/posts.js';

describe('creating posts', () => {
    test('with all parameters should succeed', async () => {
        const post = {
            title: 'Hello Mongoose!',
            author: 'Daniel Bugl',
            contents: 'This post is stored in a MongoDB database using Mongoose.',
            tags: ['mongoose', 'mongodb'],
        };
        const createdPost = await createPost(post);
        expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId);
        const foundPost = await Post.findById(createdPost._id);
        expect(foundPost).toEqual(expect.objectContaining(post))
        expect(foundPost.createdAt).toBeInstanceOf(Date)
        expect(foundPost.updatedAt).toBeInstanceOf(Date)
    });
    test('without title should fail', async () => {
        const post = {
            author: 'Daniel Bugl',
            contents: 'Post with no title',
            tags: ['empty'],
        };
        try {
            await createPost(post);
        } catch (err) {
            expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
            expect(err.message).toContain('`title` is required');
        }
    });
    test('with minimal parameters should succeed', async () => {
        const post = {
            title: 'Only a title',
        };
        const createdPost = await createPost(post);
        expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId);
    })
})

const samplePosts = [
    { title: 'Learning Redux', author: 'Daniel Bugl', tags: ['redux'] },
    { title: 'Learn React Hooks', author: 'Daniel Bugl', tags: ['react'] },
    {
        title: 'Full-Stack React Projects',
        author: 'Daniel Bugl',
        tags: ['react', 'nodejs'],
    },
    { title: 'Guide to TypeScript' },
];