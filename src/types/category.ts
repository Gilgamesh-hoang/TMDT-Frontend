export interface Category {
  id: string;
  name: string;
  description: string;
  isDeleted: boolean;
  createdAt: string;
}

export interface CategoryCreateRequest {
  name: string;
  description?: string;
}

export interface CategoryUpdateRequest extends CategoryCreateRequest {
  id: string;
}
