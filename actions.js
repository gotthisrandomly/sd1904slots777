import { HttpError } from 'wasp/server'

export const deposit = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const user = await context.entities.User.findUnique({
    where: { id: context.user.id }
  });

  const updatedUser = await context.entities.User.update({
    where: { id: context.user.id },
    data: { balance: user.balance + args.amount }
  });

  await context.entities.Transaction.create({
    data: {
      amount: args.amount,
      userId: context.user.id
    }
  });

  return updatedUser;
}

export const withdraw = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const user = await context.entities.User.findUnique({
    where: { id: context.user.id }
  });

  if (user.balance < args.amount) { throw new HttpError(400, 'Insufficient balance') };

  const updatedUser = await context.entities.User.update({
    where: { id: context.user.id },
    data: { balance: { decrement: args.amount } }
  });

  const newTransaction = await context.entities.Transaction.create({
    data: {
      amount: args.amount,
      userId: context.user.id
    }
  });

  return updatedUser;
}

export const play = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const user = await context.entities.User.findUnique({
    where: { id: context.user.id }
  });

  if (args.betAmount > user.balance) { throw new HttpError(400, 'Insufficient balance') };

  const result = Math.random() < 0.97; // 97% return to player odds.
  const newBalance = user.balance + (result ? args.betAmount : -args.betAmount);

  const newPlay = await context.entities.Play.create({
    data: {
      amount: args.betAmount,
      win: result,
      userId: context.user.id
    }
  });

  await context.entities.User.update({
    where: { id: context.user.id },
    data: { balance: newBalance }
  });

  return newPlay;
}

export const adminApproveWithdrawal = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  const transaction = await context.entities.Transaction.findUnique({
    where: { id: args.id }
  });
  return context.entities.Transaction.update({
    where: { id: args.id },
    data: { status: 'approved' }
  });
}