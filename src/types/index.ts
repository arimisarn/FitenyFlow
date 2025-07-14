export interface ReformulationStats {
  french: number;
  english: number;
  total: number;
}

export interface ReformulationRequest {
  text: string;
  language: 'french' | 'english';
}

export interface ReformulationResponse {
  reformulated: string;
  original: string;
  language: 'french' | 'english';
}