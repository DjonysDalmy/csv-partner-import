import { Request, Response } from "express";
import { execute } from "./service";

const handle = async (request: Request, response: Response): Promise<Response> => {
    const { token } = request.body;
    const { file } = request;

    if(!file){
        return response.status(400).json({error: "Invalid file"});
    };

    try{
        await execute(file, token);

        return response.send();
    }catch(err){
        return response.status(500).json({error: err});
    };
};

export { handle };