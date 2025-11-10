export interface ISeo {
  title: string;
  description: string;
  keywords: string;
  url: string;
  image: string;
  type: string; // Для Open Graph, например, 'website' или 'article'
}
