export const languages = {
  english: {
    id: 'ck2lzfx710hkq07206thus6pt',
    languageCode: 'en',
    locale: 'en-us',
    textDirection: 'LTR',
    displayName: 'English',
    nativeName: 'English',
  },
  french: {
    id: 'ck2lzfx710hkp07206oo0icbv',
    languageCode: 'fr',
    locale: 'fr-fr',
    textDirection: 'LTR',
    displayName: 'French',
    nativeName: 'Français',
  },
  testLanguage: {
    id: 'test-lang-1234',
    languageCode: 'zz',
    locale: 'zz-zz',
    textDirection: 'LTR',
    displayName: 'Test Language Name',
    nativeName: 'Test Language',
  },
  mockLanguage: {
    id: 'ck2lzfx710hkq07206thus6pt',
    languageCode: 'mock string value',
    locale: 'mock string value',
    textDirection: 'LTR',
    displayName: 'mock string value',
    nativeName: 'mock string value',
  },
};

export const teams = [
  {
    id: 'ck2lzfx640hig0720fw7j98yt',
    name: 'GPA Video',
    organization: 'Department of State',
  },
  {
    id: 'ck2lzfx650hih0720mpgplsqr',
    name: 'U.S. Speakers Program',
    organization: 'Department of State',
  },
  {
    id: 'ck2lzfx6f0hk607209lofxuzd',
    name: 'American Spaces',
    organization: 'Department of State',
  },
  {
    id: 'ck2lzfx6f0hk707205r3a5xwk',
    name: 'GPA Media Strategy',
    organization: 'Department of State',
  },
  {
    id: 'ck2lzfx6p0hkd0720h05lurvx',
    name: 'ShareAmerica',
    organization: 'Department of State',
  },
  {
    id: 'ck2lzfx6p0hke0720t6zw8jde',
    name: 'YLAI',
    organization: 'Department of State',
  },
  {
    id: 'ck2lzfx6r0hkg07201iym6ckg',
    name: 'ECA',
    organization: 'Department of State',
  },
  {
    id: 'ck2lzfx6u0hkj0720f8n8mtda',
    name: 'GPA Editorial & Design',
    organization: 'Department of State',
  },
  {
    id: 'ck2lzfx6w0hkk07205vkfqtdk',
    name: 'VOA Editorials',
    organization: 'Department of State',
  },
  {
    id: 'ck2lzfx710hkn0720tog9i53x',
    name: 'Global Engagement Center',
    organization: 'Department of State',
  },
  {
    id: 'ck2qgfbke0ubc07209xmmjua2',
    name: 'GPA Front Office',
    organization: 'Department of State',
  },
  {
    id: 'ck2qgfbku0ubh0720iwhkvuyn',
    name: 'GPA Press Office',
    organization: 'Department of State',
  },
  {
    id: 'ck5cvpjdf01kq0720i4ovjo49',
    name: 'U.S. Missions',
    organization: 'Department of State',
  },
];

export const users = [
  {
    id: 'ck2m042xo0rnp0720nb4gxjix',
    firstName: 'Joe',
    lastName: 'Schmoe',
    email: 'schmoej@america.gov',
    jobTitle: '',
    country: 'United States',
    city: 'Washington, DC',
    howHeard: '',
    permissions: ['EDITOR'],
  },
  {
    id: 'ck2m93ks81ks9akldi19skdk2k',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'doej@america.gov',
    jobTitle: '',
    country: 'United States',
    city: 'Washington, DC',
    howHeard: '',
    permissions: ['ADMIN'],
  },
];

