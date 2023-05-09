import { Test } from '@nestjs/testing';
import { OrderService } from '../order.service';
import { OrderController } from '../order.controller';
import { userStub } from '../../user/test/stubs/user.stub';
import { Order } from '@fit-friends-backend/shared-types';
import { CreateOrderDto } from '../dto/create-order.dto';

jest.mock('../order.service');

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  const requestMock = {
    user: {
      email: userStub().email,
    },
    query: {},
  } as unknown as Request;

  const serviceId = '6443a652c8fad5d9da5cb440'

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [OrderController],
        providers: [OrderService],
      }).compile();

      orderService = moduleRef.get<OrderService>(OrderService);
      orderController = moduleRef.get<OrderController>(OrderController);
  });

  describe('CreateOrder', () => {
    it('should create personal training', async () => {
      let shopOrder: Order;
      const createOrderDto: CreateOrderDto = {
        orderType: "тренировка",
        price: 400,
        amount: 1,
        paymentType: "mir",
        dateBirth: "2022-10-24"
      }

      jest.spyOn(orderService, 'create').mockImplementation(async ():Promise<Order> => Promise.resolve(shopOrder));

      expect(await orderController.createOrder(createOrderDto, serviceId, requestMock)).toEqual(shopOrder);
    });
  });

  describe('GetAllOrders', () => {
    it('should return orders array', async () => {
      let shopOrder: Order[];

      jest.spyOn(orderService, 'getAllOrders').mockImplementation(async ():Promise<Order[]> => Promise.resolve(shopOrder));

      expect(await orderController.getAllOrders(userStub().id)).toEqual(shopOrder);
    });
  });

});
