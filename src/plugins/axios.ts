import Axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {Token} from "@/types/auth";
import {Author, Book, Review} from "@/types/library";
import {CommentForm} from "@/types/forms";

const gatewayUrl = 'http://34.73.134.35/gateway';

const options: AxiosRequestConfig = {
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': `${window.location.origin}`,
    'Access-Control-Allow-Headers': ['Authorization', 'Accept', 'Content-Type', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Method', 'Access-Control-Allow-Headers', 'traceparent']
  },
  baseURL: gatewayUrl
}

const _axios: AxiosInstance = Axios.create(options);

export const setBearerHeader = (token: Token): void => {
  _axios.defaults.headers['Authorization'] = `Bearer ${token.idToken}`;
}

export function handleAxiosResponse<T>(res: AxiosResponse<T>, span: Span | null = null): Promise<T> {
  if (res.status >= 200 && res.status <= 299) {
    return Promise.resolve(res.data).then(data => {
      if (span) {
        span.end();
      }
      return data;
    });
  }
  const error = { status: res.status, data: res.data };
  console.error('Failed to fetch: ' + JSON.stringify(error));
  return Promise.reject(error).then(err => {
    if (span) {
      span.end();
    }
    return err;
  });
}

export const authorClient = {
  findAll: (): Promise<AxiosResponse<Array<Author>>> => _axios.get('/author'),
  findBooksForAuthor: (author: Author): Promise<AxiosResponse<Array<Book>>> => _axios.get(`/author/${author.id}/books`)
}

export const reviewClient = {
  findReviewsForBook: (book: Book): Promise<AxiosResponse<Array<Review>>> => _axios.get(`/reviews/${book.id}`),
  submitReview: (review: Review): Promise<AxiosResponse<Review>> => _axios.post('/reviews', review),
  submitComment: (form: CommentForm): Promise<AxiosResponse<Review>> => _axios.post('/reviews/comment', form)
}
