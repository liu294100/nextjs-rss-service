import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useMemo, useState } from 'react';
import { getAllSources } from '@/lib/sources';

interface SourceCard {
  name: string;
  displayName: string;
  description: string;
  websiteUrl: string;
  section: string;
}

interface HomeProps {
  sources: SourceCard[];
  baseUrl: string;
}

const SECTION_ORDER = ['中国', '香港', '日本', '韩国', '新加坡', '马来西亚', '美国', '英国', '法国', '国际'];

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

function formatXml(xml: string): string {
  const withBreaks = xml.replace(/(>)(<)(\/*)/g, '$1\n$2$3');
  let indentLevel = 0;
  return withBreaks
    .split('\n')
    .map((line) => {
      const trimmed = line.trim();
      if (trimmed.match(/^<\/.+/)) {
        indentLevel = Math.max(indentLevel - 1, 0);
      }
      const formattedLine = `${'  '.repeat(indentLevel)}${trimmed}`;
      if (trimmed.match(/^<[^!?/][^>]*[^/]>$/)) {
        indentLevel += 1;
      }
      return formattedLine;
    })
    .join('\n');
}

export default function Home({ sources, baseUrl }: HomeProps) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedSection, setSelectedSection] = useState('全部');
  const [previewSourceName, setPreviewSourceName] = useState('');
  const [previewXml, setPreviewXml] = useState('');
  const [previewError, setPreviewError] = useState('');
  const [previewLoading, setPreviewLoading] = useState(false);

  const sections = useMemo(() => {
    const uniqueSections = Array.from(new Set(sources.map((source) => source.section)));
    return ['全部', ...uniqueSections.sort(sortSections)];
  }, [sources]);

  const filteredSources = useMemo(() => {
    const normalizedKeyword = searchKeyword.trim().toLowerCase();
    return sources.filter((source) => {
      const sectionMatch = selectedSection === '全部' || source.section === selectedSection;
      const keywordMatch =
        normalizedKeyword.length === 0 ||
        source.displayName.toLowerCase().includes(normalizedKeyword) ||
        source.description.toLowerCase().includes(normalizedKeyword) ||
        source.name.toLowerCase().includes(normalizedKeyword) ||
        source.section.toLowerCase().includes(normalizedKeyword);
      return sectionMatch && keywordMatch;
    });
  }, [searchKeyword, selectedSection, sources]);

  const groupedSources = useMemo(() => {
    const groups = new Map<string, SourceCard[]>();
    filteredSources.forEach((source) => {
      const current = groups.get(source.section) || [];
      current.push(source);
      groups.set(source.section, current);
    });
    return Array.from(groups.entries())
      .map(([section, sectionSources]) => ({
        section,
        sources: sectionSources.sort((a, b) => a.displayName.localeCompare(b.displayName, 'zh-Hans-CN')),
      }))
      .sort((a, b) => sortSections(a.section, b.section));
  }, [filteredSources]);

  const handlePreview = async (source: SourceCard) => {
    try {
      setPreviewSourceName(source.displayName);
      setPreviewError('');
      setPreviewXml('');
      setPreviewLoading(true);
      const response = await fetch(`/api/rss/${source.name}`, {
        headers: {
          Accept: 'application/rss+xml, application/xml;q=0.9, text/xml;q=0.8, */*;q=0.1',
        },
      });
      if (!response.ok) {
        throw new Error(`预览失败，状态码 ${response.status}`);
      }
      const contentBuffer = await response.arrayBuffer();
      const xmlText = new TextDecoder('utf-8').decode(contentBuffer);
      setPreviewXml(formatXml(xmlText));
    } catch (error) {
      setPreviewError(error instanceof Error ? error.message : '预览失败，请稍后重试');
    } finally {
      setPreviewLoading(false);
    }
  };

  const closePreview = () => {
    setPreviewSourceName('');
    setPreviewXml('');
    setPreviewError('');
    setPreviewLoading(false);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at 0% 0%, #1e3a8a 0%, transparent 35%), radial-gradient(circle at 100% 0%, #7c3aed 0%, transparent 40%), #070b1a',
        color: '#f8fafc',
        padding: '28px 16px 48px',
      }}
    >
      <Head>
        <title>RSS Feed Service</title>
        <meta name="description" content="RSS feeds for various news websites" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ maxWidth: '1120px', margin: '0 auto' }}>
        <section
          style={{
            borderRadius: '18px',
            padding: '24px',
            background: 'linear-gradient(135deg, rgba(37,99,235,0.35), rgba(139,92,246,0.3))',
            border: '1px solid rgba(148,163,184,0.35)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.3)',
          }}
        >
          <h1 style={{ margin: 0, fontSize: '30px', lineHeight: 1.2 }}>可用的 RSS 订阅源</h1>
          <p style={{ margin: '10px 0 0 0', color: '#dbeafe' }}>按地区分类、支持实时筛选和全文搜索</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '14px' }}>
            <span
              style={{
                background: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(148,163,184,0.35)',
                borderRadius: '999px',
                padding: '6px 12px',
                fontSize: '13px',
              }}
            >
              媒体总数 {sources.length}
            </span>
            <span
              style={{
                background: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(148,163,184,0.35)',
                borderRadius: '999px',
                padding: '6px 12px',
                fontSize: '13px',
              }}
            >
              筛选后 {filteredSources.length}
            </span>
          </div>
        </section>

        <section
          style={{
            marginTop: '20px',
            borderRadius: '16px',
            padding: '16px',
            background: 'rgba(15, 23, 42, 0.55)',
            border: '1px solid rgba(148,163,184,0.3)',
            backdropFilter: 'blur(12px)',
            display: 'grid',
            gridTemplateColumns: 'minmax(260px, 1fr) minmax(180px, 220px)',
            gap: '12px',
          }}
        >
          <input
            value={searchKeyword}
            onChange={(event) => setSearchKeyword(event.target.value)}
            placeholder="搜索媒体名称、描述、地区或代号..."
            style={{
              width: '100%',
              borderRadius: '10px',
              border: '1px solid rgba(148,163,184,0.4)',
              backgroundColor: 'rgba(2, 6, 23, 0.7)',
              color: '#f8fafc',
              fontSize: '14px',
              padding: '12px 14px',
              outline: 'none',
            }}
          />
          <select
            value={selectedSection}
            onChange={(event) => setSelectedSection(event.target.value)}
            style={{
              width: '100%',
              borderRadius: '10px',
              border: '1px solid rgba(148,163,184,0.4)',
              backgroundColor: 'rgba(2, 6, 23, 0.75)',
              color: '#f8fafc',
              fontSize: '14px',
              padding: '12px 14px',
              outline: 'none',
            }}
          >
            {sections.map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        </section>

        {groupedSources.map((group) => (
          <section key={group.section} style={{ marginTop: '22px' }}>
            <h2 style={{ marginBottom: '12px', fontSize: '20px' }}>{group.section}</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '12px',
              }}
            >
              {group.sources.map((source) => (
                <article
                  key={source.name}
                  style={{
                    borderRadius: '14px',
                    padding: '16px',
                    border: '1px solid rgba(148,163,184,0.3)',
                    background:
                      'linear-gradient(160deg, rgba(15,23,42,0.78), rgba(15,23,42,0.52) 52%, rgba(30,41,59,0.78))',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.24)',
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: '18px' }}>{source.displayName}</h3>
                  <p style={{ margin: '8px 0 0 0', color: '#cbd5e1', fontSize: '14px', minHeight: '38px' }}>
                    {source.description}
                  </p>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                    <a
                      href={`/api/rss/${source.name}`}
                      style={{
                        display: 'inline-block',
                        borderRadius: '999px',
                        padding: '8px 12px',
                        backgroundColor: '#2563eb',
                        color: '#eff6ff',
                        textDecoration: 'none',
                        fontSize: '13px',
                        fontWeight: 600,
                      }}
                    >
                      获取 RSS
                    </a>
                    <a
                      href={source.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        borderRadius: '999px',
                        padding: '8px 12px',
                        backgroundColor: 'rgba(15,23,42,0.75)',
                        border: '1px solid rgba(148,163,184,0.45)',
                        color: '#e2e8f0',
                        textDecoration: 'none',
                        fontSize: '13px',
                        fontWeight: 600,
                      }}
                    >
                      访问网站
                    </a>
                    <button
                      type="button"
                      onClick={() => handlePreview(source)}
                      style={{
                        borderRadius: '999px',
                        padding: '8px 12px',
                        backgroundColor: 'rgba(56,189,248,0.2)',
                        border: '1px solid rgba(56,189,248,0.65)',
                        color: '#e0f2fe',
                        textDecoration: 'none',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      RSS 预览
                    </button>
                  </div>
                  <div style={{ marginTop: '12px' }}>
                    <code
                      style={{
                        display: 'block',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(2,6,23,0.75)',
                        border: '1px solid rgba(148,163,184,0.3)',
                        color: '#93c5fd',
                        padding: '8px 10px',
                        fontSize: '12px',
                        overflowX: 'auto',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {`${baseUrl}/api/rss/${source.name}`}
                    </code>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

        {filteredSources.length === 0 && (
          <section
            style={{
              marginTop: '24px',
              borderRadius: '14px',
              padding: '22px',
              textAlign: 'center',
              border: '1px solid rgba(148,163,184,0.3)',
              backgroundColor: 'rgba(15,23,42,0.55)',
              color: '#cbd5e1',
            }}
          >
            没有匹配的媒体源，请尝试更换筛选条件或关键词
          </section>
        )}
      </main>
      {previewSourceName.length > 0 && (
        <div
          onClick={closePreview}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(2,6,23,0.74)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '18px',
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: 'min(1000px, 96vw)',
              maxHeight: '88vh',
              borderRadius: '16px',
              border: '1px solid rgba(148,163,184,0.35)',
              background: 'linear-gradient(160deg, rgba(15,23,42,0.98), rgba(2,6,23,0.96))',
              boxShadow: '0 18px 60px rgba(0,0,0,0.45)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                borderBottom: '1px solid rgba(148,163,184,0.25)',
              }}
            >
              <strong style={{ fontSize: '16px' }}>{previewSourceName} - RSS 预览</strong>
              <button
                type="button"
                onClick={closePreview}
                style={{
                  borderRadius: '999px',
                  border: '1px solid rgba(148,163,184,0.4)',
                  backgroundColor: 'rgba(15,23,42,0.7)',
                  color: '#e2e8f0',
                  padding: '6px 12px',
                  cursor: 'pointer',
                }}
              >
                关闭
              </button>
            </div>
            <div style={{ padding: '14px 16px', maxHeight: 'calc(88vh - 64px)', overflow: 'auto' }}>
              {previewLoading && <div style={{ color: '#93c5fd' }}>正在加载 RSS XML...</div>}
              {!previewLoading && previewError.length > 0 && <div style={{ color: '#fca5a5' }}>{previewError}</div>}
              {!previewLoading && previewError.length === 0 && previewXml.length > 0 && (
                <pre
                  style={{
                    margin: 0,
                    fontSize: '12px',
                    lineHeight: 1.5,
                    color: '#e2e8f0',
                    whiteSpace: 'pre',
                  }}
                >
                  {previewXml}
                </pre>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const sources = getAllSources()
    .map((source) => ({
      name: source.name,
      displayName: source.displayName,
      description: source.description,
      websiteUrl: source.websiteUrl,
      section: source.section || SECTION_FALLBACK[source.name] || '国际',
    }))
    .sort((a, b) => {
      const sectionDiff = sortSections(a.section, b.section);
      if (sectionDiff !== 0) {
        return sectionDiff;
      }
      return a.displayName.localeCompare(b.displayName, 'zh-Hans-CN');
    });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com';

  return {
    props: {
      sources,
      baseUrl,
    },
    revalidate: 3600,
  };
};
