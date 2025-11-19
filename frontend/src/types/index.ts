export interface Report {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  type: 'LOST' | 'FOUND';
  status: 'ACTIVE' | 'RESOLVED';
  imageUrl: string;
  date: string;
  createdAt: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}