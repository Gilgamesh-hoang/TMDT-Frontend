export interface Author {
  id: string;
  fullName: string;
}
export interface CommentResponse {
  id: string;
  productId: string;
  author: Author;
  content: string;
  replies: CommentResponse[];
  depth: number;
  createdAt: string;
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