export const categories = [
  {
    id: 'ck2lzgu1c0re307202dlrnue2',
    translations: [
      {
        id: 'ck2lzfxab0hls0720o2sjmoqw',
        name: 'about america',
        language: languages.english,
      },
      {
        id: 'ck2lzfxc90hm60720onv6tbro',
        name: 'Amérique',
        language: languages.french,
      },
    ],
  },
  {
    id: 'ck2lzgu1c0re40720g36mhagr',
    translations: [
      {
        id: 'ck2lzfxhj0hnq0720ea5fakmi',
        name: 'arts & culture',
        language: languages.english,
      },
      {
        id: 'ck2lzfxj90ho40720w9yrade3',
        name: 'Arts et culture',
        language: languages.french,
      },
    ],
  },
];

export const tags = [
  {
    id: 'ck2lzgu1i0rei07206gvy1ygg',
    translations: [
      {
        id: 'ck2lzfzwr0iey0720hrigffxo',
        name: 'american culture',
        language: languages.english,
      },
      {
        id: 'ck2lzfzxz0ifc0720ufzpx34l',
        name: 'Culture américaine',
        language: languages.french,
      },
    ],
  },
  {
    id: 'ck2lzgu1i0rej0720evrgjbyb',
    translations: [
      {
        id: 'ck2lzg03a0igw0720t5c0s2r2',
        name: 'english learning',
        language: languages.english,
      },
      {
        id: 'ck2lzg04f0iha0720zkvmiruy',
        name: 'Anglais langue étrangère',
        language: languages.french,
      },
    ],
  },
];

export const bureaus = [
  {
    id: 'ck5cvpjcu01k80720d2eouy43',
    name: 'Bureau of African Affairs',
    abbr: 'AF',
    offices: [],
    isBureau: true
  },
  {
    id: 'ck5cvpjcv01k90720vvw2imhn',
    name: 'Bureau of Budget and Planning',
    abbr: 'BP',
    offices: [],
    isBureau: true
  },
  {
    id: 'ck5cvpjcv01ka0720kruynq52',
    name: 'Bureau of Consular Affairs',
    abbr: 'CA',
    offices: [],
    isBureau: true
  },
];

export const graphicStyles = [
  {
    id: '123',
    name: 'graphic-style-1',
  },
  {
    id: '456',
    name: 'graphic-style-2',
  },
];

export const socialPlatforms = [
  {
    id: 'tw382',
    name: 'twitter',
  },
  {
    id: 'ins3827',
    name: 'instagram',
  },
];

export const graphicProject = {
  id: 'ck8en7r8x0b7007652jpf9a59',
  createdAt: '2020-03-30T15:44:20.145Z',
  updatedAt: '2020-04-13T14:54:40.647Z',
  publishedAt: '2020-03-30T15:44:51.511Z',
  title: 'Coffee Growers',
  type: 'SOCIAL_MEDIA',
  copyright: 'COPYRIGHT',
  alt: '',
  descPublic: {
    visibility: 'PUBLIC',
    content: 'Public description',
  },
  descInternal: {
    visibility: 'INTERNAL',
    content: 'Internal description',
  },
  assetPath: 'graphic/2020/03/commons.america.gov_ck8enbkxs0bdy076501iy0akv',
  status: 'PUBLISHED',
  visibility: 'PUBLIC',
  author: {
    id: 'ck8embiwq0b1n0765ps892v3n',
    email: 'reganta@america.gov',
    firstName: 'Terri',
    lastName: 'Regan',
  },
  team: teams[0],
  images: [
    {
      id: 'ck8en85go0b820765gcv0kgrx',
      createdAt: '2020-03-30T15:44:38.502Z',
      updatedAt: '2020-03-30T15:44:38.502Z',
      visibility: 'PUBLIC',
      language: languages.english,
      url:
               '2020/03/commons.america.gov_ck8en7r8x0b7007652jpf9a59/CAPTIONS_Made_in_America_ENGLISH_Output.srt',
      signedUrl: 'https://signedurl.com',
      filename: 'coffee.jpg',
      filetype: 'image/jpeg',
      filesize: 3193,
      use: { id: 'a32asd', name: 'mock image use' },
      style: graphicStyles[0],
      social: socialPlatforms,
    },
  ],
  supportFiles: [
    {
      id: 'ck8en85go0b820765gcv0kgrx',
      createdAt: '2020-03-30T15:44:38.502Z',
      updatedAt: '2020-03-30T15:44:38.502Z',
      language: languages.english,
      url:
               '2020/03/commons.america.gov_ck8en7r8x0b7007652jpf9a59/CAPTIONS_Made_in_America_ENGLISH_Output.srt',
      signedUrl: 'https://signedurl.com',
      filename: 'CAPTIONS Made in America ENGLISH_Output.srt',
      filetype: 'application/x-subrip',
      filesize: 3193,
      visibility: 'PUBLIC',
      use: { id: '3823', name: 'srt' },
    },
  ],
  categories: [categories[0]],
  tags: [tags[0]],
};

