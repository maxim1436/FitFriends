import { Body, Controller, Post, Get, Param, UseGuards, Patch, Request, Query, Delete } from '@nestjs/common';
import { fillObject } from '@fit-friends-backend/core';
import { UserRdo } from '../auth/rdo/user.rdo';
import { UserService } from './user.service';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger/dist';
import { UpdateUserBalanceDto } from '../auth/dto/update-user-balance.dto';
import { AlertRdo } from '../alert/rdo/alert.rdo';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly UserService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Create new subscriber',
    summary: 'Create new subscriber'
  })
  @Post('subscribe/:coachId')
  async create(
    @Request() req,
    @Param('coachId', MongoidValidationPipe) coachId: string
  ) {
    const newSubscriber = await this.UserService.addSubscriber(req.user.email, coachId);
    return fillObject(UserRdo, newSubscriber);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Get full information about user',
    summary: 'Get full information about user'
  })
  @Get(':id')
  async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.UserService.getUser(id);
    return fillObject(UserRdo, existUser);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Update user',
    summary: 'Update user'
  })
  @Patch('update')
  async update(@Body() dto: UpdateUserDto, @Request() req) {
    const updatedUser = await this.UserService.updateUser(dto, req.user.email);
    return fillObject(UserRdo, updatedUser);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Get some users',
    summary: 'Get some users'
  })
  @Get('')
  async showUsers(
    @Request() req,
    @Query() query
  ) {
    const existsUsers = await this.UserService.getUsers(req.user.email, query.count);
    return fillObject(UserRdo, existsUsers);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Update user balance',
    summary: 'Update user balance'
  })
  @Patch('update-user-balance')
  async updateUserBalance(
    @Body() dto: UpdateUserBalanceDto,
    @Request() req,
    @Query() query
  ) {
    const updateUserBalance = await this.UserService.updateUserBalance(req.user.email, dto, query.type);
    return fillObject(UserRdo, updateUserBalance);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Get full information about alert',
    summary: 'Get full information about alert'
  })
  @Get('alerts/:alertId')
  async getAlert(@Param('alertId', MongoidValidationPipe) alertId: string, @Request() req,) {
    const existAlert = await this.UserService.getAlert(req.user.email, alertId);
    return fillObject(AlertRdo, existAlert);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Get some alerts',
    summary: 'Get some alerts'
  })
  @Get(':id/alerts')
  async showAlerts(
    @Param('id', MongoidValidationPipe) id: string,
    @Request() req,
    @Query() query
    ) {
    const existsAlerts = await this.UserService.getSomeAlerts(req.user.email, query.count);
    return fillObject(AlertRdo, existsAlerts);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Delete alert',
    summary: 'Delete alert'
  })
  @Delete('alerts/:alertId')
  async deleteAlert(
    @Param('alertId', MongoidValidationPipe) alertId: string,
    @Request() req
    ) {
    const deletedTrainingDiary = await this.UserService.deleteAlert(alertId, req.user.email);
    return deletedTrainingDiary;
  }
}
