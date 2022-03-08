import { IRequestContext } from "@/utils/requestContext";

const userList = async (_: unknown, __: undefined, context: IRequestContext) => await context.prisma.users.findMany()

export default userList