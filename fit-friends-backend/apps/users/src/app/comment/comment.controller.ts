import { Body, Controller, Post, Get, Param, UseGuards, Patch, Request, Query } from '@nestjs/common';
import { fillObject } from '@fit-friends-backend/core';
import { CommentRdo } from './rdo/comment.rdo';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger/dist';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(
    private readonly CommentService: CommentService
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Create new comment',
    summary: 'Create new comment'
  })
  @Post('create')
  async create(
    @Body() dto: CreateCommentDto,
    @Request() req
  ) {
    const newComment = await this.CommentService.create(dto, req.user.email);
    return fillObject(CommentRdo, newComment);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Get some comments',
    summary: 'Get some comments'
  })
  @Get(':trainingId')
  async showComments(
    @Request() req,
    @Param('trainingId', MongoidValidationPipe) trainingId: string,
    @Query() query
    ) {
    const existsComments = await this.CommentService.getSomeComments(req.user.email, trainingId, query.count);
    return fillObject(CommentRdo, existsComments);
  }
}