export const countries = [
  {
    id: 'ck6krp96x3f3n0720q1289gee',
    name: 'Angola',
    abbr: 'AF',
  },
  {
    id: 'ck6krp9773f420720i7aesohq',
    name: 'Benin',
    abbr: 'AF',
  },
  {
    id: 'ck6krp9723f3x07209et0evkp',
    name: 'Australia',
    abbr: 'EAP',
  },
  {
    id: 'ck6krp97d3f4a0720zpndfxd7',
    name: 'Brunei',
    abbr: 'EAP',
  },
];

export const regions = [
  {
    id: 'ck6krp96g3f3c0720c1w09bx1',
    name: 'Bureau of African Affairs',
    abbr: 'AF',
  },
  {
    id: 'ck6krp96o3f3g0720w7whw2pw',
    name: 'Bureau of East Asian and Pacific Affairs',
    abbr: 'EAP',
  },
];

export const documentUses = [
  {
    id: 'a8es',
    name: 'document use name',
  },
  {
    id: 'aies',
    name: 'document use name',
  },
];

export const documentConversionFormats = [
  {
    id: '123',
    rawText: 'the content',
    html: '<p>the content</p>',
    markdown: 'the content',
  },
  {
    id: '678',
    rawText: 'the content',
    html: '<p>the content</p>',
    markdown: 'the content',
  },
];

export const documentFile = {
  id: 'ck8k3zcoy102p0720k0xph2bv',
  createdAt: '2020-03-15T13:01:01.906Z',
  updatedAt: '2020-03-15T13:01:01.906Z',
  publishedAt: '2020-03-15T13:01:01.906Z',
  title: 'mock string value',
  language: languages.mockLanguage,
  filetype: 'mock string value',
  filename: 'mock string value',
  filesize: 25555,
  status: 'PUBLISHED',
  excerpt: '<p>the excerpt</p>',
  content: {
    id: '123',
    rawText: 'the content',
    html: '<p>the content</p>',
    markdown: 'the content',
  },
  image: [
    {
      id: 'image-id-28uid',
      createdAt: '2020-03-15T13:01:01.906Z',
      updatedAt: '2020-03-15T13:01:01.906Z',
      filename: 'mock string value',
      filetype: 'mock string value',
      filesize: 25555,
      visibility: 'INTERNAL',
      use: { id: 'a32asd', name: 'mock image use' },
      url: 'mock string value',
      signedUrl: 'https://signedurl.com',
      social: [socialPlatforms[0]],
      style: graphicStyles[0],
      language: languages.english,
    },
  ],
  url: 'mock string value',
  signedUrl: 'https://signedurl.com',
  visibility: 'INTERNAL',
  use: documentUses[0],
  bureaus: [bureaus[0]],
  countries: [
    {
      id: 'ck6krp96x3f3n0720q1289gee',
      name: 'Angola',
      abbr: 'AF',
      region: {
        id: 'ck6krp96g3f3c0720c1w09bx1',
        name: 'Bureau of African Affairs',
        abbr: 'AF',
      },
    },
  ],
};
