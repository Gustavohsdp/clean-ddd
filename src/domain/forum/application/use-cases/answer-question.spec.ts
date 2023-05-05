import { describe, expect, it } from 'vitest'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repositories/answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

const fakeAnswerRepository: AnswerRepository = {
  create: async (answer: Answer) => {},
}

describe('answer question use case', () => {
  it('should be able create an ansers', async () => {
    const AnswerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

    const { content } = await AnswerQuestion.execute({
      content: 'new response',
      instructorId: '1',
      questionId: '1',
    })

    expect(content).toEqual('new response')
  })
})
