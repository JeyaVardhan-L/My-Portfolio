import { getBlogPosts } from 'app/blog/utils'
import { getProjects } from 'app/projects/utils'
import { PROFILE } from 'app/data/profile'

export const baseUrl = PROFILE.baseUrl

export default async function sitemap() {
  // 1. Get all Blog Post URLs
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  // 2. Get all Project Page URLs
  let projects = getProjects().map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.metadata.publishedAt,
  }))

  // 3. Define all Static Routes
  let routes = ['', '/blog', '/projects'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs, ...projects]
}
