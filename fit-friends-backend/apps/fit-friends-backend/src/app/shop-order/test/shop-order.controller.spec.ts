import { Test } from '@nestjs/testing';
import { ShopOrderService } from '../shop-order.service';
import { ShopOrderController } from '../shop-order.controller';
import { userStub } from '../../shop-user/test/stubs/shop-user.stub';
import { Order } from '@fit-friends-backend/shared-types';
import { CreateOrderDto } from '../dto/create-order.dto';

jest.mock('../shop-order.service');

describe('ShopOrderController', () => {
  let shopOrderController: ShopOrderController;
  let shopOrderService: ShopOrderService;

  const requestMock = {
    user: {
      email: userStub().email,
    },
    query: {},
  } as unknown as Request;

  const serviceId = '6443a652c8fad5d9da5cb440'

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [ShopOrderController],
        providers: [ShopOrderService],
      }).compile();

      shopOrderService = moduleRef.get<ShopOrderService>(ShopOrderService);
      shopOrderController = moduleRef.get<ShopOrderController>(ShopOrderController);
  });

  describe('CreateShopOrder', () => {
    it('should create personal training', async () => {
      let shopOrder: Order;
      const createShopOrderDto: CreateOrderDto = {
        orderType: "тренировка",
        price: 400,
        amount: 1,
        paymentType: "mir",
        dateBirth: "2022-10-24"
      }

      jest.spyOn(shopOrderService, 'create').mockImplementation(async ():Promise<Order> => Promise.resolve(shopOrder));

      expect(await shopOrderController.createOrder(createShopOrderDto, serviceId, requestMock)).toEqual(shopOrder);
    });
  });

  describe('GetAllOrders', () => {
    it('should return orders array', async () => {
      let shopOrder: Order[];

      jest.spyOn(shopOrderService, 'getAllOrders').mockImplementation(async ():Promise<Order[]> => Promise.resolve(shopOrder));

      expect(await shopOrderController.getAllOrders(userStub().id)).toEqual(shopOrder);
    });
  });

});
