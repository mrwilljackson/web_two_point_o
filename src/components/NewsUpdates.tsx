import { useState, useEffect } from 'react';
import { Calendar } from "lucide-react";

interface NewsPost {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  content: string;
}

interface NewsUpdatesProps {
  posts: NewsPost[];
}

const NewsUpdates = ({ posts: initialPosts }: NewsUpdatesProps) => {
  const [posts, setPosts] = useState<NewsPost[]>(initialPosts || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Posts are passed as props, no need to fetch
    if (initialPosts && initialPosts.length > 0) {
      setPosts(initialPosts);
    } else {
      setError('No posts available');
    }
  }, [initialPosts]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getFirstWords = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  const getBlogUrl = (slug: string, date: string) => {
    // Extract year from the post date to match Astro content collection structure
    const year = new Date(date).getFullYear();
    return `/blog/${year}/${slug}`;
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-slate-50 via-blue-50 to-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Calendar className="inline-block mr-2" size={16} />
              PLAYPHYSIO NEWS AND UPDATES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Latest from{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Playphysio
              </span>
            </h2>
          </div>
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <p className="text-gray-600 mt-4">Loading latest news...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-b from-slate-50 via-blue-50 to-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Calendar className="inline-block mr-2" size={16} />
              PLAYPHYSIO NEWS AND UPDATES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Latest from{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Playphysio
              </span>
            </h2>
          </div>
          <div className="text-center">
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 via-blue-50 to-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Calendar className="inline-block mr-2" size={16} />
            PLAYPHYSIO NEWS AND UPDATES
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <Calendar size={16} />
                  <time dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  <a
                    href={getBlogUrl(post.slug, post.date)}
                    className="hover:text-purple-600 transition-colors duration-300"
                  >
                    {post.title}
                  </a>
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {getFirstWords(post.content, 150)}
                </p>
                
                <div className="mt-4">
                  <a
                    href={getBlogUrl(post.slug, post.date)}
                    className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold text-sm transition-colors duration-300"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <a
            href="/blog"
            className="text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-300"
          >
            View All News & Updates →
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewsUpdates;
