import { Controller, Get, Header } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //@Header("content-type", "text/html")
  //@Header("Content-Type", "text/html")
  @Get()
  getHello(): { namec: any } {
    return { namec: "ahmad" };
  }
}
