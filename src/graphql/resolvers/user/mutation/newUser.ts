import { MutationNewUserArgs } from "@/generated/graphql";
import { IRequestContext } from "@/utils/requestContext";

const newUser =  async (_: unknown, {input}: MutationNewUserArgs, context: IRequestContext) =>
    await context.prisma.users.create({data: {...input}});


export default newUser;