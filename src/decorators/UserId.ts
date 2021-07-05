import { createParamDecorator } from "@nestjs/common";

export const UserId = createParamDecorator((_data, req) => {
    return req.args[0].user.id;
});
