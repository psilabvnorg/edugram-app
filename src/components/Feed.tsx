import type { Category } from '@/types';
import { posts as allPosts } from '@/data/mockData';
import { Post } from './Post';
import type { User } from '@/types';

interface FeedProps {
  category: Category;
  onUserClick: (user: User) => void;
}

export function Feed({ category, onUserClick }: FeedProps) {
  const filteredPosts = category === 'All' 
    ? allPosts 
    : allPosts.filter(post => post.category === category);

  return (
    <div className="space-y-6">
      {/* Category Header */}
      {category !== 'All' && (
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-lg">{getCategoryEmoji(category)}</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#0B0D10]">{category}</h2>
            <p className="text-sm text-gray-500">{filteredPosts.length} posts</p>
          </div>
        </div>
      )}

      {/* Posts */}
      {filteredPosts.map((post) => (
        <Post 
          key={post.id} 
          post={post} 
          onUserClick={onUserClick}
        />
      ))}

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-3xl">📚</span>
          </div>
          <h3 className="text-lg font-medium text-[#0B0D10] mb-2">No posts yet</h3>
          <p className="text-sm text-gray-500">Be the first to share in this category!</p>
        </div>
      )}

      {/* Load More */}
      {filteredPosts.length > 0 && (
        <div className="text-center py-8">
          <button className="px-6 py-2.5 bg-white border border-[#E5E7EB] rounded-full text-sm font-medium text-[#0B0D10] hover:bg-gray-50 transition-colors">
            Load more posts
          </button>
        </div>
      )}
    </div>
  );
}

function getCategoryEmoji(category: Category): string {
  const emojis: Record<string, string> = {
    'IELTS': '📖',
    'Marketing': '📈',
    'Finance': '💰',
    'MBA': '🎓',
    'Design': '🎨',
    'Leadership': '💡',
  };
  return emojis[category] || '📚';
}
