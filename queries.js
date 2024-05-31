import { HttpError } from 'wasp/server'

export const getUser = async ({ username }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const user = await context.entities.User.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      balance: true,
      transactions: true,
      plays: true
    }
  });

  if (!user) throw new HttpError(404, 'No user with username ' + username);

  return user;
}

export const getTransactions = async ({ userId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Transaction.findMany({
    where: { userId }
  });
}

export const getPlays = async ({ userId }, context) => {
  if (!context.user) { throw new HttpError(401) }
  return context.entities.Play.findMany({ where: { userId } })
}