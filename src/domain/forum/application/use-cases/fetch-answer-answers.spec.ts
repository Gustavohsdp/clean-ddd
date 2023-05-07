import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswersCommentsRepository } from 'test/repositories/in-memory-answers-comments-repository'
import { describe, it } from 'vitest'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'

let inMemoryAnswersCommentsRepository: InMemoryAnswersCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answers Comments', () => {
  beforeEach(() => {
    inMemoryAnswersCommentsRepository = new InMemoryAnswersCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswersCommentsRepository)
  })

  it('should be able to fetch question comments', async () => {
    for (let i = 1; i <= 3; i++) {
      await inMemoryAnswersCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityID('question-1'),
        }),
      )
    }

    const { answerComments } = await sut.execute({
      answerId: 'question-1',
      page: 1,
    })

    expect(answerComments).toHaveLength(3)
  })

  it('should be able to fetch paginated question comments', async () => {
    for (let i = 1; i <= 25; i++) {
      await inMemoryAnswersCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityID('question-1'),
        }),
      )
    }

    const { answerComments } = await sut.execute({
      answerId: 'question-1',
      page: 2,
    })

    expect(answerComments).toHaveLength(5)
  })
})
