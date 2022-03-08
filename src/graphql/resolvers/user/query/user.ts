import { QueryUserArgs } from "@/generated/graphql";
import { IRequestContext } from "@/utils/requestContext";

const user =  async (_: unknown, {input}: QueryUserArgs, context: IRequestContext) => await context.prisma.users.findUnique({where: {id: input.id}});

export default user;