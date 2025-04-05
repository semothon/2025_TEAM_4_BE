import { Module } from "@nestjs/common";
import { PrismaService } from "../common";
import { MatchRequestController } from "./controller/match-request.controller";
import { MatchRequestService } from "./service/match-request.service";

@Module({
    controllers: [MatchRequestController],
    providers: [MatchRequestService, PrismaService]
})
export class MatchRequestModule {}