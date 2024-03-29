import { Answer, AnswerProps } from '@/domain/forum/enterprise/entities/answer'
import { faker } from '@faker-js/faker'
import { UniqueEntityID } from './../../src/core/entities/unique-entity-id'

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityID,
) {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answer
}
