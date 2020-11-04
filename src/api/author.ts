import { authorClient, handleAxiosResponse } from "@/plugins/axios";
import {Author, Book} from "@/types/library";
import { apm } from '@elastic/apm-rum';

export function findAllAuthors(): Promise<Array<Author>> {
  const transaction = apm.getCurrentTransaction();
  let span;
  if (transaction) {
    span = transaction.startSpan('axios$findAllAuthors', 'fetch');
  }
  return authorClient.findAll().then(res => handleAxiosResponse(res, span));
}

export function findBooksForAuthor(author: Author): Promise<Array<Book>> {
  const transaction = apm.getCurrentTransaction();
  let span;
  if (transaction) {
    span = transaction.startSpan('axios$findAllBooksForAuthor', 'fetch');
  }
  return authorClient.findBooksForAuthor(author).then(res => handleAxiosResponse(res, span));
}
