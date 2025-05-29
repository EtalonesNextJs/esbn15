
export interface Review {
    image: string;
    _id: string;
    name: string;
    rating: number;
    comment: string;
    createdAt: string;
    userId: string; 
    likes: string;
    dislikes: string;
}
export interface NewsType {
    _id: string;
    title: string;
    image: {
        name: string;
        data: string;
        contentType: string;
    };
    content: string;
    category: string;
    description: string;
  }

export interface Profession {
    name: string;
    experience: string;
  }