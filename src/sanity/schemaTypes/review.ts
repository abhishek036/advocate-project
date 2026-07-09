import { defineType, defineField } from 'sanity'

export const review = defineType({
  name: 'review',
  title: 'Client Review',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Designation',
      type: 'string',
      description: 'e.g. "Client" or "Business Owner"',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. "Dubai → Pune Property Case"',
    }),
    defineField({
      name: 'body',
      title: 'Review Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(400),
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating (1–5)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
      initialValue: 5,
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar / Photo',
      type: 'image',
      description: 'Optional. If omitted, initials will be shown instead.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'initials',
      title: 'Initials (fallback)',
      type: 'string',
      description: 'e.g. "SR" — used when no avatar photo is uploaded.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Featured reviews are shown first in the carousel.',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date',
      type: 'date',
      description: 'Approximate date of the engagement.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      media: 'avatar',
    },
  },
  orderings: [
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'publishedAt', direction: 'desc' },
      ],
    },
  ],
})
