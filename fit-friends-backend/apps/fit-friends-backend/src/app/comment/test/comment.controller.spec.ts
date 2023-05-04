import { Test } from '@nestjs/testing';
import { CommentController } from '../comment.controller';
import { CommentService } from '../comment.service';
import { userStub } from '../../shop-user/test/stubs/shop-user.stub';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { Comment } from '@fit-friends-backend/shared-types';


jest.mock('../comment.service');

describe('CommentController', () => {
  let commentController: CommentController;
  let commentService: CommentService;

  const requestMock = {
    user: {
      email: userStub().email,
    },
    query: {},
  } as unknown as Request;

  const trainingId = '644947bf7f40d82e97b654ec';

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [CommentController],
        providers: [CommentService],
      }).compile();

      commentService = moduleRef.get<CommentService>(CommentService);
      commentController = moduleRef.get<CommentController>(CommentController);
  });

  describe('CreateComment', () => {
    it('should create comment', async () => {
      let comment: Comment;
      const createCommentDto: CreateCommentDto = {
        text: 'wqqweqweqweqeqeqeqeqeqeqeqeqeqeqweqweqeqeqeqeqweqeqeqeqweqeqeqeqeqweqeqweqweqweqewqeqweewqeqwewqeweqwewqeqweqweqeqe',
        rating: 4,
        trainingId: '644947bf7f40d82e97b654ec',
      }

      jest.spyOn(commentService, 'create').mockImplementation(async ():Promise<Comment> => Promise.resolve(comment));

      expect(await commentController.create(createCommentDto, requestMock)).toEqual(comment);
    });
  });

  describe('GetComments', () => {
    it('should return some comments', async () => {
      let comment: Comment[];
      jest.spyOn(commentService, 'getSomeComments').mockImplementation(async ():Promise<Comment[]> => Promise.resolve(comment));

      expect(await commentController.showComments(requestMock, trainingId, 2)).toEqual(comment);
    });
  });

});
