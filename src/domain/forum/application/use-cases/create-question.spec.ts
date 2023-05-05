import { describe, expect, it } from 'vitest'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionRepository: QuestionsRepository = {
  create: async (question: Question) => {},
}

describe('question use case', () => {
  it('should be able create an question', async () => {
    const createQuestion = new CreateQuestionUseCase(fakeQuestionRepository)

    const { question } = await createQuestion.execute({
      authorId: '1',
      title: 'New question',
      content: 'content question',
    })

    expect(question.content).toEqual('content question')
    expect(question.id).toBeTruthy()
  })
})
