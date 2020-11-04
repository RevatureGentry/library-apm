import {Book, Review} from "@/types/library";
import {handleAxiosResponse, reviewClient} from "@/plugins/axios";
import {CommentForm} from "@/types/forms";
import { apm } from '@elastic/apm-rum';

export function findReviewsForBook(book: Book): Promise<Array<Review>> {
  const transaction = apm.getCurrentTransaction();
  let span;
  if (transaction) {
    span = transaction.startSpan(`axios$findReviewsForBookWithId${book.id}`, 'fetch');
  }
  return reviewClient.findReviewsForBook(book).then(res => handleAxiosResponse(res, span));
}

export function submitReview(review: Review): Promise<Review> {
  const transaction = apm.getCurrentTransaction();
  let span;
  if (transaction) {
    span = transaction.startSpan('axios$submitReview', 'fetch');
  }
  return reviewClient.submitReview(review).then(res => handleAxiosResponse(res, span));
}

export function submitComment(form: CommentForm): Promise<Review> {
  const transaction = apm.getCurrentTransaction();
  let span;
  if (transaction) {
    span = transaction.startSpan('axios$submitComment', 'fetch');
  }
  return reviewClient.submitComment(form).then(res => handleAxiosResponse(res, span));
}
