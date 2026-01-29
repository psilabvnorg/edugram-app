import { useState } from 'react';
import type { Post as PostType, User, Comment } from '@/types';
import { Heart, MessageCircle, Bookmark, Share2, MoreHorizontal, Verified, Send } from 'lucide-react';
import { formatNumber } from '@/data/mockData';
import { Input } from '@/components/ui/input';

interface PostProps {
  post: PostType;
  onUserClick: (user: User) => void;
}

export function Post({ post, onUserClick }: PostProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [isSaved, setIsSaved] = useState(post.isSaved || false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `new-${Date.now()}`,
      userId: 'current',
      user: {
        id: 'current',
        name: 'You',
        username: 'you',
        avatar: '/images/instructors/steve-jobs.jpg',
        bio: '',
        category: 'All',
        followers: 0,
        following: 0,
        posts: 0,
        isVerified: false,
      },
      content: newComment,
      likes: 0,
      createdAt: 'Just now',
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
  };

  return (
    <article className="bg-white rounded-3xl border border-[#E5E7EB] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button 
          onClick={() => onUserClick(post.user)}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="relative">
            <img
              src={post.user.avatar}
              alt={post.user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-purple-600 rounded-full border-2 border-white" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm text-[#0B0D10]">{post.user.name}</span>
              {post.user.isVerified && (
                <Verified className="w-4 h-4 text-blue-500 fill-blue-500" />
              )}
            </div>
            <span className="text-xs text-gray-500">{post.user.username}</span>
          </div>
        </button>
        
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full">
            {post.category}
          </span>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Image */}
      {post.image && (
        <div className="relative aspect-video bg-gray-100">
          <img
            src={post.image}
            alt="Post content"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* Actions */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLike}
              className="flex items-center gap-1.5 group"
            >
              <Heart 
                className={`w-6 h-6 transition-all ${
                  isLiked 
                    ? 'fill-red-500 text-red-500 scale-110' 
                    : 'text-[#0B0D10] group-hover:text-red-400'
                }`} 
              />
            </button>
            <button 
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-1.5 group"
            >
              <MessageCircle className="w-6 h-6 text-[#0B0D10] group-hover:text-purple-600 transition-colors" />
            </button>
            <button className="flex items-center gap-1.5 group">
              <Share2 className="w-6 h-6 text-[#0B0D10] group-hover:text-purple-600 transition-colors" />
            </button>
          </div>
          <button onClick={handleSave}>
            <Bookmark 
              className={`w-6 h-6 transition-all ${
                isSaved 
                  ? 'fill-purple-600 text-purple-600' 
                  : 'text-[#0B0D10] hover:text-purple-600'
              }`} 
            />
          </button>
        </div>

        {/* Likes Count */}
        <p className="text-sm font-semibold text-[#0B0D10] mb-2">
          {formatNumber(likesCount)} likes
        </p>

        {/* Caption */}
        <div className="mb-3">
          <p className="text-sm text-[#0B0D10] whitespace-pre-line">
            <span 
              onClick={() => onUserClick(post.user)}
              className="font-semibold cursor-pointer hover:underline"
            >
              {post.user.username}
            </span>{' '}
            {post.content}
          </p>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="text-sm text-purple-600 hover:underline cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">
          {post.createdAt}
        </p>

        {/* Comments Preview */}
        {!showComments && comments.length > 0 && (
          <button 
            onClick={() => setShowComments(true)}
            className="text-sm text-gray-500 hover:text-[#0B0D10] transition-colors"
          >
            View all {comments.length} comments
          </button>
        )}

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
            <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <img
                    src={comment.user.avatar}
                    alt={comment.user.name}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span 
                        onClick={() => onUserClick(comment.user)}
                        className="text-sm font-semibold text-[#0B0D10] cursor-pointer hover:underline"
                      >
                        {comment.user.name}
                      </span>
                      {comment.user.isVerified && (
                        <Verified className="w-3 h-3 text-blue-500 fill-blue-500" />
                      )}
                      <span className="text-xs text-gray-400">{comment.createdAt}</span>
                    </div>
                    <p className="text-sm text-[#0B0D10]">{comment.content}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <button className="text-xs text-gray-500 hover:text-[#0B0D10]">
                        Reply
                      </button>
                      <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#0B0D10]">
                        <Heart className="w-3 h-3" />
                        {comment.likes > 0 && comment.likes}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <form onSubmit={handleAddComment} className="flex gap-3">
              <Input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 bg-gray-50 border-0 rounded-full px-4 text-sm focus:ring-2 focus:ring-purple-500"
              />
              <button 
                type="submit"
                disabled={!newComment.trim()}
                className="p-2 text-purple-600 hover:bg-purple-50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </article>
  );
}
