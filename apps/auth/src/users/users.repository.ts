import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

@Injectable()
export class UsersRepository {

    private tableName: string;
    private db: DynamoDBClient;

    constructor() {
        this.tableName = 'oink-users';
        this.db = new DynamoDBClient({
            region: 'eu-central-1'
        });
    }


    async getUserByEmail(email: string) {
        let user: object;
       
        try {
            const command = new GetItemCommand({
                TableName: this.tableName,
                Key: {
                    PK: { S: 'PK#1' },
                    SK: { S: 'SK#1' }
                },
              });

            user = await this.db.send(command);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!user) {
            throw new NotFoundException(`User with email "${email}" not found`);
        }

        return user;
    }
}
