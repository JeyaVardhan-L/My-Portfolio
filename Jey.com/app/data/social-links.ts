export interface SocialLink {
  name: string;
  url: string;
  label: string;
  verified: boolean;
}

// Only verified links are rendered publicly.
// Add personal profiles here once verified (see CONTENT_TODO.md).
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'github',
    url: 'https://github.com/JeyaVardhan-L',
    label: 'GitHub Profile',
    verified: true,
  },
  {
    name: 'rss',
    url: '/rss',
    label: 'RSS Feed',
    verified: true,
  },
  // Placeholders (not rendered publicly until populated):
  // {
  //   name: 'linkedin',
  //   url: 'https://www.linkedin.com/in/<your-profile>/',
  //   label: 'LinkedIn Profile',
  //   verified: false,
  // },
  // {
  //   name: 'email',
  //   url: 'mailto:<your-email>@domain.com',
  //   label: 'Email',
  //   verified: false,
  // },
];

export const VERIFIED_SOCIAL_LINKS = SOCIAL_LINKS.filter((link) => link.verified);

