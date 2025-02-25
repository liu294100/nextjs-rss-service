import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getAllSources } from '@/lib/sources';
import { SourceProcessor } from '@/lib/sources/types';

interface HomeProps {
  sources: {
    name: string;
    displayName: string;
    description: string;
    websiteUrl: string;
  }[];
  baseUrl: string;
}

export default function Home({ sources, baseUrl }: HomeProps) {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Head>
        <title>RSS Feed Service</title>
        <meta name="description" content="RSS feeds for various news websites" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '10px' }}>
          可用的RSS订阅源
        </h1>
        
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {sources.map((source) => (
            <li 
              key={source.name} 
              style={{ 
                marginBottom: '20px', 
                padding: '15px', 
                border: '1px solid #eaeaea', 
                borderRadius: '5px'
              }}
            >
              <h2>{source.displayName}</h2>
              <p>{source.description}</p>
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
      </main>

      <footer style={{ marginTop: '40px', textAlign: 'center', color: '#666' }}>
        <p>RSS Feed Service - 使用Next.js创建</p>
      </footer>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // 获取所有源
  const sources = getAllSources().map(source => ({
    name: source.name,
    displayName: source.displayName,
    description: source.description,
    websiteUrl: source.websiteUrl,
  }));

  // 使用环境变量或默认URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com';

  return {
    props: {
      sources,
      baseUrl,
    },
    // 每小时重新生成页面
    revalidate: 3600,
  };
};