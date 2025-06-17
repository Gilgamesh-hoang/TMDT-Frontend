export interface Author {
  id: string;
  fullName: string;
}

export interface AdminCommentResponse {
  id: string;
  productName: string;
  author: Author;
  content: string;
  createdAt: string;
  isDeleted: boolean;
}
export interface CommentResponse {
  id: string;
  productId: string;
  author: Author;
  content: string;
  replies: CommentResponse[];
  depth: number;
  createdAt: string;
  isDeleted: boolean;
}

export interface CommentCreateRequest {
  content: string;
  productId: string;
}

export interface CommentReplyRequest extends CommentCreateRequest {
  parentId: string;
}
export interface CommentUpdateRequest {
  content: string;
  id: string;
}
