import { Controller, Get, UseGuards, Query, Req } from '@nestjs/common';
import { ArticleService } from './article.service';
import { LoginGuard } from 'src/user/login.guard';
import { Request } from 'express';

@Controller('article')
@UseGuards(LoginGuard)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Get('view')
  view(@Query('id') id: number, @Req() req: Request) {
    return this.articleService.view(id, req.user.id);
  }

  @Get('findAll')
  findAll() {
    return this.articleService.findAll();
  }
}
