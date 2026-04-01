import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getAllSources } from '@/lib/sources';

interface HomeProps {
  groupedSources: {
    section: string;
    sources: {
      name: string;
      displayName: string;
      description: string;
      websiteUrl: string;
    }[];
  }[];
  baseUrl: string;
}

interface SourceCard {
  name: string;
  displayName: string;
  description: string;
  websiteUrl: string;
}

const SECTION_ORDER = ['中国', '香港', '日本', '韩国', '新加坡', '美国', '英国', '法国', '国际'];

const SECTION_FALLBACK: Record<string, string> = {
  abc: '国际',
  bbc: '英国',
  bloomberg: '美国',
  cnbc: '美国',
  cnn: '美国',
  foxnews: '美国',
  ft: '英国',
  futu: '香港',
  kbs: '韩国',
  nhk: '日本',
  zaobao: '新加坡',
};

function sortSections(a: string, b: string): number {
  const indexA = SECTION_ORDER.indexOf(a);
  const indexB = SECTION_ORDER.indexOf(b);
  if (indexA === -1 && indexB === -1) {
    return a.localeCompare(b, 'zh-Hans-CN');
  }
  if (indexA === -1) {
    return 1;
  }
  if (indexB === -1) {
    return -1;
  }
  return indexA - indexB;
}

export default function Home({ groupedSources, baseUrl }: HomeProps) {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <Head>
        <title>RSS Feed Service</title>
        <meta name="description" content="RSS feeds for various news websites" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '10px' }}>
          可用的RSS订阅源（按地区分类）
        </h1>
        {groupedSources.map((group) => (
          <section key={group.section} style={{ marginTop: '28px' }}>
            <h2 style={{ marginBottom: '14px' }}>{group.section}</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {group.sources.map((source) => (
                <li
                  key={source.name}
                  style={{
                    marginBottom: '16px',
                    padding: '15px',
                    border: '1px solid #eaeaea',
                    borderRadius: '5px',
                  }}
                >
                  <h3 style={{ margin: 0 }}>{source.displayName}</h3>
                  <p style={{ margin: '10px 0 0 0' }}>{source.description}</p>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <a
                      href={`/api/rss/${source.name}`}
                      style={{
                        display: 'inline-block',
                        padding: '8px 16px',
                        backgroundColor: '#f8f9fa',
                        color: '#333',
                        textDecoration: 'none',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                      }}
                    >
                      获取RSS源
                    </a>
                    <a
                      href={source.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        padding: '8px 16px',
                        backgroundColor: '#fff',
                        color: '#333',
                        textDecoration: 'none',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                      }}
                    >
                      访问网站
                    </a>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <code style={{ backgroundColor: '#f5f5f5', padding: '4px 8px', borderRadius: '4px' }}>
                      {`${baseUrl}/api/rss/${source.name}`}
                    </code>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>

      <footer style={{ marginTop: '40px', textAlign: 'center', color: '#666' }}>
        <p>RSS Feed Service - 使用Next.js创建</p>
      </footer>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allSources = getAllSources().map((source) => ({
    name: source.name,
    displayName: source.displayName,
    description: source.description,
    websiteUrl: source.websiteUrl,
    section: source.section || SECTION_FALLBACK[source.name] || '国际',
  }));
  const groupedMap = new Map<string, SourceCard[]>();

  allSources.forEach((source) => {
    const section = source.section;
    const currentGroup = groupedMap.get(section) || [];
    currentGroup.push({
      name: source.name,
      displayName: source.displayName,
      description: source.description,
      websiteUrl: source.websiteUrl,
    });
    groupedMap.set(section, currentGroup);
  });

  const groupedSources = Array.from(groupedMap.entries())
    .map(([section, sources]) => ({
      section,
      sources: sources.sort((a, b) => a.displayName.localeCompare(b.displayName, 'zh-Hans-CN')),
    }))
    .sort((a, b) => sortSections(a.section, b.section));

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com';

  return {
    props: {
      groupedSources,
      baseUrl,
    },
    revalidate: 3600,
  };
};
